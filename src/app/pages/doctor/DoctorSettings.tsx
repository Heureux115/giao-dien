import { useState } from "react";
import { User, Lock, DollarSign, Mail, Phone, Save, Eye, EyeOff, GraduationCap, Award, Upload, MapPin, Calendar as CalendarIcon } from "lucide-react";

export default function DoctorSettings() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: "BS. Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0901234567",
    gender: "Nam",
    dateOfBirth: "1980-05-15",
    address: "Hà Nội, Việt Nam",
    specialty: "Nội khoa",
    experience: "15",
    education: "Đại học Y Hà Nội",
    licenseNumber: "VN-12345678",
    additionalCertificates: "Chuyên khoa I Nội khoa, Chứng chỉ Tim mạch nâng cao",
    consultationFee: "300000",
    bio: "Bác sĩ Nội khoa với hơn 15 năm kinh nghiệm...",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate bio length
    if (profileData.bio.length < 50) {
      alert("Phần giới thiệu phải có ít nhất 50 ký tự!");
      return;
    }

    // Validate consultation fee
    const fee = parseInt(profileData.consultationFee);
    if (fee < 50000 || fee > 5000000) {
      alert("Phí tư vấn phải trong khoảng 50.000đ - 5.000.000đ!");
      return;
    }

    alert("✅ Cập nhật thông tin thành công!\n\nThông tin của bạn đã được lưu và sẽ hiển thị trên hồ sơ bác sĩ.");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }
    alert("✅ Đổi mật khẩu thành công!\n\nVui lòng đăng nhập lại với mật khẩu mới.");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const tabs = [
    { id: "profile" as const, label: "Thông tin cá nhân", icon: User },
    { id: "password" as const, label: "Đổi mật khẩu", icon: Lock },
  ];

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cài đặt</h1>

      {/* Horizontal Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <form onSubmit={handleSaveProfile}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin cá nhân</h2>

                <div className="space-y-6">
                  {/* Avatar Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ảnh đại diện
                    </label>
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl overflow-hidden">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span>{profileData.fullName.charAt(3)}</span>
                        )}
                      </div>
                      <div>
                        <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer font-medium">
                          <Upload className="w-5 h-5" />
                          Tải ảnh lên
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-sm text-gray-500 mt-2">JPG, PNG tối đa 5MB</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giới tính *
                      </label>
                      <select
                        value={profileData.gender}
                        onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày sinh *
                      </label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin chuyên môn</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chuyên khoa *
                        </label>
                        <select
                          value={profileData.specialty}
                          onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        >
                          <option>Nội khoa</option>
                          <option>Tim mạch</option>
                          <option>Tiêu hóa</option>
                          <option>Nội tiết</option>
                          <option>Hô hấp</option>
                          <option>Thần kinh</option>
                          <option>Da liễu</option>
                          <option>Tai mũi họng</option>
                          <option>Mắt</option>
                          <option>Sản phụ khoa</option>
                          <option>Nhi khoa</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số năm kinh nghiệm *
                        </label>
                        <input
                          type="number"
                          value={profileData.experience}
                          onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                          min="0"
                          max="50"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Học vấn *
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.education}
                        onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                        placeholder="Ví dụ: Đại học Y Hà Nội"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số chứng chỉ hành nghề *
                    </label>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.licenseNumber}
                        onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">⚠️ Không thể chỉnh sửa - đã được xác minh bởi quản trị viên</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chứng chỉ bổ sung
                    </label>
                    <div className="relative">
                      <Award className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        value={profileData.additionalCertificates}
                        onChange={(e) => setProfileData({ ...profileData, additionalCertificates: e.target.value })}
                        rows={3}
                        placeholder="Ví dụ: Chuyên khoa I Nội khoa, Chứng chỉ Tim mạch nâng cao, ..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Nhập các chứng chỉ, bằng cấp bổ sung (cách nhau bởi dấu phẩy)</p>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin dịch vụ</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phí tư vấn (VNĐ / buổi) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={profileData.consultationFee}
                          onChange={(e) => setProfileData({ ...profileData, consultationFee: e.target.value })}
                          min="50000"
                          max="5000000"
                          step="10000"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        💡 Mức phí từ 50.000đ - 5.000.000đ. Bạn sẽ nhận {Math.round((parseInt(profileData.consultationFee) || 0) * 0.85).toLocaleString('vi-VN')}đ sau khi trừ phí hệ thống (15%)
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giới thiệu bản thân *
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={6}
                        placeholder="Hãy giới thiệu về kinh nghiệm, chuyên môn và phong cách làm việc của bạn để bệnh nhân hiểu rõ hơn..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                        minLength={50}
                        maxLength={1000}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {profileData.bio.length}/1000 ký tự (tối thiểu 50 ký tự)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Lưu thay đổi
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Bạn có chắc muốn hủy các thay đổi?")) {
                        window.location.reload();
                      }
                    }}
                    className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            )}

            {/* Password Tab */}
            {activeTab === "password" && (
              <form onSubmit={handleChangePassword}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Đổi mật khẩu</h2>
                <p className="text-gray-600 mb-6">Cập nhật mật khẩu để bảo mật tài khoản của bạn</p>

                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu hiện tại *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu mới *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Tối thiểu 8 ký tự</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Xác nhận mật khẩu mới *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <p className="text-sm text-yellow-900">
                      ⚠️ Sau khi đổi mật khẩu, bạn sẽ cần đăng nhập lại
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Đổi mật khẩu
                  </button>
                  <button
                    type="button"
                    onClick={() => setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })}
                    className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            )}
      </div>
    </div>
  );
}
