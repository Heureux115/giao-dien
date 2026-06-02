import { Link } from "react-router";
import { Shield, Stethoscope, User } from "lucide-react";

const roles = [
  {
    to: "/login/patient",
    title: "Bệnh nhân",
    description: "Tư vấn sức khỏe và đặt lịch khám",
    icon: User,
    iconWrap: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    to: "/login/doctor",
    title: "Bác sĩ",
    description: "Quản lý lịch hẹn và tư vấn bệnh nhân",
    icon: Stethoscope,
    iconWrap: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    to: "/login/admin",
    title: "Quản trị viên",
    description: "Quản lý hệ thống và duyệt bác sĩ",
    icon: Shield,
    iconWrap: "bg-gray-100",
    iconColor: "text-gray-700",
  },
];

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl">
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

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <Link
                key={role.to}
                to={role.to}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow group min-h-[220px] flex flex-col justify-center"
              >
                <div className={`w-16 h-16 ${role.iconWrap} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${role.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{role.title}</h3>
                <p className="text-gray-600 text-center text-sm">{role.description}</p>
              </Link>
            );
          })}
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
