import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { listDeliveriesByRider } from "@/api/delivery";
import { useAuth } from "@/auth/AuthContext";

export default function RiderDeliveries() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const riderId = auth.user?.id || auth.user?.userId || auth.user?.riderId;

  const load = async () => {
    if (!riderId) return;
    setLoading(true);
    try {
      const res = await listDeliveriesByRider(riderId);
      setItems(res.data || []);
    } catch (e) {
      toast.error("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [riderId]);

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">My Deliveries</CardTitle>
            <p className="text-sm text-gray-500">Deliveries assigned to you</p>
          </div>
          <Button
            onClick={load}
            className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">Delivery ID</th>
                  <th className="text-left font-semibold px-4 py-3">Order ID</th>
                  <th className="text-left font-semibold px-4 py-3">Status</th>
                  <th className="text-left font-semibold px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-gray-500" colSpan={4}>
                      {loading ? "Loading..." : "No deliveries found."}
                    </td>
                  </tr>
                ) : (
                  items.map((d) => (
                    <tr key={d.id || d.deliveryId} className="border-t">
                      <td className="px-4 py-3 text-gray-900">
                        {d.id || d.deliveryId || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {d.orderId || d.order?.id || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {d.status || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          className="rounded-xl"
                          onClick={() =>
                            navigate(`/rider/deliveries/${d.id || d.deliveryId}`)
                          }
                        >
                          View
                        </Button>
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
