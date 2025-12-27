import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pharmacyApi } from "../api/pharmacy";
import { pharmacyMedicineApi } from "../api/pharmacyMedicine";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ArrowLeft, Search, MapPin, PackageCheck, XCircle } from "lucide-react";

function InventoryRowSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border bg-card p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 w-full">
          <div className="h-4 w-1/2 bg-muted rounded" />
          <div className="h-3 w-1/3 bg-muted rounded" />
        </div>
        <div className="space-y-2 w-28">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-3 w-2/3 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export default function PharmacyInventory() {
  const { pharmacyId } = useParams();
  const navigate = useNavigate();

  const [pharmacy, setPharmacy] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    Promise.all([
      pharmacyApi.getById(pharmacyId),
      pharmacyMedicineApi.listByPharmacy(pharmacyId),
    ])
      .then(([p, inv]) => {
        if (!mounted) return;
        setPharmacy(p);
        setInventory(Array.isArray(inv) ? inv : []);
      })
      .catch((e) => mounted && setError(e.message || "Failed to load inventory"))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [pharmacyId]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return inventory;
    return inventory.filter((x) => {
      const name = (x.medicineName || "").toLowerCase();
      const brand = (x.brandName || "").toLowerCase();
      const strength = (x.strength || "").toLowerCase();
      return name.includes(s) || brand.includes(s) || strength.includes(s);
    });
  }, [inventory, q]);

  const address =
    pharmacy?.addressLine && pharmacy.addressLine !== "string"
      ? pharmacy.addressLine
      : "";

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="rounded-full px-3 w-fit"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              {pharmacy?.name || "Pharmacy inventory"}
            </h1>

            {address && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{address}</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[360px]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search medicine, brand, strength..."
              className="pl-9 h-10"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Error */}
      {error && (
        <Card className="border-destructive/40">
          <CardContent className="py-4 text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <InventoryRowSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-base font-medium">No items found</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Try a different search, or check back later.
            </div>
          </CardContent>
        </Card>
      )}

      {/* List */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid gap-3">
          {filtered.map((x) => {
            const available = !!x.isAvailable && (x.stockQuantity ?? 0) > 0;

            return (
              <Card key={x.id} className="hover:shadow-sm transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-base">
                        {x.medicineName}{" "}
                        {x.strength ? (
                          <span className="text-muted-foreground font-normal">
                            ({x.strength})
                          </span>
                        ) : null}
                      </CardTitle>

                      <div className="text-sm text-muted-foreground">
                        {x.brandName || "—"} • {x.form || "—"}
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="text-base font-semibold">
                        {x.price ?? "—"}
                      </div>

                      {available ? (
                        <Badge className="rounded-full" variant="secondary">
                          <PackageCheck className="h-4 w-4 mr-1" />
                          In stock ({x.stockQuantity})
                        </Badge>
                      ) : (
                        <Badge className="rounded-full" variant="outline">
                          <XCircle className="h-4 w-4 mr-1" />
                          Unavailable
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-muted-foreground">
                      Ordering UI next: cart, quantity, and checkout.
                    </div>

                    <Button
                      className="rounded-full"
                      disabled={!available}
                      variant={available ? "default" : "secondary"}
                      onClick={() => {
                        // placeholder for cart
                      }}
                    >
                      Add to cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
