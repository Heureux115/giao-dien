import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Home, MessageCircle, Calendar, User, ChevronLeft, LogOut } from "lucide-react";

export default function PatientLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/patient", icon: Home, label: "Trang chủ" },
    { path: "/patient/consult", icon: MessageCircle, label: "Tư vấn" },
    { path: "/patient/history", icon: Calendar, label: "Lịch sử" },
    { path: "/patient/profile", icon: User, label: "Hồ sơ" },
  ];

  const isActive = (path: string) => {
    if (path === "/patient") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {location.pathname !== "/patient" && (
              <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-700">
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <Link to="/patient" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="font-bold text-xl text-gray-900">HealthCare AI</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden bg-white border-t border-gray-200 sticky bottom-0">
        <div className="flex items-center justify-between py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${
                  isActive(item.path)
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-xs font-medium">Đăng xuất</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
