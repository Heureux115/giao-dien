import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ClipboardCheck, Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginExpert() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/uiux-specialist");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">HealthCare AI</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg mb-4">
            <ClipboardCheck className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 font-medium">Chuyên gia đánh giá</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập chuyên gia</h1>
          <p className="text-gray-600">Đánh giá trải nghiệm, pain point và chất lượng thiết kế</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="expert@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              Đăng nhập
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Đăng nhập với vai trò khác?</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login/patient" className="text-sm text-purple-600 hover:underline">Bệnh nhân</Link>
            <span className="text-gray-400">|</span>
            <Link to="/login/doctor" className="text-sm text-purple-600 hover:underline">Bác sĩ</Link>
            <span className="text-gray-400">|</span>
            <Link to="/login/admin" className="text-sm text-purple-600 hover:underline">Quản trị viên</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
