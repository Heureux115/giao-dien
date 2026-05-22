import { Link } from "react-router";
import { ClipboardCheck, Shield, Stethoscope, User } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">HealthCare AI</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
          <p className="text-gray-600">Chọn vai trò của bạn để tiếp tục</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Link
            to="/login/patient"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Bệnh nhân</h3>
            <p className="text-gray-600 text-center text-sm">Tư vấn sức khỏe và đặt lịch khám</p>
          </Link>

          <Link
            to="/login/doctor"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <Stethoscope className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Bác sĩ</h3>
            <p className="text-gray-600 text-center text-sm">Quản lý lịch hẹn và tư vấn bệnh nhân</p>
          </Link>

          <Link
            to="/login/admin"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Quản trị viên</h3>
            <p className="text-gray-600 text-center text-sm">Quản lý hệ thống và duyệt bác sĩ</p>
          </Link>

          <Link
            to="/login/expert"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
              <ClipboardCheck className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Chuyên gia</h3>
            <p className="text-gray-600 text-center text-sm">Kiểm thử pain point, usability và đề xuất cải thiện thiết kế</p>
          </Link>

        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
