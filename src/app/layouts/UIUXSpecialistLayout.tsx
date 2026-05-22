import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  BarChart3,
  BookOpen,
  Bot,
  ClipboardCheck,
  FilePlus2,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  MessageSquareWarning,
  SearchCheck,
} from "lucide-react";

const navItems = [
  { path: "/uiux-specialist", icon: LayoutDashboard, label: "Tổng quan" },
  { path: "/uiux-specialist/audit", icon: SearchCheck, label: "Đánh giá thiết kế" },
  { path: "/uiux-specialist/pain-points", icon: MessageSquareWarning, label: "Điểm khó khăn" },
  { path: "/uiux-specialist/report-issue", icon: FilePlus2, label: "Báo cáo vấn đề" },
  { path: "/uiux-specialist/recommendations", icon: BookOpen, label: "Khuyến nghị" },
  { path: "/uiux-specialist/ai-feedback", icon: Bot, label: "Gợi ý tự động" },
];

export default function UIUXSpecialistLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/uiux-specialist") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex w-72 bg-white shadow-lg flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-200">
          <Link to="/uiux-specialist" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Chuyên gia UX/UI</p>
              <p className="text-xs text-gray-600">Không gian đánh giá thiết kế</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/uiux-specialist/recommendations/new"
            className="mb-3 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
          >
            <Lightbulb className="w-5 h-5" />
            Thêm guideline
          </Link>
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="p-4 flex items-center justify-between">
            <Link to="/uiux-specialist" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">UX/UI</span>
            </Link>
            <Link to="/uiux-specialist/report-issue" className="p-2 rounded-lg bg-purple-100 text-purple-700">
              <FilePlus2 className="w-5 h-5" />
            </Link>
          </div>
        </header>

        <Outlet />

        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="grid grid-cols-5 px-2 py-2">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg ${
                    isActive(item.path) ? "text-purple-700" : "text-gray-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium leading-tight">{item.label.split(" ")[0]}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </main>
    </div>
  );
}

export function UIUXStatCard({
  label,
  value,
  icon: Icon,
  tone = "purple",
}: {
  label: string;
  value: string;
  icon: typeof BarChart3;
  tone?: "purple" | "blue" | "green" | "red" | "yellow";
}) {
  const tones = {
    purple: "from-purple-600 to-blue-600 text-white",
    blue: "from-blue-600 to-cyan-600 text-white",
    green: "from-green-600 to-teal-600 text-white",
    red: "from-red-600 to-orange-600 text-white",
    yellow: "from-yellow-500 to-orange-500 text-white",
  };

  return (
    <div className={`bg-gradient-to-br ${tones[tone]} rounded-xl p-6 shadow-sm`}>
      <Icon className="w-8 h-8 mb-4" />
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm opacity-90">{label}</p>
    </div>
  );
}
