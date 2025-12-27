import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Debug from "../pages/Debug";
import Pharmacies from "../pages/Pharmacies";
import PharmacyInventory from "../pages/PharmacyInventory";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";
import RequireAuth from "../auth/RequireAuth";
import { ROLES } from "../auth/roles";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/debug" element={<Debug />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected: any logged-in user */}
      <Route element={<RequireAuth />}>
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/pharmacies/:pharmacyId" element={<PharmacyInventory />} />
        <Route path="/orders" element={<Orders />} />
      </Route>

      {/* Example role-protected routes (we’ll add pages later) */}
      <Route element={<RequireAuth allowedRoles={[ROLES.RIDER]} />}>
        {/* later: /rider/deliveries */}
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.PHARMACY_ADMIN]} />}>
        {/* later: /pharmacy/dashboard */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
