import { Link } from "react-router";
import { Search, Star, Clock, DollarSign } from "lucide-react";
import { useState } from "react";

const doctors = [
  { id: 1, name: "BS. Nguyễn Văn A", specialty: "Nội khoa", rating: 4.9, reviews: 234, price: 300000, experience: 15, image: "NA" },
  { id: 2, name: "BS. Trần Thị B", specialty: "Tim mạch", rating: 4.8, reviews: 189, price: 400000, experience: 12, image: "TB" },
  { id: 3, name: "BS. Lê Văn C", specialty: "Tiêu hóa", rating: 4.7, reviews: 156, price: 350000, experience: 10, image: "LC" },
  { id: 4, name: "BS. Phạm Thị D", specialty: "Nội tiết", rating: 4.9, reviews: 201, price: 380000, experience: 14, image: "PD" },
  { id: 5, name: "BS. Hoàng Văn E", specialty: "Thần kinh", rating: 4.6, reviews: 143, price: 420000, experience: 18, image: "HE" },
  { id: 6, name: "BS. Vũ Thị F", specialty: "Hô hấp", rating: 4.8, reviews: 178, price: 360000, experience: 11, image: "VF" },
];

const specialties = ["Tất cả", "Nội khoa", "Tim mạch", "Tiêu hóa", "Nội tiết", "Thần kinh", "Hô hấp"];

export default function DoctorList() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Tất cả");

  const filteredDoctors = doctors.filter(doctor => {
    const matchSearch = doctor.name.toLowerCase().includes(search.toLowerCase()) ||
                       doctor.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = selectedSpecialty === "Tất cả" || doctor.specialty === selectedSpecialty;
    return matchSearch && matchSpecialty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Danh sách bác sĩ</h1>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm bác sĩ hoặc chuyên khoa..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {specialties.map((specialty) => (
          <button
            key={specialty}
            onClick={() => setSelectedSpecialty(specialty)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedSpecialty === specialty
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {specialty}
          </button>
        ))}
      </div>

      {/* Doctor Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Link
            key={doctor.id}
            to={`/patient/doctors/${doctor.id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {doctor.image}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <p className="text-xs text-gray-500 mt-1">{doctor.experience} năm kinh nghiệm</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900">{doctor.rating}</span>
                  <span className="text-sm text-gray-500">({doctor.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold">{doctor.price.toLocaleString()}đ</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Có lịch hôm nay</span>
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Đặt lịch khám
            </button>
          </Link>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy bác sĩ phù hợp</p>
        </div>
      )}
    </div>
  );
}
