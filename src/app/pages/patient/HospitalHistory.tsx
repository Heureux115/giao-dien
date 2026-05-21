import { useState } from "react";
import { Link } from "react-router";
import { Building2, Calendar, Clock, CheckCircle, XCircle, AlertCircle, ChevronLeft, FileText } from "lucide-react";

interface HospitalAppointment {
  id: number;
  hospitalName: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  hasInsurance: boolean;
  totalAmount: number;
  ticketNumber: string;
}

const mockAppointments: HospitalAppointment[] = [
  {
    id: 1,
    hospitalName: "Bệnh viện Bạch Mai",
    specialty: "Tim mạch",
    date: "2026-05-10",
    time: "09:00",
    status: "upcoming",
    hasInsurance: true,
    totalAmount: 40000,
    ticketNumber: "BM20260510001",
  },
  {
    id: 2,
    hospitalName: "Bệnh viện Vinmec Times City",
    specialty: "Nội khoa",
    date: "2026-04-20",
    time: "14:00",
    status: "completed",
    hasInsurance: false,
    totalAmount: 200000,
    ticketNumber: "VM20260420001",
  },
  {
    id: 3,
    hospitalName: "Bệnh viện Chợ Rẫy",
    specialty: "Tiêu hóa",
    date: "2026-03-15",
    time: "10:30",
    status: "cancelled",
    hasInsurance: true,
    totalAmount: 40000,
    ticketNumber: "CR20260315001",
  },
];

export default function HospitalHistory() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  const filteredAppointments = mockAppointments.filter(
    (apt) => filter === "all" || apt.status === filter
  );

  const stats = {
    total: mockAppointments.length,
    upcoming: mockAppointments.filter((a) => a.status === "upcoming").length,
    completed: mockAppointments.filter((a) => a.status === "completed").length,
    cancelled: mockAppointments.filter((a) => a.status === "cancelled").length,
  };

  const getStatusBadge = (status: HospitalAppointment["status"]) => {
    switch (status) {
      case "upcoming":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">
            <AlertCircle className="w-4 h-4" />
            Sắp tới
          </span>
        );
      case "completed":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
            <CheckCircle className="w-4 h-4" />
            Đã khám
          </span>
        );
      case "cancelled":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg">
            <XCircle className="w-4 h-4" />
            Đã hủy
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          to="/patient/hospitals"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Quay lại đặt lịch
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch khám bệnh viện</h1>
        <p className="text-gray-600">Quản lý các lịch hẹn của bạn tại bệnh viện</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`bg-white rounded-xl p-6 text-left transition-all ${
            filter === "all" ? "ring-2 ring-blue-500 shadow-lg" : "shadow-sm hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Tổng số</span>
            <Building2 className="w-6 h-6 text-gray-600" />
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
            <AlertCircle className="w-6 h-6 text-blue-600" />
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
            <span className="text-green-700 font-medium">Đã khám</span>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-900">{stats.completed}</p>
        </button>

        <button
          onClick={() => setFilter("cancelled")}
          className={`bg-red-50 rounded-xl p-6 text-left transition-all ${
            filter === "cancelled" ? "ring-2 ring-red-500 shadow-lg" : "hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-700 font-medium">Đã hủy</span>
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-900">{stats.cancelled}</p>
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                  🏥
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {appointment.hospitalName}
                  </h3>
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
              {getStatusBadge(appointment.status)}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600 mb-1">Số phiếu khám</p>
                <p className="font-semibold text-gray-900">{appointment.ticketNumber}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600 mb-1">Số tiền đã thanh toán</p>
                <p className="font-semibold text-blue-600">
                  {appointment.totalAmount.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>

            {appointment.hasInsurance && (
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">Đã sử dụng BHYT</span>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              {appointment.status === "upcoming" && (
                <>
                  <Link
                    to={`/patient/hospital-ticket/${appointment.id}`}
                    state={{
                      bookingData: {
                        hospitalName: appointment.hospitalName,
                        specialty: appointment.specialty,
                        date: appointment.date,
                        time: appointment.time,
                        hasInsurance: appointment.hasInsurance,
                      },
                      totalAmount: appointment.totalAmount,
                      paymentMethod: "card",
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    Xem phiếu khám
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Bạn có chắc muốn hủy lịch hẹn này?")) {
                        alert("Đã hủy lịch hẹn!");
                      }
                    }}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium text-sm"
                  >
                    Hủy lịch
                  </button>
                </>
              )}
              {appointment.status === "completed" && (
                <Link
                  to={`/patient/hospital-ticket/${appointment.id}`}
                  state={{
                    bookingData: {
                      hospitalName: appointment.hospitalName,
                      specialty: appointment.specialty,
                      date: appointment.date,
                      time: appointment.time,
                      hasInsurance: appointment.hasInsurance,
                    },
                    totalAmount: appointment.totalAmount,
                    paymentMethod: "card",
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Xem phiếu khám
                </Link>
              )}
              {appointment.status === "cancelled" && (
                <p className="text-sm text-gray-500 py-2">Lịch hẹn đã bị hủy</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {filter === "all" && "Bạn chưa có lịch khám nào"}
            {filter === "upcoming" && "Không có lịch khám sắp tới"}
            {filter === "completed" && "Chưa có lịch khám đã hoàn thành"}
            {filter === "cancelled" && "Không có lịch khám bị hủy"}
          </p>
          <Link
            to="/patient/hospitals"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Đặt lịch khám mới
          </Link>
        </div>
      )}
    </div>
  );
}
