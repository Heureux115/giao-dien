import { Users, UserCheck, Activity, DollarSign, TrendingUp, Calendar } from "lucide-react";

export default function SystemStats() {
  const overallStats = {
    totalUsers: 25834,
    totalDoctors: 342,
    totalConsultations: 45678,
    totalRevenue: 13700000000,
  };

  const monthlyData = [
    { month: "T1/2026", users: 21234, doctors: 298, consultations: 8234, revenue: 2468000000 },
    { month: "T2/2026", users: 22456, doctors: 312, consultations: 9156, revenue: 2747000000 },
    { month: "T3/2026", users: 23678, doctors: 324, consultations: 10245, revenue: 3074000000 },
    { month: "T4/2026", users: 24789, doctors: 336, consultations: 11023, revenue: 3307000000 },
    { month: "T5/2026", users: 25834, doctors: 342, consultations: 12456, revenue: 3738000000 },
  ];

  const userGrowth = [
    { category: "Bệnh nhân", count: 25492, percentage: 98.7, growth: "+5.2%" },
    { category: "Bác sĩ", count: 342, percentage: 1.3, growth: "+8.3%" },
  ];

  const consultationByType = [
    { type: "Nhẹ", count: 7456, percentage: 59.8 },
    { type: "Cần bác sĩ", count: 4123, percentage: 33.1 },
    { type: "Khẩn cấp", count: 877, percentage: 7.1 },
  ];

  const topSpecialties = [
    { specialty: "Nội khoa", doctors: 45, consultations: 2341, revenue: "702M" },
    { specialty: "Tim mạch", doctors: 38, consultations: 1987, revenue: "596M" },
    { specialty: "Tiêu hóa", doctors: 32, consultations: 1654, revenue: "496M" },
    { specialty: "Nội tiết", doctors: 28, consultations: 1432, revenue: "430M" },
    { specialty: "Da liễu", doctors: 35, consultations: 1298, revenue: "389M" },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thống kê hệ thống</h1>
        <p className="text-gray-600">Tổng quan và báo cáo chi tiết</p>
      </div>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6">
          <Users className="w-8 h-8 mb-4" />
          <p className="text-3xl font-bold mb-1">{overallStats.totalUsers.toLocaleString()}</p>
          <p className="text-sm opacity-90">Tổng người dùng</p>
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-xl p-6">
          <UserCheck className="w-8 h-8 mb-4" />
          <p className="text-3xl font-bold mb-1">{overallStats.totalDoctors.toLocaleString()}</p>
          <p className="text-sm opacity-90">Bác sĩ hoạt động</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl p-6">
          <Activity className="w-8 h-8 mb-4" />
          <p className="text-3xl font-bold mb-1">{overallStats.totalConsultations.toLocaleString()}</p>
          <p className="text-sm opacity-90">Tổng tư vấn</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl p-6">
          <DollarSign className="w-8 h-8 mb-4" />
          <p className="text-3xl font-bold mb-1">{(overallStats.totalRevenue / 1000000000).toFixed(1)}B</p>
          <p className="text-sm opacity-90">Tổng doanh thu</p>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-gray-700" />
          Xu hướng theo tháng
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tháng</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Người dùng</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Bác sĩ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Tư vấn</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Doanh thu</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Tăng trưởng</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => {
                const prevMonth = index > 0 ? monthlyData[index - 1] : null;
                const growth = prevMonth
                  ? ((data.revenue - prevMonth.revenue) / prevMonth.revenue * 100).toFixed(1)
                  : "0";

                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{data.month}</td>
                    <td className="py-4 px-4 text-right text-gray-900">{data.users.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-gray-900">{data.doctors.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-gray-900">{data.consultations.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right font-semibold text-green-600">
                      {(data.revenue / 1000000).toFixed(0)}M
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-green-600 font-medium">+{growth}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* User Growth */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Phân bố người dùng
          </h2>

          <div className="space-y-4">
            {userGrowth.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{item.category}</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">{item.count.toLocaleString()}</span>
                    <span className="ml-2 text-sm text-green-600 font-medium">{item.growth}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-teal-600 h-3 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation by Type */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-600" />
            Phân loại tư vấn (Tháng này)
          </h2>

          <div className="space-y-4">
            {consultationByType.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{item.type}</span>
                  <span className="text-2xl font-bold text-purple-600">{item.count.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        item.type === "Nhẹ"
                          ? "bg-green-500"
                          : item.type === "Cần bác sĩ"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Specialties */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          Top chuyên khoa
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Chuyên khoa</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Bác sĩ</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Tư vấn</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Doanh thu</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">TB/Bác sĩ</th>
              </tr>
            </thead>
            <tbody>
              {topSpecialties.map((specialty, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{specialty.specialty}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-900">{specialty.doctors}</td>
                  <td className="py-4 px-4 text-right text-gray-900">{specialty.consultations.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right font-semibold text-green-600">{specialty.revenue}</td>
                  <td className="py-4 px-4 text-right text-gray-600">
                    {Math.round(specialty.consultations / specialty.doctors)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
