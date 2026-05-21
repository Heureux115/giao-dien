import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { CreditCard, Building2, Calendar, Clock, CheckCircle, ChevronLeft } from "lucide-react";
import { addHospitalAppointment } from "../../lib/patientAppointmentStore";

export default function HospitalPayment() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const [paymentMethod, setPaymentMethod] = useState<"card" | "momo" | "zalopay">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  if (!bookingData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Không tìm thấy thông tin đặt lịch</p>
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

  const baseFee = 200000;
  const insuranceDiscount = bookingData.hasInsurance ? baseFee * 0.8 : 0;
  const totalAmount = baseFee - insuranceDiscount;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    const newAppointment = {
      id: Date.now(),
      hospitalName: bookingData.hospitalName,
      specialty: bookingData.specialty,
      date: bookingData.date,
      time: bookingData.time,
      status: "upcoming" as const,
      hasInsurance: bookingData.hasInsurance,
      totalAmount,
      ticketNumber: `HV-${Date.now()}`,
    };

    addHospitalAppointment(newAppointment);

    // Simulate payment processing
    setTimeout(() => {
      navigate(`/patient/hospital-ticket/${newAppointment.id}`, {
        state: {
          bookingData,
          paymentMethod,
          totalAmount,
          appointmentId: newAppointment.id,
        },
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/patient/hospitals")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        Quay lại
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Booking Summary */}
        <div className="md:col-span-2 space-y-6">
          {/* Booking Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin đặt lịch</h2>

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

              {bookingData.hasInsurance && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Sử dụng bảo hiểm y tế</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Phương thức thanh toán</h2>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value as "card")}
                  className="w-5 h-5 text-blue-600"
                />
                <CreditCard className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-900">Thẻ tín dụng / Ghi nợ</span>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="momo"
                  checked={paymentMethod === "momo"}
                  onChange={(e) => setPaymentMethod(e.target.value as "momo")}
                  className="w-5 h-5 text-blue-600"
                />
                <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Ví MoMo</span>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="zalopay"
                  checked={paymentMethod === "zalopay"}
                  onChange={(e) => setPaymentMethod(e.target.value as "zalopay")}
                  className="w-5 h-5 text-blue-600"
                />
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-900">ZaloPay</span>
              </label>
            </div>

            {paymentMethod === "card" && (
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số thẻ
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên chủ thẻ
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="NGUYEN VAN A"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày hết hạn
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
                >
                  Thanh toán {totalAmount.toLocaleString('vi-VN')}đ
                </button>
              </form>
            )}

            {(paymentMethod === "momo" || paymentMethod === "zalopay") && (
              <button
                onClick={handlePayment}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
              >
                Thanh toán với {paymentMethod === "momo" ? "MoMo" : "ZaloPay"}
              </button>
            )}
          </div>
        </div>

        {/* Price Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Chi tiết thanh toán</h2>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Phí khám:</span>
                <span className="font-semibold text-gray-900">{baseFee.toLocaleString('vi-VN')}đ</span>
              </div>

              {bookingData.hasInsurance && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Giảm trừ BHYT (80%):</span>
                  <span className="font-semibold text-green-600">-{insuranceDiscount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-300 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 text-lg">Tổng cộng:</span>
                <span className="font-bold text-blue-600 text-2xl">{totalAmount.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 Sau khi thanh toán thành công, bạn sẽ nhận được phiếu khám bệnh điện tử
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
