import { Link, useParams, useLocation } from "react-router";
import { CheckCircle, Calendar, Clock, User, Video, MessageCircle } from "lucide-react";

export default function BookingConfirmed() {
  const { appointmentId } = useParams();
  const location = useLocation();
  const { doctor, formData } = location.state || {
    doctor: { name: "BS. Nguyễn Văn A", specialty: "Nội khoa", price: 300000 },
    formData: { patientName: "Nguyễn Văn X", date: "2026-05-05", time: "09:00" }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8 flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đặt lịch thành công!
          </h1>
          <p className="text-gray-600">
            Mã lịch hẹn: <span className="font-mono font-semibold">#{appointmentId}</span>
          </p>
        </div>

        {/* Appointment Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Thông tin lịch hẹn</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bác sĩ</p>
                <p className="font-semibold text-gray-900">{doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày khám</p>
                <p className="font-semibold text-gray-900">{formData.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Giờ khám</p>
                <p className="font-semibold text-gray-900">{formData.time}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-medium mb-2">📧 Xác nhận đã được gửi</p>
              <p className="text-sm text-blue-700">
                Chúng tôi đã gửi email xác nhận và nhắc lịch đến địa chỉ email của bạn.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Các bước tiếp theo</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold">
                1
              </div>
              <p className="text-sm text-gray-700 pt-0.5">
                Chúng tôi sẽ gửi nhắc nhở trước 30 phút qua SMS và email
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold">
                2
              </div>
              <p className="text-sm text-gray-700 pt-0.5">
                Đúng giờ hẹn, bạn sẽ vào phòng tư vấn để chat/video với bác sĩ
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold">
                3
              </div>
              <p className="text-sm text-gray-700 pt-0.5">
                Sau buổi tư vấn, bạn có thể đánh giá bác sĩ để giúp người khác
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to={`/patient/consult-session/${appointmentId}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-shadow"
          >
            <Video className="w-5 h-5" />
            Vào phòng tư vấn (Demo)
          </Link>

          <Link
            to="/patient/history"
            className="flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-6 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Xem lịch sử
          </Link>
        </div>

        <Link
          to="/patient"
          className="block text-center text-gray-600 hover:text-gray-900 mt-6"
        >
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
}
