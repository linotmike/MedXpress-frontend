import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { pharmacyApi } from "../api/pharmacy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Search, ArrowRight } from "lucide-react";

function PharmacyCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="space-y-2">
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-3 w-1/3 rounded bg-muted" />
        <div className="h-9 w-32 rounded bg-muted" />
      </CardContent>
    </Card>
  );
}

export default function Pharmacies() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    pharmacyApi
      .list()
      .then((data) => mounted && setItems(Array.isArray(data) ? data : []))
      .catch((e) => mounted && setError(e.message || "Failed to load pharmacies"))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const phone = (p.phoneNumber || "").toLowerCase();
      const address = (p.addressLine || "").toLowerCase();
      return name.includes(s) || phone.includes(s) || address.includes(s);
    });
  }, [items, q]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pharmacies</h1>
          <p className="text-lg text-gray-600">Browse nearby pharmacies and check their live inventory</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pharmacy name, phone, or address..."
              className="pl-12 h-12 rounded-lg border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-4 text-sm text-red-700">❌ {error}</CardContent>
        </Card>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PharmacyCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="py-16 text-center">
            <div className="text-lg font-semibold text-gray-900 mb-2">No pharmacies found</div>
            <div className="text-gray-600">Try adjusting your search criteria</div>
          </CardContent>
        </Card>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const address =
              p.addressLine && p.addressLine !== "string" ? p.addressLine : "No address provided";

            return (
              <Card key={p.id} className="border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg text-gray-900">{p.name}</CardTitle>
                    </div>
                    <Badge className="shrink-0 rounded-full bg-green-100 text-green-700">
                      Verified
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-2">{address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{p.phoneNumber || "—"}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <Button asChild className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold py-5 gap-2">
                    <Link to={`/pharmacies/${p.id}`} className="flex items-center justify-center">
                      View Inventory <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
