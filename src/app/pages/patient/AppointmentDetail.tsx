import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Calendar, Clock, User, FileText, Download, ArrowLeft, Star, Pill, Heart, CheckCircle } from "lucide-react";
import { getMedicalAppointmentById } from "../../lib/patientAppointmentStore";

const defaultAppointment = {
  id: "",
  date: "2026-04-28",
  time: "14:00",
  doctor: {
    name: "BS. Nguyễn Văn A",
    specialty: "Nội khoa",
    image: "NA",
  },
  patient: {
    name: "Nguyễn Văn X",
    age: 35,
    gender: "Nam",
  },
  symptoms: "Đau đầu, chóng mặt kéo dài 3 ngày",
  diagnosis: "Cảm cúm thông thường kèm theo thiếu ngủ và stress",
  prescription: [
    { name: "Paracetamol 500mg", dosage: "2 viên x 3 lần/ngày", duration: "3 ngày" },
    { name: "Vitamin C", dosage: "1 viên/ngày", duration: "7 ngày" },
  ],
  advice: [
    "Nghỉ ngơi đầy đủ, ngủ ít nhất 7-8 tiếng/ngày",
    "Uống nhiều nước, ít nhất 2 lít/ngày",
    "Tránh căng thẳng và làm việc quá sức",
    "Tái khám sau 3 ngày nếu triệu chứng không thuyên giảm",
  ],
  notes: "Bệnh nhân có tiền sử làm việc nhiều giờ, ít ngủ. Cần điều chỉnh lại lối sống.",
  fee: 300000,
  status: "completed",
  rating: 5,
};

export default function AppointmentDetail() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(() =>
    getMedicalAppointmentById(appointmentId ?? "")
      ? {
          ...defaultAppointment,
          id: appointmentId ?? "",
          ...getMedicalAppointmentById(appointmentId ?? ""),
        }
      : defaultAppointment
  );

  useEffect(() => {
    if (!appointmentId) return;
    const stored = getMedicalAppointmentById(appointmentId);
    if (stored) {
      setAppointment({ ...defaultAppointment, id: appointmentId, ...stored });
    }
  }, [appointmentId]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/patient/history")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Quay lại lịch sử
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Chi tiết buổi tư vấn
            </h1>
            <p className="text-gray-600">Mã lịch hẹn: #{appointment.id}</p>
          </div>
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
            Hoàn thành
          </span>
        </div>

        {/* Appointment Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <h2 className="font-semibold text-lg mb-4 text-blue-900 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Thông tin lịch hẹn
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-blue-700">Ngày khám</p>
                  <p className="font-semibold text-blue-900">
                    {new Date(appointment.date).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-blue-700">Giờ khám</p>
                  <p className="font-semibold text-blue-900">{appointment.time}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-5 text-white">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Bác sĩ tư vấn
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl backdrop-blur-sm">
                {appointment.doctor.image}
              </div>
              <div>
                <p className="font-bold text-xl">{appointment.doctor.name}</p>
                <p className="text-blue-100 mb-2">{appointment.doctor.specialty}</p>
                {appointment.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(appointment.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    ))}
                    <span className="ml-1 text-sm">({appointment.rating}/5)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">Triệu chứng</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-900">{appointment.symptoms}</p>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Chẩn đoán
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900">{appointment.diagnosis}</p>
          </div>
        </div>

        {/* Prescription */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Pill className="w-5 h-5 text-green-600" />
            Đơn thuốc
          </h2>
          <div className="bg-white border-2 border-green-200 rounded-xl overflow-hidden">
            <div className="bg-green-50 px-5 py-3 border-b border-green-200">
              <p className="text-sm font-semibold text-green-900">
                ⚕️ Hướng dẫn sử dụng thuốc
              </p>
            </div>
            <div className="p-5 space-y-4">
              {appointment.prescription.map((med, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-green-700">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 mb-2">{med.name}</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">💊 Liều dùng:</span>
                        <span className="font-semibold text-gray-900">{med.dosage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">⏱️ Thời gian:</span>
                        <span className="font-semibold text-gray-900">{med.duration}</span>
                      </div>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advice */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-600" />
            Lời khuyên của bác sĩ
          </h2>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-5">
            <div className="space-y-3">
              {appointment.advice.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-purple-700" />
                  </div>
                  <p className="text-purple-900 flex-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor Notes */}
        {appointment.notes && (
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-3">Ghi chú</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">{appointment.notes}</p>
            </div>
          </div>
        )}

        {/* Fee */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 mb-1">Tổng chi phí tư vấn</p>
              <p className="text-xs text-blue-600">Đã thanh toán</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-900">{appointment.fee.toLocaleString('vi-VN')}đ</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">Đã thanh toán</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => alert("Tính năng tải xuống sẽ sớm được cập nhật!")}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Tải đơn thuốc (PDF)
          </button>
          {!appointment.rating ? (
            <Link
              to={`/patient/rate/${appointment.id}`}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
            >
              <Star className="w-5 h-5" />
              Đánh giá bác sĩ
            </Link>
          ) : (
            <div className="flex items-center justify-center gap-2 px-6 py-4 bg-green-100 text-green-700 rounded-xl font-semibold border-2 border-green-300">
              <CheckCircle className="w-5 h-5" />
              Đã đánh giá {appointment.rating} sao
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
