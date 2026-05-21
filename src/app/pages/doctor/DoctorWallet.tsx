import { Link } from "react-router";
import { Wallet, TrendingUp, Download, Calendar, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function DoctorWallet() {
  const walletStats = {
    balance: 8250000,
    thisMonth: 12500000,
    lastMonth: 10850000,
    totalEarned: 98400000,
  };

  const transactions = [
    { id: 1, date: "2026-05-04", type: "income", amount: 300000, description: "Tư vấn - Nguyễn Văn A", status: "completed" },
    { id: 2, date: "2026-05-03", type: "income", amount: 400000, description: "Tư vấn - Trần Thị B", status: "completed" },
    { id: 3, date: "2026-05-02", type: "withdraw", amount: -5000000, description: "Rút tiền về tài khoản", status: "completed" },
    { id: 4, date: "2026-05-01", type: "income", amount: 350000, description: "Tư vấn - Lê Văn C", status: "completed" },
    { id: 5, date: "2026-04-30", type: "income", amount: 380000, description: "Tư vấn - Phạm Thị D", status: "completed" },
    { id: 6, date: "2026-04-29", type: "income", amount: 300000, description: "Tư vấn - Hoàng Văn E", status: "pending" },
  ];

  const monthlyData = [
    { month: "T1", amount: 9200000 },
    { month: "T2", amount: 10100000 },
    { month: "T3", amount: 11500000 },
    { month: "T4", amount: 10850000 },
    { month: "T5", amount: 12500000 },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ví của tôi</h1>
        <p className="text-gray-600">Quản lý thu nhập và rút tiền</p>
      </div>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-teal-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-8 h-8" />
            <span className="text-sm bg-white/20 px-2 py-1 rounded">Khả dụng</span>
          </div>
          <p className="text-3xl font-bold mb-1">{walletStats.balance.toLocaleString()}đ</p>
          <p className="text-teal-100 text-sm">Số dư hiện tại</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{walletStats.thisMonth.toLocaleString()}đ</p>
          <p className="text-gray-600 text-sm">Thu nhập tháng này</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-purple-600" />
            <span className="text-sm text-green-600 font-medium">
              +{(((walletStats.thisMonth - walletStats.lastMonth) / walletStats.lastMonth) * 100).toFixed(1)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{walletStats.lastMonth.toLocaleString()}đ</p>
          <p className="text-gray-600 text-sm">Tháng trước</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{walletStats.totalEarned.toLocaleString()}đ</p>
          <p className="text-gray-600 text-sm">Tổng thu nhập</p>
        </div>
      </div>

      {/* Quick Action */}
      <div className="mb-8">
        <Link
          to="/doctor/withdraw"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          Rút tiền
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Lịch sử giao dịch</h2>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                }`}>
                  {transaction.type === "income" ? (
                    <ArrowDownRight className="w-6 h-6 text-green-600" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-red-600" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>

                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type === "income" ? "+" : ""}{transaction.amount.toLocaleString()}đ
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    transaction.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {transaction.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Thu nhập theo tháng</h2>

          <div className="space-y-4">
            {monthlyData.map((data, index) => {
              const maxAmount = Math.max(...monthlyData.map(d => d.amount));
              const percentage = (data.amount / maxAmount) * 100;

              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {data.amount.toLocaleString()}đ
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-600 to-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Trung bình/tháng</p>
              <p className="text-2xl font-bold text-teal-600">
                {(monthlyData.reduce((sum, d) => sum + d.amount, 0) / monthlyData.length).toLocaleString()}đ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
