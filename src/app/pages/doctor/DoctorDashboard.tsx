import { Link } from "react-router";
import { Calendar, DollarSign, Users, TrendingUp, Clock, Star, Settings } from "lucide-react";

export default function DoctorDashboard() {
  const stats = [
    { label: "Lịch hẹn hôm nay", value: "5", icon: Calendar, color: "bg-blue-500", change: "+2" },
    { label: "Tổng thu nhập tháng", value: "12,500,000đ", icon: DollarSign, color: "bg-green-500", change: "+15%" },
    { label: "Bệnh nhân", value: "234", icon: Users, color: "bg-purple-500", change: "+12" },
    { label: "Đánh giá", value: "4.9", icon: Star, color: "bg-yellow-500", change: "⭐" },
  ];

  const todayAppointments = [
    { id: 1, time: "09:00", patient: "Nguyễn Văn A", status: "completed", symptoms: "Đau đầu, chóng mặt" },
    { id: 2, time: "10:00", patient: "Trần Thị B", status: "completed", symptoms: "Ho, sốt nhẹ" },
    { id: 3, time: "14:00", patient: "Lê Văn C", status: "upcoming", symptoms: "Đau bụng" },
    { id: 4, time: "15:00", patient: "Phạm Thị D", status: "upcoming", symptoms: "Kiểm tra sức khỏe" },
    { id: 5, time: "16:00", patient: "Hoàng Văn E", status: "upcoming", symptoms: "Tư vấn dinh dưỡng" },
  ];

  const recentReviews = [
    { id: 1, patient: "Nguyễn T.", rating: 5, comment: "Bác sĩ rất tận tâm", date: "2026-04-28" },
    { id: 2, patient: "Trần V.", rating: 5, comment: "Giải thích rõ ràng", date: "2026-04-27" },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Chào mừng trở lại, BS. Nguyễn Văn A</p>
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
        {/* Today's Appointments */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-teal-600" />
              Lịch hẹn hôm nay
            </h2>
            <Link to="/doctor/appointments" className="text-sm text-teal-600 hover:underline">
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                  appointment.status === "upcoming"
                    ? "border-teal-200 bg-teal-50"
                    : "border-gray-200"
                }`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center ${
                    appointment.status === "upcoming" ? "bg-teal-600" : "bg-gray-300"
                  }`}>
                    <Clock className="w-5 h-5 text-white mb-1" />
                    <p className="text-xs font-semibold text-white">{appointment.time}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{appointment.patient}</p>
                    {appointment.status === "upcoming" && (
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded">
                        Sắp tới
                      </span>
                    )}
                    {appointment.status === "completed" && (
                      <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded">
                        Hoàn thành
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                </div>

                {appointment.status === "upcoming" && (
                  <Link
                    to={`/doctor/consult/${appointment.id}`}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium"
                  >
                    Bắt đầu
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Đánh giá gần đây
          </h2>

          <div className="space-y-4 mb-6">
            {recentReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{review.patient}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-1">{review.comment}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4">
              <Link to="/doctor/wallet" className="flex items-center justify-between group">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Số dư ví</p>
                  <p className="text-2xl font-bold text-teal-600">8,250,000đ</p>
                </div>
                <DollarSign className="w-8 h-8 text-teal-600 group-hover:scale-110 transition-transform" />
              </Link>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tăng trưởng</p>
                  <p className="text-xl font-bold text-purple-600">+24%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
              <Link to="/doctor/settings" className="flex items-center justify-between group">
                <div>
                  <p className="text-sm text-orange-700 mb-1 font-medium">Cài đặt hồ sơ</p>
                  <p className="text-xs text-orange-600">Cập nhật thông tin</p>
                </div>
                <Settings className="w-8 h-8 text-orange-600 group-hover:rotate-90 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
