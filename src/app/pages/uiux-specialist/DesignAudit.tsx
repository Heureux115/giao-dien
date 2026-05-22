import { CheckCircle, Eye, Palette, ShieldCheck } from "lucide-react";
import { auditItems } from "./data";

const checks = [
  { label: "Đánh giá heuristic", icon: CheckCircle, score: 76 },
  { label: "Kiểm tra nhất quán", icon: Palette, score: 82 },
  { label: "Kiểm tra tiếp cận", icon: Eye, score: 71 },
  { label: "Phòng tránh lỗi", icon: ShieldCheck, score: 74 },
];

const statusLabel = (status: string) => {
  if (status === "Pass") return "Đạt";
  if (status === "Review") return "Cần xem lại";
  return "Cần cải thiện";
};

export default function DesignAudit() {
  return (
    <div className="p-6 md:p-8 pb-24 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Đánh giá thiết kế</h1>
        <p className="text-gray-600">Đánh giá heuristic, tính nhất quán, accessibility và khả năng phòng tránh lỗi.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {checks.map((check) => {
          const Icon = check.icon;
          return (
            <div key={check.label} className="bg-white rounded-xl shadow-sm p-6">
              <Icon className="w-8 h-8 text-purple-600 mb-4" />
              <p className="text-3xl font-bold text-gray-900 mb-1">{check.score}</p>
              <p className="text-sm text-gray-600">{check.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Danh sách tiêu chí đánh giá</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tiêu chí</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Khu vực</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Điểm</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {auditItems.map((item) => (
                <tr key={item.criterion} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{item.criterion}</td>
                  <td className="py-4 px-4 text-gray-700">{item.area}</td>
                  <td className="py-4 px-4 text-right font-bold text-purple-600">{item.score}/100</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      item.status === "Pass" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {statusLabel(item.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
