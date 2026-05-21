import { BarChart3, TrendingUp, Calendar, Users } from "lucide-react";

export default function AIStats() {
  const monthlyStats = [
    { month: "T1/2026", consultations: 8234, accuracy: 93.5, errors: 535 },
    { month: "T2/2026", consultations: 9156, accuracy: 94.1, errors: 540 },
    { month: "T3/2026", consultations: 10245, accuracy: 94.3, errors: 584 },
    { month: "T4/2026", consultations: 11023, accuracy: 94.6, errors: 595 },
    { month: "T5/2026", consultations: 12456, accuracy: 94.8, errors: 648 },
  ];

  const symptomStats = [
    { symptom: "Đau đầu", count: 2456, accuracy: 96.2 },
    { symptom: "Sốt", count: 1823, accuracy: 95.8 },
    { symptom: "Ho", count: 1654, accuracy: 94.3 },
    { symptom: "Đau bụng", count: 1432, accuracy: 92.7 },
    { symptom: "Chóng mặt", count: 1298, accuracy: 93.5 },
    { symptom: "Mệt mỏi", count: 1176, accuracy: 94.1 },
    { symptom: "Đau ngực", count: 987, accuracy: 97.3 },
    { symptom: "Khó thở", count: 845, accuracy: 96.8 },
  ];

  const timeStats = [
    { hour: "00-06", consultations: 234, avgAccuracy: 93.2 },
    { hour: "06-12", consultations: 3456, avgAccuracy: 95.1 },
    { hour: "12-18", consultations: 5234, avgAccuracy: 94.9 },
    { hour: "18-24", consultations: 3532, avgAccuracy: 94.3 },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thống kê AI</h1>
        <p className="text-gray-600">Phân tích chi tiết hiệu suất AI</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl p-6">
          <Users className="w-8 h-8 mb-4" />
          <p className="text-3xl font-bold mb-1">12,456</p>
          <p className="text-sm opacity-90">Tư vấn tháng này</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
          <p className="text-3xl font-bold text-gray-900 mb-1">94.8%</p>
          <p className="text-sm text-gray-600">Độ chính xác</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
          <p className="text-3xl font-bold text-gray-900 mb-1">648</p>
          <p className="text-sm text-gray-600">Trường hợp sai</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Calendar className="w-8 h-8 text-purple-600 mb-4" />
          <p className="text-3xl font-bold text-gray-900 mb-1">413</p>
          <p className="text-sm text-gray-600">Tư vấn/ngày TB</p>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Xu hướng theo tháng</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tháng</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Tư vấn</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Độ chính xác</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Lỗi</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Tăng trưởng</th>
              </tr>
            </thead>
            <tbody>
              {monthlyStats.map((stat, index) => {
                const prevMonth = index > 0 ? monthlyStats[index - 1] : null;
                const growth = prevMonth
                  ? ((stat.consultations - prevMonth.consultations) / prevMonth.consultations * 100).toFixed(1)
                  : "0";

                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{stat.month}</td>
                    <td className="py-3 px-4 text-right text-gray-900">{stat.consultations.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-medium text-sm">
                        {stat.accuracy}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-red-600 font-medium">{stat.errors}</td>
                    <td className="py-3 px-4 text-right text-green-600 font-medium">+{growth}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Symptom Statistics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Thống kê theo triệu chứng</h2>
          <div className="space-y-3">
            {symptomStats.map((stat, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{stat.symptom}</span>
                  <span className="text-sm font-semibold text-purple-600">{stat.accuracy}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                      style={{ width: `${stat.accuracy}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 min-w-[80px] text-right">
                    {stat.count.toLocaleString()} ca
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time of Day Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Thống kê theo giờ</h2>
          <div className="space-y-6">
            {timeStats.map((stat, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{stat.hour}h</p>
                    <p className="text-sm text-gray-600">{stat.consultations.toLocaleString()} tư vấn</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">{stat.avgAccuracy}%</p>
                    <p className="text-xs text-gray-500">Độ chính xác</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full"
                    style={{ width: `${(stat.consultations / 5234) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Best Performance */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Khung giờ tốt nhất</p>
              <p className="text-2xl font-bold text-green-600">06:00 - 12:00</p>
              <p className="text-sm text-gray-700 mt-1">Độ chính xác: 95.1%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
