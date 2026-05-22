import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Award,
  BriefcaseMedical,
  FileText,
  GraduationCap,
  Lock,
  Mail,
  Phone,
  Upload,
  User,
} from "lucide-react";

export default function RegisterDoctor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    specialty: "",
    experience: "",
    education: "",
    workPlace: "",
    licenseNumber: "",
    bio: "",
    consultationFee: "300000",
    certification: "",
    agreeToTerms: false,
  });

  const specialties = [
    "Nội khoa",
    "Tim mạch",
    "Tiêu hóa",
    "Nội tiết",
    "Da liễu",
    "Sản phụ khoa",
    "Nhi khoa",
    "Thần kinh",
    "Hô hấp",
    "Khác",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login/doctor");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">HealthCare AI</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký bác sĩ</h1>
          <p className="text-gray-600">Điền hồ sơ bác sĩ để tham gia tư vấn trên hệ thống</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-teal-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Thông tin tài khoản</h2>
                <p className="text-sm text-gray-600">Các trường có thể bỏ trống để phục vụ demo</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="BS. Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0901234567"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center">
                <BriefcaseMedical className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Thông tin chuyên môn</h2>
                <p className="text-sm text-gray-600">Hồ sơ chuyên môn hiển thị cho bệnh nhân và quản trị viên</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chuyên khoa</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Chọn chuyên khoa</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số năm kinh nghiệm</label>
                <input
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Học vấn</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="Đại học Y Hà Nội"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nơi làm việc hiện tại</label>
                <input
                  value={formData.workPlace}
                  onChange={(e) => setFormData({ ...formData, workPlace: e.target.value })}
                  placeholder="Bệnh viện Bạch Mai"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số chứng chỉ hành nghề</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="VN-12345678"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chứng chỉ / bằng cấp</label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={formData.certification}
                    onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                    placeholder="Chuyên khoa I Nội khoa"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Thông tin bổ sung</h2>
                <p className="text-sm text-gray-600">Giới thiệu, phí tư vấn và tài liệu xác minh</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giới thiệu bản thân</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={5}
                  placeholder="Mô tả kinh nghiệm, chuyên môn và phương pháp tư vấn..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phí tư vấn (VNĐ / buổi)</label>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tải lên giấy tờ</label>
                  <label className="flex items-center justify-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-teal-500 cursor-pointer">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">PDF, JPG, PNG</span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </label>
                </div>
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="w-4 h-4 mt-1 text-teal-600 rounded"
                />
                <span className="text-sm text-gray-600">
                  Tôi xác nhận thông tin trên là chính xác và đồng ý với điều khoản dành cho bác sĩ.
                </span>
              </label>
            </div>
          </section>

          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <Link to="/login/doctor" className="px-6 py-3 text-center text-gray-600 hover:text-gray-900">
              Đã có tài khoản?
            </Link>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg"
            >
              Hoàn tất đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
