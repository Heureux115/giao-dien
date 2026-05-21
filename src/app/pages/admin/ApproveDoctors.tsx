import { UserCheck, GraduationCap, Award, Mail, Phone, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const pendingDoctors = [
  {
    id: 1,
    name: "Hoàng Văn F",
    email: "hoangvanf@email.com",
    phone: "0907890123",
    specialty: "Da liễu",
    experience: 8,
    education: "Đại học Y Hà Nội",
    certifications: ["Chứng chỉ hành nghề", "Chuyên khoa I Da liễu"],
    submittedDate: "2026-05-03",
    status: "pending",
    bio: "Bác sĩ chuyên khoa Da liễu với 8 năm kinh nghiệm. Chuyên điều trị mụn, nám, các bệnh da liễu thường gặp.",
  },
  {
    id: 2,
    name: "Đặng Thị G",
    email: "dangthig@email.com",
    phone: "0908901234",
    specialty: "Sản phụ khoa",
    experience: 12,
    education: "Đại học Y TP.HCM",
    certifications: ["Chứng chỉ hành nghề", "Chuyên khoa II Sản phụ khoa"],
    submittedDate: "2026-05-02",
    status: "pending",
    bio: "Bác sĩ Sản phụ khoa với hơn 12 năm kinh nghiệm. Chuyên tư vấn thai sản, chăm sóc sức khỏe phụ nữ.",
  },
  {
    id: 3,
    name: "Vũ Văn H",
    email: "vuvanh@email.com",
    phone: "0909012345",
    specialty: "Nhi khoa",
    experience: 6,
    education: "Đại học Y Huế",
    certifications: ["Chứng chỉ hành nghề", "Chuyên khoa I Nhi khoa"],
    submittedDate: "2026-05-01",
    status: "pending",
    bio: "Bác sĩ Nhi khoa với 6 năm kinh nghiệm. Tận tâm chăm sóc sức khỏe trẻ em.",
  },
];

export default function ApproveDoctors() {
  const [doctors, setDoctors] = useState(pendingDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<"pending" | "approved" | "rejected">("pending");

  const handleApprove = (id: number) => {
    if (confirm("Bạn có chắc muốn duyệt hồ sơ bác sĩ này?")) {
      setDoctors(doctors.map(d => d.id === id ? { ...d, status: "approved" } : d));
      alert("Đã duyệt hồ sơ thành công!");
    }
  };

  const handleReject = (id: number) => {
    if (confirm("Bạn có chắc muốn từ chối hồ sơ bác sĩ này?")) {
      setDoctors(doctors.map(d => d.id === id ? { ...d, status: "rejected" } : d));
      alert("Đã từ chối hồ sơ!");
    }
  };

  const pendingCount = doctors.filter(d => d.status === "pending").length;
  const approvedCount = doctors.filter(d => d.status === "approved").length;
  const rejectedCount = doctors.filter(d => d.status === "rejected").length;

  const filteredDoctors = doctors.filter(d => d.status === statusFilter);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Duyệt bác sĩ</h1>
        <p className="text-gray-600">
          {statusFilter === "pending" && `${pendingCount} hồ sơ đang chờ duyệt`}
          {statusFilter === "approved" && `${approvedCount} hồ sơ đã duyệt`}
          {statusFilter === "rejected" && `${rejectedCount} hồ sơ đã từ chối`}
        </p>
      </div>

      {/* Summary with clickable cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => setStatusFilter("pending")}
          className={`bg-yellow-100 rounded-xl p-6 text-left transition-all ${
            statusFilter === "pending" ? "ring-4 ring-yellow-400 shadow-lg" : "hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-yellow-700 font-medium">Chờ duyệt</span>
            <UserCheck className="w-6 h-6 text-yellow-700" />
          </div>
          <p className="text-3xl font-bold text-yellow-900">{pendingCount}</p>
        </button>

        <button
          onClick={() => setStatusFilter("approved")}
          className={`bg-green-100 rounded-xl p-6 text-left transition-all ${
            statusFilter === "approved" ? "ring-4 ring-green-400 shadow-lg" : "hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 font-medium">Đã duyệt</span>
            <CheckCircle className="w-6 h-6 text-green-700" />
          </div>
          <p className="text-3xl font-bold text-green-900">{approvedCount}</p>
        </button>

        <button
          onClick={() => setStatusFilter("rejected")}
          className={`bg-red-100 rounded-xl p-6 text-left transition-all ${
            statusFilter === "rejected" ? "ring-4 ring-red-400 shadow-lg" : "hover:shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-700 font-medium">Từ chối</span>
            <XCircle className="w-6 h-6 text-red-700" />
          </div>
          <p className="text-3xl font-bold text-red-900">{rejectedCount}</p>
        </button>
      </div>

      {/* Doctor List */}
      <div className="space-y-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className={`p-6 ${
              selectedDoctor === doctor.id ? "bg-gray-50" : ""
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {doctor.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">BS. {doctor.name}</h3>
                    <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {doctor.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {doctor.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 text-sm font-medium rounded-lg ${
                    doctor.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : doctor.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {doctor.status === "pending" && "Chờ duyệt"}
                    {doctor.status === "approved" && "Đã duyệt"}
                    {doctor.status === "rejected" && "Đã từ chối"}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">Nộp: {doctor.submittedDate}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoctor(selectedDoctor === doctor.id ? null : doctor.id)}
                className="mt-4 text-blue-600 hover:underline text-sm font-medium"
              >
                {selectedDoctor === doctor.id ? "Thu gọn" : "Xem chi tiết"}
              </button>
            </div>

            {/* Detailed Info */}
            {selectedDoctor === doctor.id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      Học vấn
                    </h4>
                    <p className="text-gray-700">{doctor.education}</p>
                    <p className="text-sm text-gray-600 mt-1">{doctor.experience} năm kinh nghiệm</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      Chứng chỉ
                    </h4>
                    <ul className="space-y-1">
                      {doctor.certifications.map((cert, index) => (
                        <li key={index} className="text-gray-700 text-sm">• {cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Giới thiệu</h4>
                  <p className="text-gray-700 text-sm">{doctor.bio}</p>
                </div>

                <div className="flex gap-3">
                  {doctor.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(doctor.id)}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Duyệt hồ sơ
                      </button>
                      <button
                        onClick={() => handleReject(doctor.id)}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                      >
                        <XCircle className="w-5 h-5" />
                        Từ chối
                      </button>
                      <Link
                        to={`/admin/approve-doctors/${doctor.id}/request-info`}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold"
                      >
                        Yêu cầu bổ sung
                      </Link>
                    </>
                  )}
                  {doctor.status === "approved" && (
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Hồ sơ đã được duyệt</span>
                    </div>
                  )}
                  {doctor.status === "rejected" && (
                    <div className="flex items-center gap-2 text-red-700">
                      <XCircle className="w-5 h-5" />
                      <span className="font-medium">Hồ sơ đã bị từ chối</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            {statusFilter === "pending" && "Không có hồ sơ nào đang chờ duyệt"}
            {statusFilter === "approved" && "Chưa có hồ sơ nào được duyệt"}
            {statusFilter === "rejected" && "Chưa có hồ sơ nào bị từ chối"}
          </p>
        </div>
      )}
    </div>
  );
}
