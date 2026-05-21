import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, UserCheck, BarChart3, ChevronLeft, Users, Building2, LogOut } from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/approve-doctors", icon: UserCheck, label: "Duyệt bác sĩ" },
    { path: "/admin/manage-doctors", icon: Users, label: "Quản lý bác sĩ" },
    { path: "/admin/manage-clinics", icon: Building2, label: "Quản lý phòng khám" },
    { path: "/admin/stats", icon: BarChart3, label: "Thống kê" },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:block w-64 bg-white shadow-lg sticky top-0 h-screen overflow-y-auto">
        <div className="p-6">
          <Link to="/admin" className="flex items-center gap-2 text-gray-600 hover:text-gray-700 mb-8">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý</h1>
          <p className="text-sm text-gray-600 mb-8">Admin User</p>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-gray-200 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
