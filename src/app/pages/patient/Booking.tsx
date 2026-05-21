import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { Calendar, Clock, User, MessageSquare } from "lucide-react";

export default function Booking() {
  const { doctorId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "Nguyễn Văn X",
    phone: "0901234567",
    date: searchParams.get("date") || "2026-05-05",
    time: searchParams.get("time") || "09:00",
    reason: "",
  });

  const doctor = {
    name: "BS. Nguyễn Văn A",
    specialty: "Nội khoa",
    price: 300000,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentId = Math.random().toString(36).substring(7);
    navigate(`/patient/payment/${appointmentId}`, {
      state: { doctor, formData }
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Đặt lịch khám</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Thông tin bác sĩ</h2>
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            NA
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Phí khám</p>
            <p className="text-xl font-bold text-green-600">{doctor.price.toLocaleString()}đ</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="font-semibold text-lg mb-6">Thông tin đặt lịch</h2>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Họ và tên
            </label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Số điện thoại
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                Ngày khám
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4" />
                Giờ khám
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4" />
              Lý do khám (tùy chọn)
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={4}
              placeholder="Mô tả triệu chứng hoặc lý do khám..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700">Tổng chi phí:</span>
            <span className="text-2xl font-bold text-green-600">{doctor.price.toLocaleString()}đ</span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Tiếp tục thanh toán
          </button>
        </div>
      </form>
    </div>
  );
}
