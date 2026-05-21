import { Link, useLocation } from "react-router";
import { AlertCircle, Calendar, Stethoscope, Home } from "lucide-react";

export default function AIResultNeedDoctor() {
  const location = useLocation();
  const symptoms = location.state?.symptoms || "Các triệu chứng bạn đã mô tả";

  const suggestedSpecialties = [
    { name: "Nội khoa", description: "Chuyên về bệnh lý nội tạng" },
    { name: "Tim mạch", description: "Chuyên về tim và mạch máu" },
  ];

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-yellow-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Result Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <AlertCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nên khám bác sĩ
          </h1>
          <p className="text-gray-600">
            Triệu chứng cần được bác sĩ kiểm tra
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
              <h3 className="font-medium text-yellow-700 mb-2">⚠️ Đánh giá</h3>
              <p className="text-sm text-gray-700">
                Dựa trên thông tin bạn cung cấp, AI khuyến nghị bạn nên được bác sĩ chuyên khoa kiểm tra để có chẩn đoán chính xác và phương pháp điều trị phù hợp.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-blue-700 mb-2">🏥 Chuyên khoa gợi ý</h3>
              <div className="space-y-2">
                {suggestedSpecialties.map((specialty, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-3">
                    <p className="font-medium text-blue-900">{specialty.name}</p>
                    <p className="text-sm text-blue-700">{specialty.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">💡 Lời khuyên</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Đặt lịch khám càng sớm càng tốt</li>
                <li>• Chuẩn bị danh sách các triệu chứng chi tiết</li>
                <li>• Mang theo kết quả xét nghiệm (nếu có)</li>
                <li>• Ghi chú các câu hỏi muốn hỏi bác sĩ</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-800 mb-2">🚨 Đi cấp cứu ngay nếu:</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Đau ngực dữ dội</li>
                <li>• Khó thở nghiêm trọng</li>
                <li>• Sốt cao trên 39°C</li>
                <li>• Triệu chứng đột ngột trở nên tệ hơn</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Link
            to="/patient/doctors"
            className="flex flex-col items-center gap-2 bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group col-span-full md:col-span-2"
          >
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <span className="font-semibold text-lg">Đặt lịch khám ngay</span>
            <span className="text-sm opacity-90">Xem danh sách bác sĩ chuyên khoa</span>
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

        {/* Popular Doctors */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            Bác sĩ được đề xuất
          </h2>
          <div className="space-y-3">
            {[
              { name: "BS. Nguyễn Văn A", specialty: "Nội khoa", rating: 4.9, reviews: 234 },
              { name: "BS. Trần Thị B", specialty: "Tim mạch", rating: 4.8, reviews: 189 },
            ].map((doctor, index) => (
              <Link
                key={index}
                to="/patient/doctors"
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {doctor.name.split(' ')[1][0]}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-500 font-medium">⭐ {doctor.rating}</p>
                  <p className="text-xs text-gray-500">{doctor.reviews} đánh giá</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Kết quả AI chỉ mang tính tham khảo. Chẩn đoán chính xác cần được thực hiện bởi bác sĩ.
          </p>
        </div>
      </div>
    </div>
  );
}
