import NavLink from "./NavLink";

export default function Navigation() {
  return (
    <nav>
      <NavLink label="Home" href="/" />
      <NavLink label="Register" href="/register" />
      <NavLink label="Dashboard" href="/dashboard" />
    </nav>
  );
}