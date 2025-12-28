import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Clock, MapPin, Shield, Zap, Package, Pill, TrendingUp, Truck } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useAuth } from "@/auth/AuthContext";
import { ROLES } from "@/auth/roles";

export default function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const isPatient = auth.user?.role === ROLES.PATIENT;
  const isRider = auth.user?.role === ROLES.RIDER;
  const isAdmin = auth.user?.role === ROLES.PHARMACY_ADMIN;
  const isAuthenticated = auth.isAuthenticated;

  // Categories for patients
  const patientCategories = [
    { name: "Pharmacies", icon: "🏪", href: "/pharmacies" },
    { name: "Medicines", icon: "💊", href: "/medicines" },
    { name: "My Orders", icon: "📦", href: "/orders" },
    { name: "Wellness", icon: "🧘", action: () => {} },
    { name: "Health Deals", icon: "💰", action: () => {} },
    { name: "Essentials", icon: "✨", action: () => {} },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Same-day delivery from nearby pharmacies"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Wide Coverage",
      description: "Access hundreds of pharmacies in your area"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe & Secure",
      description: "All transactions are encrypted and verified"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Service",
      description: "Round-the-clock availability for emergencies"
    }
  ];

  const ethiopiaMapCenter = {
    lat: 9.145,
    lng: 40.4897
  };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "1.5rem"
  };

  return (
    <div className="space-y-12">
      {/* Patient Dashboard */}
      {isAuthenticated && isPatient && (
        <>
          {/* Welcome Section */}
          <section className="pt-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome, {auth.user?.name?.split(" ")[0]}! 👋
                </h1>
                <p className="text-gray-600">Order medicines from nearby pharmacies</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {auth.user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>

            {/* Quick Search */}
            <Card className="rounded-2xl shadow-sm border-gray-200">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search medicines, pharmacies..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Button className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-6">
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Categories Grid */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {patientCategories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => category.href && navigate(category.href)}
                  className="group bg-white rounded-2xl p-4 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-500 transition">{category.name}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <section className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-2xl shadow-sm border-gray-200 hover:shadow-md transition">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">My Orders</h3>
                <p className="text-sm text-gray-600 mb-4">Track your medicine orders</p>
                <Button asChild variant="ghost" className="text-blue-500 hover:text-blue-600 p-0">
                  <Link to="/orders">View Orders →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-gray-200 hover:shadow-md transition">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <MapPin className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Find Pharmacies</h3>
                <p className="text-sm text-gray-600 mb-4">Browse nearby pharmacies</p>
                <Button asChild variant="ghost" className="text-green-600 hover:text-green-700 p-0">
                  <Link to="/pharmacies">Find Now →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-gray-200 hover:shadow-md transition">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Pill className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Browse Medicines</h3>
                <p className="text-sm text-gray-600 mb-4">Search our medicine catalog</p>
                <Button asChild variant="ghost" className="text-purple-600 hover:text-purple-700 p-0">
                  <Link to="/medicines">Browse →</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </>
      )}

      {/* Rider Dashboard */}
      {isAuthenticated && isRider && (
        <>
          <section className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {auth.user?.name?.split(" ")[0]}! 🚴
                </h1>
                <p className="text-gray-600">Manage your deliveries</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="rounded-2xl shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <Truck className="w-8 h-8 text-blue-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">My Deliveries</h3>
                  <p className="text-sm text-gray-600 mb-4">View and manage your deliveries</p>
                  <Button asChild className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white w-full">
                    <Link to="/rider/deliveries">Go to Deliveries</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 text-green-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Earnings</h3>
                  <p className="text-sm text-gray-600 mb-4">Track your delivery earnings</p>
                  <Button variant="outline" className="rounded-lg border-gray-300 w-full">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 text-yellow-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Statistics</h3>
                  <p className="text-sm text-gray-600 mb-4">View your performance stats</p>
                  <Button variant="outline" className="rounded-lg border-gray-300 w-full">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}

      {/* Pharmacy Admin Dashboard */}
      {isAuthenticated && isAdmin && (
        <>
          <section className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Pharmacy Admin Dashboard
                </h1>
                <p className="text-gray-600">Manage your pharmacy inventory and operations</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="rounded-2xl shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <Pill className="w-8 h-8 text-blue-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Manage Medicines</h3>
                  <p className="text-sm text-gray-600 mb-4">Add and manage your medicine inventory</p>
                  <Button asChild className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white w-full">
                    <Link to="/medicines">Go to Medicines</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <Package className="w-8 h-8 text-green-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Orders</h3>
                  <p className="text-sm text-gray-600 mb-4">View and manage orders</p>
                  <Button variant="outline" className="rounded-lg border-gray-300 w-full">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 text-purple-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600 mb-4">View pharmacy analytics</p>
                  <Button variant="outline" className="rounded-lg border-gray-300 w-full">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}

      {/* Unauthenticated Landing Page */}
      {!isAuthenticated && (
        <>
          {/* Hero Section */}
      <section className="pt-12 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Your Medicines <span className="text-blue-500">Delivered Fast</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Order medicines from verified pharmacies near you. Fast, safe, and reliable delivery straight to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-base py-6">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-lg border-gray-300 text-gray-700 text-base py-6">
                <Link to="/pharmacies">Browse Pharmacies</Link>
              </Button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-12 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💊</div>
              <p className="text-gray-600">Fast pharmacy delivery service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 rounded-3xl px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Why Choose MedXpress?</h2>
        <p className="text-xl text-gray-600 text-center mb-12">Everything you need for convenient medicine delivery</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="bg-white border-gray-200">
              <CardContent className="p-8">
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-12 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-blue-100 mb-8">Create an account and order your medicines today. Fast, safe, and convenient.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="rounded-lg bg-white text-blue-500 hover:bg-gray-100 text-base py-6 font-semibold">
              <Link to="/register">Create Account</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-lg border-white text-white hover:bg-blue-700 text-base py-6">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
            <p className="text-gray-600">Pharmacies Connected</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">10K+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">99%</div>
            <p className="text-gray-600">On-Time Delivery</p>
          </div>
        </div>
      </section>
        </>
      )}

      {/* Ethiopia Coverage Map - Visible to all */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Coverage Across Ethiopia</h2>
        <p className="text-xl text-gray-600 text-center mb-8">Serving pharmacies nationwide with reliable delivery services</p>
        
        <Card className="bg-white border-gray-200 overflow-hidden rounded-2xl">
          <CardContent className="p-0">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyDummy"}>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "400px",
                  borderRadius: "1.5rem"
                }}
                center={{
                  lat: 9.145,
                  lng: 40.4897
                }}
                zoom={6}
              >
                <Marker position={{ lat: 9.145, lng: 40.4897 }} title="Addis Ababa" />
              </GoogleMap>
            </LoadScript>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
