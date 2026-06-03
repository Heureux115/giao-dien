import { useState } from "react";
import { useNavigate } from "react-router";
import { CreditCard, Building, CheckCircle, AlertCircle } from "lucide-react";

export default function DoctorWithdraw() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("Nguyễn Văn A");

  const availableBalance = 8250000;
  const minWithdraw = 100000;
  const maxWithdraw = availableBalance;

  const banks = [
    { id: "vietcombank", name: "Vietcombank", logo: "VCB" },
    { id: "techcombank", name: "Techcombank", logo: "TCB" },
    { id: "vietinbank", name: "VietinBank", logo: "VTB" },
    { id: "mbbank", name: "MB Bank", logo: "MB" },
    { id: "acb", name: "ACB", logo: "ACB" },
  ];

  const quickAmounts = [500000, 1000000, 2000000, 5000000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const withdrawAmount = parseInt(amount.replace(/\D/g, "") || "0", 10);

    if (!selectedBank) {
      alert("Vui lòng chọn ngân hàng");
      return;
    }

    if (!accountNumber) {
      alert("Vui lòng nhập số tài khoản");
      return;
    }

    if (withdrawAmount < minWithdraw) {
      alert(`Số tiền rút tối thiểu là ${minWithdraw.toLocaleString("vi-VN")}đ`);
      return;
    }

    if (withdrawAmount > maxWithdraw) {
      alert(`Số dư không đủ. Số dư hiện tại: ${maxWithdraw.toLocaleString("vi-VN")}đ`);
      return;
    }

    if (confirm(`Xác nhận rút ${withdrawAmount.toLocaleString("vi-VN")}đ về tài khoản ngân hàng?`)) {
      setTimeout(() => {
        alert("Yêu cầu rút tiền đã được gửi! Tiền sẽ về tài khoản trong 1-2 ngày làm việc.");
        navigate("/doctor/wallet");
      }, 500);
    }
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toLocaleString("vi-VN"));
  };

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rút tiền</h1>
          <p className="text-gray-600">Chuyển tiền từ ví về tài khoản ngân hàng</p>
        </div>

        {/* Available Balance */}
        <div className="bg-gradient-to-br from-teal-600 to-blue-600 rounded-2xl p-6 text-white mb-6">
          <p className="text-sm opacity-90 mb-2">Số dư khả dụng</p>
          <p className="text-4xl font-bold">{availableBalance.toLocaleString("vi-VN")}đ</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
          {/* Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số tiền muốn rút
            </label>
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setAmount(value ? parseInt(value, 10).toLocaleString("vi-VN") : "");
                }}
                placeholder="Nhập số tiền"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">đ</span>
            </div>
            <div className="flex gap-2 mt-3">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => handleQuickAmount(quickAmount)}
                  className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 text-sm font-medium"
                >
                  {quickAmount.toLocaleString("vi-VN")}đ
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Rút tối thiểu: {minWithdraw.toLocaleString("vi-VN")}đ
            </p>
          </div>

          {/* Bank Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Chọn ngân hàng
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => setSelectedBank(bank.id)}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl transition-all ${
                    selectedBank === bank.id
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                    selectedBank === bank.id ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    {bank.logo}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{bank.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bank Account */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số tài khoản
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Nhập số tài khoản ngân hàng"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên chủ tài khoản
            </label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Info Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Tiền sẽ về tài khoản trong vòng 1-2 ngày làm việc</li>
                  <li>Phí rút tiền: Miễn phí</li>
                  <li>Vui lòng kiểm tra kỹ thông tin tài khoản trước khi xác nhận</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow"
          >
            Xác nhận rút tiền
          </button>
        </form>

        {/* Recent Withdrawals */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
          <h2 className="font-semibold text-lg mb-4">Lịch sử rút tiền gần đây</h2>
          <div className="space-y-3">
            {[
              { date: "2026-05-02", amount: 5000000, bank: "Vietcombank", status: "completed" },
              { date: "2026-04-25", amount: 4500000, bank: "Techcombank", status: "completed" },
            ].map((withdrawal, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{withdrawal.bank}</p>
                  <p className="text-sm text-gray-600">{withdrawal.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">-{withdrawal.amount.toLocaleString("vi-VN")}đ</p>
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
                    Thành công
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
