import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, Calendar, Wallet, ChevronLeft, Settings, LogOut, Star } from "lucide-react";

export default function DoctorLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/doctor", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/doctor/appointments", icon: Calendar, label: "Lịch hẹn" },
    { path: "/doctor/wallet", icon: Wallet, label: "Ví" },
    { path: "/doctor/reviews", icon: Star, label: "Đánh giá" },
    { path: "/doctor/settings", icon: Settings, label: "Cài đặt" },
  ];

  const isActive = (path: string) => {
    if (path === "/doctor") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow-lg flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 flex-1">
          <Link to="/doctor" className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-blue-600 rounded-md flex items-center justify-center text-white font-bold">
              BS
            </div>
            <span className="text-sm font-semibold text-gray-900">Bác sĩ</span>
          </Link>

          {/* Profile Section */}
          <Link
            to="/doctor/settings"
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl mb-6 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              NA
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 truncate">BS. Nguyễn Văn A</p>
              <p className="text-xs text-teal-600 flex items-center gap-1">
                <Settings className="w-3 h-3" />
                Cài đặt hồ sơ
              </p>
            </div>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-teal-100 text-teal-600"
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

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="bg-teal-50 rounded-lg p-4 mb-4">
            <p className="text-xs text-teal-900 font-semibold mb-1">💡 Mẹo hữu ích</p>
            <p className="text-xs text-teal-700">
              Cập nhật đầy đủ hồ sơ để tăng độ tin cậy với bệnh nhân
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                NA
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">BS. Nguyễn Văn A</p>
                <p className="text-xs text-gray-600">Bác sĩ Nội khoa</p>
              </div>
            </div>
            <Link
              to="/doctor/settings"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </Link>
          </div>
        </div>

        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${
                  isActive(item.path)
                    ? "text-teal-600"
                    : "text-gray-600"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
