import { Link } from "react-router";
import { Users, UserCheck, TrendingUp, DollarSign, Calendar, Activity } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Tổng người dùng", value: "25,834", icon: Users, color: "bg-blue-500", change: "+1,234" },
    { label: "Bác sĩ hoạt động", value: "342", icon: UserCheck, color: "bg-teal-500", change: "+28" },
    { label: "Tư vấn hôm nay", value: "1,456", icon: Activity, color: "bg-purple-500", change: "+156" },
    { label: "Doanh thu tháng", value: "450M", icon: DollarSign, color: "bg-green-500", change: "+12%" },
  ];

  const pendingDoctors = [
    { id: 1, name: "BS. Hoàng Văn F", specialty: "Da liễu", experience: 8, submittedDate: "2026-05-03" },
    { id: 2, name: "BS. Đặng Thị G", specialty: "Sản phụ khoa", experience: 12, submittedDate: "2026-05-02" },
    { id: 3, name: "BS. Vũ Văn H", specialty: "Nhi khoa", experience: 6, submittedDate: "2026-05-01" },
  ];

  const recentActivities = [
    { id: 1, type: "user", message: "125 người dùng mới đăng ký", time: "2 giờ trước" },
    { id: 2, type: "doctor", message: "3 bác sĩ đang chờ duyệt", time: "3 giờ trước" },
    { id: 3, type: "consultation", message: "1,456 tư vấn được hoàn thành", time: "5 giờ trước" },
    { id: 4, type: "revenue", message: "Doanh thu đạt 15M VNĐ", time: "1 ngày trước" },
  ];

  const topDoctors = [
    { name: "BS. Nguyễn Văn A", consultations: 234, rating: 4.9, revenue: "70.2M" },
    { name: "BS. Trần Thị B", consultations: 189, rating: 4.8, revenue: "56.7M" },
    { name: "BS. Lê Văn C", consultations: 156, rating: 4.7, revenue: "46.8M" },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Tổng quan hệ thống</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Doctors */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-gray-700" />
              Bác sĩ chờ duyệt
            </h2>
            <Link to="/admin/approve-doctors" className="text-sm text-blue-600 hover:underline">
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-3">
            {pendingDoctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-bold">
                  {doctor.name.split(' ')[1][0]}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialty} - {doctor.experience} năm KN</p>
                  <p className="text-xs text-gray-500">Nộp hồ sơ: {doctor.submittedDate}</p>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                    Duyệt
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-gray-700" />
            Hoạt động gần đây
          </h2>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === "user" ? "bg-blue-100" :
                  activity.type === "doctor" ? "bg-teal-100" :
                  activity.type === "consultation" ? "bg-purple-100" : "bg-green-100"
                }`}>
                  {activity.type === "user" && <Users className="w-4 h-4 text-blue-600" />}
                  {activity.type === "doctor" && <UserCheck className="w-4 h-4 text-teal-600" />}
                  {activity.type === "consultation" && <Activity className="w-4 h-4 text-purple-600" />}
                  {activity.type === "revenue" && <DollarSign className="w-4 h-4 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Doctors */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Bác sĩ xuất sắc nhất tháng</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {topDoctors.map((doctor, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                  index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-600"
                }`}>
                  {index + 1}
                </div>
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-4">{doctor.name}</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tư vấn:</span>
                  <span className="font-semibold text-gray-900">{doctor.consultations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Đánh giá:</span>
                  <span className="font-semibold text-yellow-600">⭐ {doctor.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Doanh thu:</span>
                  <span className="font-semibold text-green-600">{doctor.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Link
          to="/admin/approve-doctors"
          className="bg-yellow-100 hover:bg-yellow-200 rounded-xl p-6 flex items-center gap-4 transition-colors group"
        >
          <UserCheck className="w-8 h-8 text-yellow-700 group-hover:scale-110 transition-transform" />
          <div>
            <h3 className="font-semibold text-yellow-900">Duyệt bác sĩ</h3>
            <p className="text-sm text-yellow-700">{pendingDoctors.length} hồ sơ đang chờ</p>
          </div>
        </Link>

        <Link
          to="/admin/manage-doctors"
          className="bg-teal-100 hover:bg-teal-200 rounded-xl p-6 flex items-center gap-4 transition-colors group"
        >
          <Users className="w-8 h-8 text-teal-700 group-hover:scale-110 transition-transform" />
          <div>
            <h3 className="font-semibold text-teal-900">Quản lý bác sĩ</h3>
            <p className="text-sm text-teal-700">342 bác sĩ đang hoạt động</p>
          </div>
        </Link>

        <Link
          to="/admin/stats"
          className="bg-blue-100 hover:bg-blue-200 rounded-xl p-6 flex items-center gap-4 transition-colors group"
        >
          <TrendingUp className="w-8 h-8 text-blue-700 group-hover:scale-110 transition-transform" />
          <div>
            <h3 className="font-semibold text-blue-900">Thống kê hệ thống</h3>
            <p className="text-sm text-blue-700">Xem báo cáo chi tiết</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
