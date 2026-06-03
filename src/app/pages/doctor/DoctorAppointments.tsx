import { Link } from "react-router";
import { Calendar, Clock, User, CheckCircle, XCircle, Video } from "lucide-react";
import { useState } from "react";

const initialAppointments = [
  { id: 1, date: "2026-05-05", time: "09:00", patient: "Nguyễn Văn A", phone: "0901234567", symptoms: "Đau đầu, chóng mặt", status: "confirmed", fee: 300000 },
  { id: 2, date: "2026-05-05", time: "10:00", patient: "Trần Thị B", phone: "0902345678", symptoms: "Ho, sốt nhẹ", status: "confirmed", fee: 300000 },
  { id: 3, date: "2026-05-05", time: "14:00", patient: "Lê Văn C", phone: "0903456789", symptoms: "Đau bụng", status: "pending", fee: 300000 },
  { id: 4, date: "2026-05-06", time: "09:00", patient: "Phạm Thị D", phone: "0904567890", symptoms: "Kiểm tra sức khỏe", status: "pending", fee: 300000 },
  { id: 5, date: "2026-05-06", time: "14:00", patient: "Hoàng Văn E", phone: "0905678901", symptoms: "Tư vấn dinh dưỡng", status: "confirmed", fee: 300000 },
  { id: 6, date: "2026-04-28", time: "10:00", patient: "Vũ Thị F", phone: "0906789012", symptoms: "Cảm cúm", status: "completed", fee: 300000 },
];

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState<string>("all");

  const filteredAppointments = appointments.filter(apt => {
    if (filter === "all") return true;
    return apt.status === filter;
  });

  const handleAccept = (id: number) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: "confirmed" } : apt));
  };

  const handleReject = (id: number) => {
    if (confirm("Bạn có chắc muốn từ chối lịch hẹn này?")) {
      setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: "rejected" } : apt));
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý lịch hẹn</h1>
        <p className="text-gray-600">Tổng số: {appointments.length} lịch hẹn</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 whitespace-nowrap border-b-2 transition-colors ${
            filter === "all"
              ? "border-teal-600 text-teal-600 font-medium"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Tất cả ({appointments.length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 whitespace-nowrap border-b-2 transition-colors ${
            filter === "pending"
              ? "border-teal-600 text-teal-600 font-medium"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Chờ duyệt ({appointments.filter(a => a.status === "pending").length})
        </button>
        <button
          onClick={() => setFilter("confirmed")}
          className={`px-4 py-2 whitespace-nowrap border-b-2 transition-colors ${
            filter === "confirmed"
              ? "border-teal-600 text-teal-600 font-medium"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Đã xác nhận ({appointments.filter(a => a.status === "confirmed").length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 whitespace-nowrap border-b-2 transition-colors ${
            filter === "completed"
              ? "border-teal-600 text-teal-600 font-medium"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Hoàn thành ({appointments.filter(a => a.status === "completed").length})
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Date & Time */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-xl flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-teal-600">
                      {new Date(appointment.date).getDate()}
                    </p>
                    <p className="text-xs text-teal-600">
                      Th{new Date(appointment.date).getMonth() + 1}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <p className="font-semibold text-gray-900">{appointment.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{appointment.patient}</p>
                  </div>
                  <p className="text-xs text-gray-500">{appointment.phone}</p>
                </div>
              </div>

              {/* Patient Info */}
              <div className="flex-1 lg:ml-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Triệu chứng:</p>
                  <p className="text-sm text-gray-900 font-medium">{appointment.symptoms}</p>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  {appointment.status === "pending" && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg">
                      Chờ duyệt
                    </span>
                  )}
                  {appointment.status === "confirmed" && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">
                      Đã xác nhận
                    </span>
                  )}
                  {appointment.status === "completed" && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
                      Hoàn thành
                    </span>
                  )}
                  {appointment.status === "rejected" && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg">
                      Đã từ chối
                    </span>
                  )}
                  <span className={`text-sm font-semibold ${appointment.status === 'rejected' ? 'text-gray-400 line-through' : 'text-green-600'}`}>
                    {appointment.fee.toLocaleString()}đ
                  </span>
                </div>

                {appointment.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(appointment.id)}
                      className="flex items-center gap-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Chấp nhận
                    </button>
                    <button
                      onClick={() => handleReject(appointment.id)}
                      className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      Từ chối
                    </button>
                  </div>
                )}

                {appointment.status === "confirmed" && (
                  <Link
                    to={`/doctor/consult/${appointment.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm"
                  >
                    <Video className="w-4 h-4" />
                    Bắt đầu tư vấn
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Không có lịch hẹn nào</p>
        </div>
      )}
    </div>
  );
}
