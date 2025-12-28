import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { listMedicines } from "@/api/medicine";

export default function Medicines() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const load = async (query) => {
    setLoading(true);
    try {
      const res = await listMedicines(query);
      setItems(res.data || []);
    } catch (e) {
      toast.error("Failed to load medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load("");
  }, []);

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Medicines</CardTitle>
            <p className="text-sm text-gray-500">Search and view medicines</p>
          </div>

          <div className="flex w-full sm:w-auto gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name..."
              className="rounded-xl"
            />
            <Button
              onClick={() => load(q)}
              className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">Name</th>
                  <th className="text-left font-semibold px-4 py-3">ID</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-gray-500" colSpan={2}>
                      {loading ? "Loading..." : "No medicines found."}
                    </td>
                  </tr>
                ) : (
                  items.map((m) => (
                    <tr key={m.id || m.medicineId} className="border-t">
                      <td className="px-4 py-3 text-gray-900">
                        {m.name || m.medicineName || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {m.id || m.medicineId || "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
