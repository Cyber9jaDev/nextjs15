import NavLink from "./NavLink";

export default function Navigation() {
  return (
    <header>
      <nav>
        <NavLink label="Home" href="/" />
        <NavLink label="Register" href="/register" />
        <NavLink label="Dashboard" href="/dashboard" />
      </nav>
    </header>
  );
}