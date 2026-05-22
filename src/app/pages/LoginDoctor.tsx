import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, Stethoscope } from "lucide-react";

export default function LoginDoctor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/doctor");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">HealthCare AI</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-lg mb-4">
            <Stethoscope className="w-5 h-5 text-teal-600" />
            <span className="text-teal-700 font-medium">Đăng nhập Bác sĩ</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng Bác sĩ!</h1>
          <p className="text-gray-600">Đăng nhập để quản lý lịch hẹn và tư vấn</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="doctor@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <button type="button" className="text-sm text-teal-600 hover:underline">
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              Đăng nhập
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Chưa đăng ký làm bác sĩ?{" "}
            <Link to="/register/doctor" className="text-teal-600 font-medium hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Đăng nhập với vai trò khác?</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login/patient" className="text-sm text-teal-600 hover:underline">Bệnh nhân</Link>
            <span className="text-gray-400">|</span>
            <Link to="/login/admin" className="text-sm text-teal-600 hover:underline">Quản trị viên</Link>
            <span className="text-gray-400">|</span>
            <Link to="/login/expert" className="text-sm text-teal-600 hover:underline">Chuyên gia</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
