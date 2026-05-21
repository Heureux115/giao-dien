import { useState, Fragment } from "react";
import { Search, UserCheck, Ban, CheckCircle, XCircle, Eye } from "lucide-react";

const allDoctors = [
  { id: 1, name: "Nguyễn Văn A", specialty: "Nội khoa", experience: 15, rating: 4.9, consultations: 234, revenue: "70.2M", status: "active", joinDate: "2025-01-15" },
  { id: 2, name: "Trần Thị B", specialty: "Tim mạch", experience: 12, rating: 4.8, consultations: 189, revenue: "56.7M", status: "active", joinDate: "2025-02-20" },
  { id: 3, name: "Lê Văn C", specialty: "Tiêu hóa", experience: 10, rating: 4.7, consultations: 156, revenue: "46.8M", status: "active", joinDate: "2025-03-10" },
  { id: 4, name: "Phạm Thị D", specialty: "Nội tiết", experience: 14, rating: 4.9, consultations: 201, revenue: "60.3M", status: "active", joinDate: "2024-11-05" },
  { id: 5, name: "Hoàng Văn E", specialty: "Thần kinh", experience: 18, rating: 4.6, consultations: 143, revenue: "42.9M", status: "suspended", joinDate: "2024-08-22" },
  { id: 6, name: "Vũ Thị F", specialty: "Hô hấp", experience: 11, rating: 4.8, consultations: 178, revenue: "53.4M", status: "active", joinDate: "2025-04-01" },
];

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState(allDoctors);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "suspended">("all");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const filteredDoctors = doctors.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
                       doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || doc.status === filter;
    return matchSearch && matchFilter;
  });

  const handleSuspend = (id: number, name: string) => {
    if (confirm(`Bạn có chắc muốn đình chỉ hoạt động của ${name}?`)) {
      setDoctors(doctors.map(d => d.id === id ? { ...d, status: "suspended" } : d));
      alert("Đã đình chỉ bác sĩ!");
    }
  };

  const handleActivate = (id: number, name: string) => {
    if (confirm(`Bạn có chắc muốn kích hoạt lại tài khoản của ${name}?`)) {
      setDoctors(doctors.map(d => d.id === id ? { ...d, status: "active" } : d));
      alert("Đã kích hoạt lại bác sĩ!");
    }
  };

  const stats = {
    total: doctors.length,
    active: doctors.filter(d => d.status === "active").length,
    suspended: doctors.filter(d => d.status === "suspended").length,
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý bác sĩ</h1>
        <p className="text-gray-600">Tất cả bác sĩ trên nền tảng</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-700 font-medium">Tổng bác sĩ</span>
            <UserCheck className="w-6 h-6 text-blue-700" />
          </div>
          <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
        </div>

        <div className="bg-green-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 font-medium">Đang hoạt động</span>
            <CheckCircle className="w-6 h-6 text-green-700" />
          </div>
          <p className="text-3xl font-bold text-green-900">{stats.active}</p>
        </div>

        <div className="bg-red-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-700 font-medium">Đã đình chỉ</span>
            <XCircle className="w-6 h-6 text-red-700" />
          </div>
          <p className="text-3xl font-bold text-red-900">{stats.suspended}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm bác sĩ..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả ({stats.total})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "active"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Hoạt động ({stats.active})
            </button>
            <button
              onClick={() => setFilter("suspended")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "suspended"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Đình chỉ ({stats.suspended})
            </button>
          </div>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Bác sĩ</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Chuyên khoa</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">Kinh nghiệm</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">Đánh giá</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">Tư vấn</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">Doanh thu</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Trạng thái</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <Fragment key={doctor.id}>
                  <tr
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedDoctor(selectedDoctor === doctor.id ? null : doctor.id)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-semibold">
                          {doctor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doctor.name}</p>
                          <p className="text-sm text-gray-500">Tham gia: {doctor.joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{doctor.specialty}</td>
                    <td className="py-4 px-6 text-right text-gray-700">{doctor.experience} năm</td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-yellow-600 font-semibold">⭐ {doctor.rating}</span>
                    </td>
                    <td className="py-4 px-6 text-right text-gray-700">{doctor.consultations}</td>
                    <td className="py-4 px-6 text-right font-semibold text-green-600">{doctor.revenue}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        doctor.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {doctor.status === "active" ? "Hoạt động" : "Đình chỉ"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert("Xem chi tiết bác sĩ");
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                        {doctor.status === "active" ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSuspend(doctor.id, doctor.name);
                            }}
                            className="p-2 hover:bg-red-100 rounded-lg"
                            title="Đình chỉ"
                          >
                            <Ban className="w-5 h-5 text-red-600" />
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleActivate(doctor.id, doctor.name);
                            }}
                            className="p-2 hover:bg-green-100 rounded-lg"
                            title="Kích hoạt"
                          >
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Details */}
                  {selectedDoctor === doctor.id && (
                    <tr>
                      <td colSpan={8} className="bg-gray-50 p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Thông tin chi tiết</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="text-gray-900">{doctor.name.toLowerCase().replace(/\s/g, '')}@email.com</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Điện thoại:</span>
                                <span className="text-gray-900">090{Math.floor(1000000 + Math.random() * 9000000)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Số chứng chỉ:</span>
                                <span className="text-gray-900">VN-{Math.floor(10000000 + Math.random() * 90000000)}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Thống kê hoạt động</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Tỷ lệ chấp nhận lịch:</span>
                                <span className="text-green-600 font-medium">92%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Thời gian phản hồi TB:</span>
                                <span className="text-gray-900">8 phút</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Đánh giá TB:</span>
                                <span className="text-yellow-600 font-medium">⭐ {doctor.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy bác sĩ nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
