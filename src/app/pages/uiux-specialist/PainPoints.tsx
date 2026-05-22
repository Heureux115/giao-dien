import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { issues } from "./data";

const severityLabel = (severity: string) => (severity === "High" ? "Cao" : severity === "Medium" ? "Trung bình" : "Thấp");
const statusLabel = (status: string) => (status === "Open" ? "Đang mở" : status === "In progress" ? "Đang xử lý" : "Hoàn tất");

export default function PainPoints() {
  const [roleFilter, setRoleFilter] = useState("Tất cả");
  const [query, setQuery] = useState("");

  const filtered = issues.filter((issue) => {
    const matchesRole = roleFilter === "Tất cả" || issue.role === roleFilter;
    const search = query.trim().toLowerCase();
    const matchesSearch = !search || `${issue.painPoint} ${issue.finding} ${issue.page}`.toLowerCase().includes(search);
    return matchesRole && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 pb-24 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Điểm khó khăn</h1>
        <p className="text-gray-600">Theo dõi phản hồi người dùng, nguồn phát hiện, mức độ nghiêm trọng và trạng thái xử lý.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm pain point, màn hình hoặc lỗi thiết kế"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Tất cả</option>
              <option>Bệnh nhân</option>
              <option>Bác sĩ</option>
              <option>Quản trị viên</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((issue) => (
          <div key={issue.id} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm font-semibold text-gray-500">{issue.id}</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">{issue.role}</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">{issue.source}</span>
              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                issue.severity === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {severityLabel(issue.severity)}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">{statusLabel(issue.status)}</span>
            </div>
            <p className="font-bold text-gray-900 mb-2">{issue.painPoint}</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
                <p className="text-sm font-semibold text-orange-900 mb-1">Phân tích nguồn phản hồi</p>
                <p className="text-sm text-orange-800">{issue.finding}</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-sm font-semibold text-blue-900 mb-1">Khuyến nghị</p>
                <p className="text-sm text-blue-800">{issue.recommendation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
