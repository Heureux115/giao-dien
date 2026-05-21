import { useNavigate, useParams, useLocation, Link } from "react-router";
import { CheckCircle, Building2, Calendar, Clock, User, FileText, Download, Home, ClipboardList } from "lucide-react";

export default function HospitalTicket() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  const paymentMethod = location.state?.paymentMethod;
  const totalAmount = location.state?.totalAmount;

  if (!bookingData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Không tìm thấy thông tin phiếu khám</p>
          <button
            onClick={() => navigate("/patient/hospitals")}
            className="text-blue-600 hover:underline"
          >
            Quay lại trang đặt lịch
          </button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    alert("Tính năng tải xuống phiếu khám sẽ sớm được cập nhật!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt lịch thành công!</h1>
          <p className="text-gray-600 mb-6">
            Phiếu khám bệnh điện tử của bạn đã được tạo. Vui lòng mang theo phiếu này khi đến khám.
          </p>

          <div className="flex gap-3 justify-center">
            <Link
              to="/patient"
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </Link>
            <Link
              to="/patient/hospital-history"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              <ClipboardList className="w-5 h-5" />
              Xem lịch đã đặt
            </Link>
          </div>
        </div>

        {/* Medical Ticket */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">PHIẾU KHÁM BỆNH ĐIỆN TỬ</h2>
                <p className="text-blue-100">Mã số: #{appointmentId}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">Ngày tạo</p>
                <p className="font-semibold">{new Date().toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Patient Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Thông tin bệnh nhân
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Họ và tên</p>
                  <p className="font-semibold text-gray-900">Nguyễn Văn A</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày sinh</p>
                  <p className="font-semibold text-gray-900">01/01/1990</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số điện thoại</p>
                  <p className="font-semibold text-gray-900">0901234567</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Địa chỉ</p>
                  <p className="font-semibold text-gray-900">Hà Nội</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Appointment Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Thông tin lịch khám
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Bệnh viện</p>
                    <p className="font-semibold text-gray-900">{bookingData.hospitalName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Chuyên khoa</p>
                    <p className="font-semibold text-gray-900">{bookingData.specialty}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Ngày khám</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(bookingData.date).toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Giờ khám</p>
                    <p className="font-semibold text-gray-900">{bookingData.time}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Payment Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin thanh toán</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Phương thức:</span>
                  <span className="font-semibold text-gray-900">
                    {paymentMethod === "card" && "Thẻ tín dụng/Ghi nợ"}
                    {paymentMethod === "momo" && "Ví MoMo"}
                    {paymentMethod === "zalopay" && "ZaloPay"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Tổng thanh toán:</span>
                  <span className="font-bold text-blue-600 text-lg">
                    {totalAmount?.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                {bookingData.hasInsurance && (
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Đã áp dụng BHYT</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Important Notes */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">📌 Lưu ý quan trọng</h4>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>Vui lòng đến trước giờ hẹn 15-30 phút để làm thủ tục</li>
                <li>Mang theo CMND/CCCD và thẻ BHYT (nếu có)</li>
                <li>Nếu cần hủy lịch, vui lòng thông báo trước ít nhất 2 giờ</li>
                <li>Liên hệ hotline bệnh viện nếu có thắc mắc</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              <Download className="w-5 h-5" />
              Tải xuống phiếu khám
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Phiếu khám này có giá trị cho đến hết ngày {new Date(bookingData.date).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6 text-center">
          <h3 className="font-bold text-gray-900 mb-4">Mã QR phiếu khám</h3>
          <div className="w-48 h-48 bg-gray-100 mx-auto rounded-lg flex items-center justify-center mb-4">
            <div className="text-6xl">📱</div>
          </div>
          <p className="text-sm text-gray-600">
            Quét mã QR này tại quầy tiếp nhận để check-in nhanh chóng
          </p>
        </div>
      </div>
    </div>
  );
}
