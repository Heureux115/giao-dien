import { Link } from "react-router";
import { Brain, Activity, AlertCircle, TrendingUp, CheckCircle, XCircle } from "lucide-react";

export default function AISpecialistDashboard() {
  const stats = [
    { label: "Tư vấn AI hôm nay", value: "342", icon: Brain, color: "bg-purple-500", change: "+23" },
    { label: "Độ chính xác", value: "94.8%", icon: CheckCircle, color: "bg-green-500", change: "+1.2%" },
    { label: "Trường hợp sai", value: "18", icon: AlertCircle, color: "bg-red-500", change: "-5" },
    { label: "Cải thiện", value: "+2.3%", icon: TrendingUp, color: "bg-blue-500", change: "Tháng này" },
  ];

  const recentCases = [
    { id: 1, time: "14:35", symptoms: "Đau đầu, sốt cao", aiResult: "Khẩn cấp", actualResult: "Khẩn cấp", correct: true },
    { id: 2, time: "14:20", symptoms: "Ho nhẹ, mệt mỏi", aiResult: "Nhẹ", actualResult: "Nhẹ", correct: true },
    { id: 3, time: "14:10", symptoms: "Đau bụng dữ dội", aiResult: "Cần bác sĩ", actualResult: "Khẩn cấp", correct: false },
    { id: 4, time: "13:55", symptoms: "Chóng mặt", aiResult: "Nhẹ", actualResult: "Cần bác sĩ", correct: false },
    { id: 5, time: "13:40", symptoms: "Đau ngực", aiResult: "Khẩn cấp", actualResult: "Khẩn cấp", correct: true },
  ];

  const categoryAccuracy = [
    { category: "Nhẹ", total: 1240, correct: 1198, accuracy: 96.6 },
    { category: "Cần bác sĩ", total: 856, correct: 798, accuracy: 93.2 },
    { category: "Khẩn cấp", total: 124, correct: 118, accuracy: 95.2 },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Dashboard</h1>
        <p className="text-gray-600">Giám sát và cải thiện hiệu suất AI</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-600" />
              Trường hợp gần đây
            </h2>
            <Link to="/ai-specialist/errors" className="text-sm text-purple-600 hover:underline">
              Xem lỗi
            </Link>
          </div>

          <div className="space-y-3">
            {recentCases.map((case_) => (
              <div
                key={case_.id}
                className={`p-4 rounded-lg border-2 ${
                  case_.correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      case_.correct ? "bg-green-500" : "bg-red-500"
                    }`}>
                      {case_.correct ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <XCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{case_.time}</p>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Triệu chứng:</p>
                    <p className="font-medium text-gray-900 mb-3">{case_.symptoms}</p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-xs text-gray-600">AI dự đoán</p>
                        <p className="text-sm font-semibold text-purple-600">{case_.aiResult}</p>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <p className="text-xs text-gray-600">Kết quả thực tế</p>
                        <p className="text-sm font-semibold text-gray-900">{case_.actualResult}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Accuracy */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Độ chính xác theo loại
          </h2>

          <div className="space-y-4">
            {categoryAccuracy.map((cat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{cat.category}</p>
                    <p className="text-xs text-gray-600">{cat.correct}/{cat.total} đúng</p>
                  </div>
                  <span className="text-lg font-bold text-purple-600">{cat.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                    style={{ width: `${cat.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
            <Link
              to="/ai-specialist/stats"
              className="block w-full px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-center font-medium"
            >
              Xem thống kê chi tiết
            </Link>
            <Link
              to="/ai-specialist/errors"
              className="block w-full px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-center font-medium"
            >
              Phân tích lỗi AI
            </Link>
          </div>

          {/* Performance Summary */}
          <div className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Hiệu suất tổng thể</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-purple-600">94.8%</p>
              <span className="text-sm text-green-600 font-medium">+1.2%</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">So với tháng trước</p>
          </div>
        </div>
      </div>
    </div>
  );
}
