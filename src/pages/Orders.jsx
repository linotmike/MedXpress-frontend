import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageOpen, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const mockOrders = [
  {
    id: "1",
    pharmacy: "City Pharmacy",
    status: "completed",
    total: "$45.99",
    date: "Today",
    items: 3,
  },
  {
    id: "2",
    pharmacy: "Health Plus Pharmacy",
    status: "in-progress",
    total: "$82.50",
    date: "Yesterday",
    items: 5,
  },
  {
    id: "3",
    pharmacy: "QuickMed Pharmacy",
    status: "pending",
    total: "$28.75",
    date: "2 days ago",
    items: 2,
  },
];

export default function Orders() {
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Delivered";
      case "in-progress":
        return "In Progress";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Orders</h1>
        <p className="text-lg text-gray-600">Track and manage your medicine orders</p>
      </div>

      {/* Empty State */}
      {mockOrders.length === 0 ? (
        <Card className="border-gray-200">
          <CardContent className="py-16 text-center">
            <PackageOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <div className="text-lg font-semibold text-gray-900 mb-2">No orders yet</div>
            <div className="text-gray-600 mb-6">Start by browsing pharmacies and placing your first order</div>
            <Button asChild className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold py-5">
              <Link to="/pharmacies">Browse Pharmacies</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Orders List */
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id} className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{order.pharmacy}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{order.items} items</span>
                      <span>•</span>
                      <span>{order.date}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-2">{order.total}</div>
                    <Button variant="outline" className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 py-5">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
