import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Clock, MapPin, Shield, Zap } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Home() {
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

      {/* Ethiopia Coverage Map */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Coverage Across Ethiopia</h2>
        <p className="text-xl text-gray-600 text-center mb-8">Serving pharmacies nationwide with reliable delivery services</p>
        
        <Card className="bg-white border-gray-200 overflow-hidden">
          <CardContent className="p-0">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyDummy"}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={ethiopiaMapCenter}
                zoom={6}
              >
                {/* Center marker for Addis Ababa */}
                <Marker position={ethiopiaMapCenter} title="Addis Ababa" />
              </GoogleMap>
            </LoadScript>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
