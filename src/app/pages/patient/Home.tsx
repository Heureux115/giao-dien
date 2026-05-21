import { Link } from "react-router";
import { MessageCircle, Stethoscope, Clock, Shield, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-8 md:p-12 mb-8 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Tư vấn sức khỏe AI
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Tư vấn nhanh chóng, chính xác với công nghệ AI hiện đại
        </p>
        <Link
          to="/patient/consult"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow"
        >
          <MessageCircle className="w-6 h-6" />
          Tư vấn ngay
        </Link>
      </div>

      {/* Warning Notice */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-amber-900">Lưu ý quan trọng</p>
            <p className="text-sm text-amber-700">
              Tư vấn AI chỉ mang tính tham khảo, không thay thế chẩn đoán của bác sĩ
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Tư vấn AI 24/7</h3>
          <p className="text-gray-600 text-sm">
            Trả lời ngay lập tức, phân tích triệu chứng chính xác
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <Stethoscope className="w-6 h-6 text-teal-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Đặt lịch bác sĩ</h3>
          <p className="text-gray-600 text-sm">
            Kết nối với bác sĩ chuyên khoa phù hợp
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Tiết kiệm thời gian</h3>
          <p className="text-gray-600 text-sm">
            Tư vấn trực tuyến, không cần di chuyển
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Quy trình hoạt động</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: 1, title: "Mô tả triệu chứng", desc: "Trò chuyện với AI" },
            { step: 2, title: "Phân tích AI", desc: "Đánh giá tình trạng" },
            { step: 3, title: "Nhận kết quả", desc: "Lời khuyên phù hợp" },
            { step: 4, title: "Đặt lịch khám", desc: "Nếu cần thiết" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Link
          to="/patient/doctors"
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Danh sách bác sĩ</h3>
            <p className="text-sm text-gray-600">Chọn bác sĩ phù hợp</p>
          </div>
        </Link>

        <Link
          to="/patient/hospitals"
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Đặt lịch bệnh viện</h3>
            <p className="text-sm text-gray-600">Khám tại bệnh viện</p>
          </div>
        </Link>

        <Link
          to="/patient/history"
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Lịch sử khám</h3>
            <p className="text-sm text-gray-600">Xem lần tư vấn trước</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
