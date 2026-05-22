import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Mail, Lock, Eye, EyeOff, Phone, GraduationCap, Award, FileText, Upload } from "lucide-react";

export default function RegisterDoctor() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Step 2: Professional Info
    specialty: "",
    experience: "",
    education: "",
    workPlace: "",
    licenseNumber: "",

    // Step 3: Additional Info
    bio: "",
    consultationFee: "300000",
    languages: ["Tiếng Việt"],
    certifications: [""],

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

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  const addCertification = () => {
    setFormData({ ...formData, certifications: [...formData.certifications, ""] });
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  const updateCertification = (index: number, value: string) => {
    const newCerts = [...formData.certifications];
    newCerts[index] = value;
    setFormData({ ...formData, certifications: newCerts });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">HealthCare AI</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký bác sĩ</h1>
          <p className="text-gray-600">Tham gia nền tảng tư vấn sức khỏe hàng đầu</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s === step
                    ? "bg-teal-600 text-white"
                    : s < step
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {s < step ? "✓" : s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 ${s < step ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-20 mt-3">
            <span className={`text-sm ${step === 1 ? "text-teal-600 font-medium" : "text-gray-500"}`}>
              Thông tin cá nhân
            </span>
            <span className={`text-sm ${step === 2 ? "text-teal-600 font-medium" : "text-gray-500"}`}>
              Thông tin chuyên môn
            </span>
            <span className={`text-sm ${step === 3 ? "text-teal-600 font-medium" : "text-gray-500"}`}>
              Hoàn tất
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="BS. Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                      Số điện thoại
                    </label>
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
                      placeholder="Tối thiểu 8 ký tự"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Info */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chuyên khoa
                    </label>
                    <select
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Chọn chuyên khoa</option>
                      {specialties.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số năm kinh nghiệm
                    </label>
                    <input
                      type="number"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="10"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Học vấn
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      placeholder="Đại học Y Hà Nội"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nơi làm việc hiện tại
                  </label>
                  <input
                    type="text"
                    value={formData.workPlace}
                    onChange={(e) => setFormData({ ...formData, workPlace: e.target.value })}
                    placeholder="Bệnh viện Bạch Mai"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số chứng chỉ hành nghề
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      placeholder="VN-12345678"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chứng chỉ / Bằng cấp
                  </label>
                  {formData.certifications.map((cert, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <div className="relative flex-1">
                        <Award className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => updateCertification(index, e.target.value)}
                          placeholder="Chuyên khoa I Nội khoa"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      {formData.certifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCertification(index)}
                          className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200"
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCertification}
                    className="text-sm text-teal-600 hover:underline"
                  >
                    + Thêm chứng chỉ
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Additional Info */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới thiệu bản thân
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={5}
                    placeholder="Mô tả về kinh nghiệm, chuyên môn và phương pháp điều trị của bạn..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phí tư vấn (VNĐ / buổi)
                  </label>
                  <input
                    type="number"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                    min="0"
                    step="10000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">Phí đề xuất: 200,000đ - 500,000đ</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tải lên chứng chỉ hành nghề
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-2">Kéo thả file hoặc click để chọn</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="w-4 h-4 mt-1 text-teal-600 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Tôi xác nhận rằng tất cả thông tin trên là chính xác và đồng ý với{" "}
                    <a href="#" className="text-teal-600 hover:underline">Điều khoản sử dụng dành cho bác sĩ</a>
                    {" "}và{" "}
                    <a href="#" className="text-teal-600 hover:underline">Chính sách bảo mật</a>
                  </label>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-900">
                    ℹ️ Hồ sơ của bạn sẽ được xem xét trong vòng 1-2 ngày làm việc. Chúng tôi sẽ liên hệ qua email để thông báo kết quả.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                >
                  Quay lại
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-3 text-gray-600 hover:text-gray-900"
                >
                  Đã có tài khoản?
                </Link>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700"
                >
                  Tiếp tục
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg"
                >
                  Hoàn tất đăng ký
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
