export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div>Refine Leads</div>
        <div className="space-x-4">
          <a href="/dashboard">Dashboard</a>
          <a href="/search">Search</a>
          <a href="/account">Account</a>
          <a href="/billing">Billing</a>
        </div>
      </div>
    </nav>
  );
}
