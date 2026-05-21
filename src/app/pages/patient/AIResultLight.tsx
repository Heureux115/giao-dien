import { Link, useLocation } from "react-router";
import { CheckCircle, RefreshCw, Calendar, Home } from "lucide-react";

export default function AIResultLight() {
  const location = useLocation();
  const symptoms = location.state?.symptoms || "Các triệu chứng bạn đã mô tả";

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Result Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tình trạng nhẹ
          </h1>
          <p className="text-gray-600">
            Triệu chứng của bạn không đáng lo ngại
          </p>
        </div>

        {/* Analysis */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Phân tích AI</h2>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-2">Triệu chứng:</p>
            <p className="text-gray-900">{symptoms}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-green-700 mb-2">✓ Đánh giá</h3>
              <p className="text-sm text-gray-700">
                Dựa trên thông tin bạn cung cấp, triệu chứng của bạn có vẻ nhẹ và có thể tự khỏi với chế độ nghỉ ngơi hợp lý.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-blue-700 mb-2">💡 Lời khuyên</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Nghỉ ngơi đầy đủ, ngủ ít nhất 7-8 tiếng/ngày</li>
                <li>• Uống nhiều nước, giữ cơ thể đủ nước</li>
                <li>• Ăn uống lành mạnh, bổ sung vitamin</li>
                <li>• Theo dõi triệu chứng trong 2-3 ngày tới</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-medium text-amber-800 mb-2">⚠️ Khi nào cần gặp bác sĩ?</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Triệu chứng không thuyên giảm sau 3 ngày</li>
                <li>• Xuất hiện các triệu chứng mới</li>
                <li>• Tình trạng trở nên tệ hơn</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/patient/consult"
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-medium text-sm text-center">Tư vấn lại</span>
          </Link>

          <Link
            to="/patient/doctors"
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow group"
          >
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-teal-600" />
            </div>
            <span className="font-medium text-sm text-center">Đặt lịch bác sĩ</span>
          </Link>

          <Link
            to="/patient"
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow group"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Home className="w-6 h-6 text-gray-600" />
            </div>
            <span className="font-medium text-sm text-center">Trang chủ</span>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Kết quả này chỉ mang tính tham khảo. Nếu cảm thấy lo lắng, hãy tham khảo ý kiến bác sĩ.
          </p>
        </div>
      </div>
    </div>
  );
}
