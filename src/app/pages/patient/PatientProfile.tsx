import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

const STORAGE_KEY = "patientProfileData";

const defaultProfile = {
  name: "Nguyễn Văn X",
  email: "nguyenvanx@email.com",
  phone: "0901234567",
  birthdate: "1990-01-15",
  gender: "Nam",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  bloodType: "O+",
  allergies: "Không có",
  medicalConditions: "Không có",
};

type StoredPatientProfile = Partial<typeof defaultProfile> & {
  fullName?: string;
};

const getStoredProfile = () => {
  if (typeof window === "undefined") return defaultProfile;

  const storedProfile = localStorage.getItem(STORAGE_KEY);
  if (!storedProfile) return defaultProfile;

  try {
    const parsedProfile = JSON.parse(storedProfile) as StoredPatientProfile;

    return {
      ...defaultProfile,
      ...parsedProfile,
      name: parsedProfile.name || parsedProfile.fullName || defaultProfile.name,
      medicalConditions: parsedProfile.medicalConditions || defaultProfile.medicalConditions,
    };
  } catch {
    return defaultProfile;
  }
};

export default function PatientProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(getStoredProfile);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const handleLogout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hồ sơ của tôi</h1>
        <button
          onClick={() => navigate("/patient/settings")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Edit className="w-4 h-4" />
          Chỉnh sửa
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Profile Header */}
        <div className="flex items-center gap-6 pb-6 border-b border-gray-200 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
            {profile.name.split(' ').pop()?.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-lg mb-4">Thông tin cá nhân</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Số điện thoại</p>
                  <p className="font-medium text-gray-900">{profile.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Ngày sinh</p>
                  <p className="font-medium text-gray-900">{profile.birthdate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Giới tính</p>
                  <p className="font-medium text-gray-900">{profile.gender}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Địa chỉ</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Địa chỉ hiện tại</p>
                <p className="font-medium text-gray-900">{profile.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-lg mb-4">Thông tin y tế</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Nhóm máu</p>
              <p className="font-bold text-xl text-red-600">{profile.bloodType}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Dị ứng</p>
              <p className="font-medium text-gray-900">{profile.allergies}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Bệnh nền</p>
              <p className="font-medium text-gray-900">{profile.medicalConditions}</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="font-semibold text-lg mb-4">Thống kê</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-3xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600 mt-1">Lượt tư vấn</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-3xl font-bold text-teal-600">5</p>
              <p className="text-sm text-gray-600 mt-1">Bác sĩ đã gặp</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-3xl font-bold text-purple-600">8</p>
              <p className="text-sm text-gray-600 mt-1">Tháng sử dụng</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
}
