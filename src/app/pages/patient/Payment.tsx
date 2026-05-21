import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { CreditCard, Smartphone, Building, Check } from "lucide-react";

export default function Payment() {
  const { appointmentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, formData } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate(`/patient/booking-confirmed/${appointmentId}`, {
        state: { doctor, formData }
      });
    }, 2000);
  };

  if (!doctor || !formData) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Không tìm thấy thông tin đặt lịch</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Thanh toán</h1>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Thông tin đặt lịch</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Bác sĩ:</span>
            <span className="font-medium">{doctor.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bệnh nhân:</span>
            <span className="font-medium">{formData.patientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ngày giờ:</span>
            <span className="font-medium">{formData.date} - {formData.time}</span>
          </div>
          <div className="flex justify-between pt-3 border-t">
            <span className="text-gray-600">Phí khám:</span>
            <span className="font-medium">{doctor.price.toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Tổng cộng:</span>
            <span className="text-green-600">{doctor.price.toLocaleString()}đ</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Phương thức thanh toán</h2>
        <div className="space-y-3">
          {[
            { id: "card", icon: CreditCard, label: "Thẻ tín dụng / Ghi nợ", desc: "Visa, Mastercard, JCB" },
            { id: "momo", icon: Smartphone, label: "Ví MoMo", desc: "Quét mã QR để thanh toán" },
            { id: "bank", icon: Building, label: "Chuyển khoản ngân hàng", desc: "Chuyển khoản trực tiếp" },
          ].map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl transition-all ${
                  paymentMethod === method.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  paymentMethod === method.id ? "bg-blue-600" : "bg-gray-100"
                }`}>
                  <Icon className={`w-6 h-6 ${
                    paymentMethod === method.id ? "text-white" : "text-gray-600"
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{method.label}</p>
                  <p className="text-sm text-gray-600">{method.desc}</p>
                </div>
                {paymentMethod === method.id && (
                  <Check className="w-6 h-6 text-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Payment Form */}
      {paymentMethod === "card" && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">Thông tin thẻ</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Số thẻ</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Ngày hết hạn</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
      >
        {isProcessing ? "Đang xử lý..." : `Thanh toán ${doctor.price.toLocaleString()}đ`}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Thông tin thanh toán của bạn được bảo mật an toàn
      </p>
    </div>
  );
}
