import { Link, NavLink } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <Link to="/" style={{ fontWeight: 700, textDecoration: "none", color: "inherit" }}>
          MedXpress
        </Link>

        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink to="/pharmacies">Pharmacies</NavLink>
          <NavLink to="/orders">Orders</NavLink>
        </nav>
      </header>

      {children}
    </div>
  );
}
