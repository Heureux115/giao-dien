import { Link } from "react-router";
import { AlertCircle, BarChart3, Bot, ClipboardCheck, TrendingUp } from "lucide-react";
import { UIUXStatCard } from "../../layouts/UIUXSpecialistLayout";
import { auditItems, issues } from "./data";

const severityLabel = (severity: string) => (severity === "High" ? "Cao" : severity === "Medium" ? "Trung bình" : "Thấp");

export default function UIUXDashboard() {
  const highIssues = issues.filter((issue) => issue.severity === "High").length;

  return (
    <div className="p-6 md:p-8 pb-24 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tổng quan chuyên gia UX/UI</h1>
        <p className="text-gray-600">Theo dõi pain point, issue thiết kế, audit score và gợi ý cải thiện trải nghiệm.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <UIUXStatCard label="Vấn đề đang mở" value={String(issues.filter((i) => i.status !== "Done").length)} icon={AlertCircle} tone="red" />
        <UIUXStatCard label="Vấn đề nghiêm trọng" value={String(highIssues)} icon={ClipboardCheck} tone="purple" />
        <UIUXStatCard label="Điểm audit TB" value="74/100" icon={BarChart3} tone="blue" />
        <UIUXStatCard label="Cải thiện dự kiến" value="+18%" icon={TrendingUp} tone="green" />
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Vấn đề gần đây</h2>
            <Link to="/uiux-specialist/pain-points" className="text-sm text-purple-600 hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="space-y-4">
            {issues.slice(0, 4).map((issue) => (
              <div key={issue.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-gray-500">{issue.id}</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">{issue.role}</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    issue.severity === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {severityLabel(issue.severity)}
                  </span>
                </div>
                <p className="font-semibold text-gray-900 mb-1">{issue.painPoint}</p>
                <p className="text-sm text-gray-600">{issue.recommendation}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tóm tắt đánh giá</h2>
            <div className="space-y-4">
              {auditItems.slice(0, 4).map((item) => (
                <div key={item.criterion}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800">{item.area}</span>
                    <span className="text-sm font-bold text-purple-600">{item.score}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-purple-600 rounded-full" style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 rounded-xl p-6">
            <Bot className="w-8 h-8 text-purple-600 mb-3" />
            <h2 className="text-lg font-bold text-gray-900 mb-2">Gợi ý tự động</h2>
            <p className="text-sm text-gray-700 mb-4">
              Hệ thống gợi ý 3 điểm cần kiểm tra lại: độ tương phản, CTA đặt lịch và phản hồi thanh toán.
            </p>
            <Link to="/uiux-specialist/ai-feedback" className="text-sm font-semibold text-purple-700 hover:underline">
              Xem phản hồi
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
