import { useState } from "react";
import { Link } from "react-router";
import { Calendar, User, Star, FileText, Video, CheckCircle, Clock, MapPin } from "lucide-react";

const appointments = [
  {
    id: "abc123",
    date: "2026-04-28",
    time: "14:00",
    doctor: "BS. Nguyễn Văn A",
    specialty: "Nội khoa",
    status: "completed",
    rating: 5,
    diagnosis: "Cảm cúm thông thường",
  },
  {
    id: "def456",
    date: "2026-04-15",
    time: "10:00",
    doctor: "BS. Trần Thị B",
    specialty: "Tim mạch",
    status: "completed",
    rating: 4,
    diagnosis: "Kiểm tra sức khỏe định kỳ",
  },
  {
    id: "ghi789",
    date: "2026-05-08",
    time: "09:00",
    doctor: "BS. Lê Văn C",
    specialty: "Tiêu hóa",
    status: "upcoming",
    rating: null,
    diagnosis: null,
  },
  {
    id: "xyz123",
    date: "2026-05-12",
    time: "14:30",
    doctor: "BS. Hoàng Thị E",
    specialty: "Da liễu",
    status: "upcoming",
    rating: null,
    diagnosis: null,
  },
  {
    id: "jkl012",
    date: "2026-03-20",
    time: "15:00",
    doctor: "BS. Phạm Thị D",
    specialty: "Nội tiết",
    status: "completed",
    rating: 5,
    diagnosis: "Tư vấn dinh dưỡng",
  },
  {
    id: "mno345",
    date: "2026-02-10",
    time: "11:00",
    doctor: "BS. Vũ Văn F",
    specialty: "Hô hấp",
    status: "completed",
    rating: null,
    diagnosis: "Viêm họng nhẹ",
  },
];

export default function MedicalHistory() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  const filteredAppointments = appointments.filter(
    (apt) => filter === "all" || apt.status === filter
  );

  const stats = {
    total: appointments.length,
    upcoming: appointments.filter((a) => a.status === "upcoming").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử khám bệnh</h1>
      <p className="text-gray-600 mb-8">Quản lý các lịch tư vấn với bác sĩ</p>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`bg-white rounded-xl p-6 text-left transition-all ${
            filter === "all" ? "ring-2 ring-blue-500 shadow-lg" : "shadow-sm hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Tổng số</span>
            <Calendar className="w-6 h-6 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </button>

        <button
          onClick={() => setFilter("upcoming")}
          className={`bg-blue-50 rounded-xl p-6 text-left transition-all ${
            filter === "upcoming" ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-700 font-medium">Sắp tới</span>
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-900">{stats.upcoming}</p>
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`bg-green-50 rounded-xl p-6 text-left transition-all ${
            filter === "completed" ? "ring-2 ring-green-500 shadow-lg" : "hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 font-medium">Đã hoàn thành</span>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-900">{stats.completed}</p>
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 ${
              appointment.status === "upcoming" ? "border-2 border-blue-600" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center text-white">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {appointment.doctor}
                    </h3>
                    {appointment.status === "upcoming" && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">
                        <Clock className="w-4 h-4" />
                        Sắp tới
                      </span>
                    )}
                    {appointment.status === "completed" && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                        Đã hoàn thành
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">Chuyên khoa: {appointment.specialty}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(appointment.date).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {appointment.status === "completed" && (
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {appointment.diagnosis && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Chẩn đoán</p>
                    <p className="font-semibold text-gray-900">{appointment.diagnosis}</p>
                  </div>
                )}
                {appointment.rating && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Đánh giá của bạn</p>
                    <div className="flex items-center gap-1">
                      {[...Array(appointment.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                      <span className="ml-2 font-semibold text-gray-900">{appointment.rating}/5</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Upcoming appointment info */}
            {appointment.status === "upcoming" && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Lịch hẹn sắp tới</p>
                    <p className="text-sm text-blue-700">
                      Buổi tư vấn của bạn sẽ bắt đầu vào {appointment.time} ngày{" "}
                      {new Date(appointment.date).toLocaleDateString('vi-VN')}.
                      Vui lòng vào phòng tư vấn trước 5 phút.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              {appointment.status === "completed" ? (
                <>
                  <Link
                    to={`/patient/history/${appointment.id}`}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    <FileText className="w-5 h-5" />
                    Xem chi tiết hồ sơ
                  </Link>
                  {!appointment.rating && (
                    <Link
                      to={`/patient/rate/${appointment.id}`}
                      className="flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 font-semibold"
                    >
                      <Star className="w-5 h-5" />
                      Đánh giá bác sĩ
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to={`/patient/consult-session/${appointment.id}`}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    <Video className="w-5 h-5" />
                    Vào phòng tư vấn
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Bạn có chắc muốn hủy lịch hẹn này?")) {
                        alert("Đã hủy lịch hẹn!");
                      }
                    }}
                    className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-semibold"
                  >
                    Hủy lịch
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {filter === "all" && "Bạn chưa có lịch hẹn nào"}
            {filter === "upcoming" && "Không có lịch hẹn sắp tới"}
            {filter === "completed" && "Chưa có lịch hẹn nào hoàn thành"}
          </p>
          <Link
            to="/patient/consult"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Tư vấn với AI ngay
          </Link>
        </div>
      )}
    </div>
  );
}
