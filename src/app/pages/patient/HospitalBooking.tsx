import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Building2, MapPin, Phone, Clock, Calendar, Search, X, ClipboardList } from "lucide-react";

const hospitals = [
  {
    id: 1,
    name: "Bệnh viện Bạch Mai",
    address: "78 Đường Giải Phóng, Đống Đa, Hà Nội",
    phone: "024 3869 3731",
    specialties: ["Tim mạch", "Nội khoa", "Ngoại khoa", "Sản phụ khoa"],
    openHours: "7:00 - 17:00",
    image: "🏥",
  },
  {
    id: 2,
    name: "Bệnh viện Chợ Rẫy",
    address: "201B Nguyễn Chí Thanh, Q.5, TP.HCM",
    phone: "028 3855 4137",
    specialties: ["Nội khoa", "Tiêu hóa", "Hô hấp", "Thần kinh"],
    openHours: "7:30 - 16:30",
    image: "🏥",
  },
  {
    id: 3,
    name: "Bệnh viện Đại học Y Hà Nội",
    address: "1 Tôn Thất Tùng, Đống Đa, Hà Nội",
    phone: "024 3852 3798",
    specialties: ["Da liễu", "Nhi khoa", "Mắt", "Tai mũi họng"],
    openHours: "7:00 - 16:00",
    image: "🏥",
  },
  {
    id: 4,
    name: "Bệnh viện Vinmec Times City",
    address: "458 Minh Khai, Hai Bà Trưng, Hà Nội",
    phone: "024 3974 3556",
    specialties: ["Tim mạch", "Ung bướu", "Thần kinh", "Sản phụ khoa"],
    openHours: "7:00 - 20:00",
    image: "🏥",
  },
  {
    id: 5,
    name: "Bệnh viện Đa khoa Hồng Ngọc",
    address: "55 Yên Ninh, Ba Đình, Hà Nội",
    phone: "024 3927 5568",
    specialties: ["Nội khoa", "Ngoại khoa", "Nhi khoa", "Phụ sản"],
    openHours: "7:30 - 17:00",
    image: "🏥",
  },
];

interface BookingForm {
  hospitalId: number;
  hospitalName: string;
  specialty: string;
  date: string;
  time: string;
  hasInsurance: boolean;
}

export default function HospitalBooking() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    hospitalId: 0,
    hospitalName: "",
    specialty: "",
    date: "",
    time: "",
    hasInsurance: false,
  });

  const allSpecialties = Array.from(
    new Set(hospitals.flatMap((h) => h.specialties))
  );

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchSearch =
      hospital.name.toLowerCase().includes(search.toLowerCase()) ||
      hospital.address.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty =
      selectedSpecialty === "all" ||
      hospital.specialties.includes(selectedSpecialty);
    return matchSearch && matchSpecialty;
  });

  const handleBooking = (hospitalId: number, hospitalName: string, hospitalSpecialties: string[]) => {
    setBookingForm({
      hospitalId,
      hospitalName,
      specialty: hospitalSpecialties[0] || "",
      date: "",
      time: "",
      hasInsurance: false,
    });
    setShowBookingModal(true);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Create appointment ID
    const appointmentId = Math.floor(Math.random() * 100000);

    // Navigate to payment page
    navigate(`/patient/hospital-payment/${appointmentId}`, {
      state: { bookingData: bookingForm }
    });
  };

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt lịch khám tại bệnh viện</h1>
          <p className="text-gray-600">Chọn bệnh viện và chuyên khoa phù hợp</p>
        </div>
        <Link
          to="/patient/hospital-history"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          <ClipboardList className="w-5 h-5" />
          Xem lịch đã đặt
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm bệnh viện..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả chuyên khoa</option>
            {allSpecialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hospitals List */}
      <div className="space-y-6">
        {filteredHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-4xl">
                    {hospital.image}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {hospital.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{hospital.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{hospital.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Giờ làm việc: {hospital.openHours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBooking(hospital.id, hospital.name, hospital.specialties)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Đặt lịch
                </button>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Chuyên khoa:</p>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Không tìm thấy bệnh viện phù hợp</p>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Đặt lịch khám</h2>
                <p className="text-gray-600">{bookingForm.hospitalName}</p>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmitBooking} className="p-6 space-y-6">
              {/* Specialty Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chuyên khoa khám *
                </label>
                <select
                  value={bookingForm.specialty}
                  onChange={(e) => setBookingForm({ ...bookingForm, specialty: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Chọn chuyên khoa</option>
                  {hospitals.find(h => h.id === bookingForm.hospitalId)?.specialties.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày khám *
                </label>
                <input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ khám *
                </label>
                <select
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Chọn giờ khám</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              {/* Insurance */}
              <div className="bg-blue-50 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingForm.hasInsurance}
                    onChange={(e) => setBookingForm({ ...bookingForm, hasInsurance: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Sử dụng bảo hiểm y tế (BHYT)</p>
                    <p className="text-sm text-gray-600">
                      Nếu có BHYT, bạn sẽ được hỗ trợ chi phí khám theo quy định
                    </p>
                  </div>
                </label>
              </div>

              {/* Fee Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Phí khám:</span>
                  <span className="font-semibold text-gray-900">200.000đ</span>
                </div>
                {bookingForm.hasInsurance && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Giảm trừ BHYT (80%):</span>
                      <span className="font-semibold text-green-600">-160.000đ</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex items-center justify-between">
                      <span className="font-medium text-gray-900">Tổng thanh toán:</span>
                      <span className="font-bold text-blue-600 text-lg">40.000đ</span>
                    </div>
                  </>
                )}
                {!bookingForm.hasInsurance && (
                  <div className="border-t border-gray-300 pt-2 flex items-center justify-between">
                    <span className="font-medium text-gray-900">Tổng thanh toán:</span>
                    <span className="font-bold text-blue-600 text-lg">200.000đ</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Tiếp tục thanh toán
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
