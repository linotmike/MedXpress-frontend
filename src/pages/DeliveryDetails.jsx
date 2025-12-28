import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getDeliveryById, updateDeliveryStatus } from "@/api/delivery";

export default function DeliveryDetails() {
  const { deliveryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [delivery, setDelivery] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getDeliveryById(deliveryId);
      setDelivery(res.data);
    } catch (e) {
      toast.error("Failed to load delivery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [deliveryId]);

  const setStatus = async (status) => {
    setSaving(true);
    try {
      await updateDeliveryStatus(deliveryId, { status });
      toast.success("Status updated");
      await load();
    } catch (e) {
      toast.error("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Delivery Details</CardTitle>
          <p className="text-sm text-gray-500">
            {deliveryId}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading || !delivery ? (
            <div className="text-sm text-gray-600">Loading...</div>
          ) : (
            <>
              <div className="rounded-xl border border-gray-200 p-4 space-y-2">
                <div className="text-sm">
                  <span className="text-gray-500">Status:</span>{" "}
                  <span className="font-semibold text-gray-900">{delivery.status || "—"}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Order ID:</span>{" "}
                  <span className="text-gray-900">{delivery.orderId || delivery.order?.id || "—"}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Rider ID:</span>{" "}
                  <span className="text-gray-900">{delivery.riderId || delivery.rider?.id || "—"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={saving}
                  onClick={() => setStatus("PICKED_UP")}
                >
                  Picked Up
                </Button>
                <Button
                  className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={saving}
                  onClick={() => setStatus("IN_TRANSIT")}
                >
                  In Transit
                </Button>
                <Button
                  className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={saving}
                  onClick={() => setStatus("DELIVERED")}
                >
                  Delivered
                </Button>
              </div>

              <p className="text-xs text-gray-500">
                If your backend enum uses different values, change the button values to match exactly.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
