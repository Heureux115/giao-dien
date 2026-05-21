import { Link, useParams } from "react-router";
import { Star, Calendar, Award, GraduationCap, DollarSign, Clock } from "lucide-react";

export default function DoctorDetail() {
  const { id } = useParams();

  const doctor = {
    id: id,
    name: "BS. Nguyễn Văn A",
    specialty: "Nội khoa",
    rating: 4.9,
    reviews: 234,
    price: 300000,
    experience: 15,
    image: "NA",
    education: "Đại học Y Hà Nội",
    certifications: ["Chứng chỉ hành nghề", "Chuyên khoa I Nội khoa"],
    languages: ["Tiếng Việt", "English"],
    bio: "Bác sĩ Nguyễn Văn A có hơn 15 năm kinh nghiệm trong lĩnh vực nội khoa. Chuyên điều trị các bệnh lý tim mạch, tiểu đường và các bệnh mãn tính. Tận tâm với bệnh nhân và luôn cập nhật những phương pháp điều trị mới nhất.",
  };

  const timeSlots = [
    { date: "2026-05-05", day: "Thứ 3", slots: ["09:00", "10:00", "14:00", "15:00"] },
    { date: "2026-05-06", day: "Thứ 4", slots: ["09:00", "11:00", "14:00", "16:00"] },
    { date: "2026-05-07", day: "Thứ 5", slots: ["10:00", "14:00", "15:00"] },
  ];

  const reviews = [
    { id: 1, name: "Nguyễn T.", rating: 5, comment: "Bác sĩ rất tận tâm, giải thích kỹ càng", date: "2026-04-28" },
    { id: 2, name: "Trần V.", rating: 5, comment: "Khám rất kỹ, điều trị hiệu quả", date: "2026-04-25" },
    { id: 3, name: "Lê M.", rating: 4, comment: "Bác sĩ giỏi, thái độ tốt", date: "2026-04-20" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Doctor Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl flex-shrink-0">
            {doctor.image}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
            <p className="text-xl text-gray-600 mb-3">{doctor.specialty}</p>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-lg">{doctor.rating}</span>
                <span className="text-gray-500">({doctor.reviews} đánh giá)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Award className="w-5 h-5" />
                <span>{doctor.experience} năm kinh nghiệm</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-600 text-2xl font-bold">
              <DollarSign className="w-6 h-6" />
              {doctor.price.toLocaleString()}đ / buổi
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="font-semibold text-lg mb-4">Giới thiệu</h2>
          <p className="text-gray-700 mb-6">{doctor.bio}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Học vấn
              </h3>
              <p className="text-gray-700">{doctor.education}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Chứng chỉ
              </h3>
              <ul className="space-y-1">
                {doctor.certifications.map((cert, index) => (
                  <li key={index} className="text-gray-700">• {cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Available Time Slots */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Lịch khám có sẵn
            </h2>
            <div className="space-y-4">
              {timeSlots.map((daySlot, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{daySlot.day}</p>
                      <p className="text-sm text-gray-600">{daySlot.date}</p>
                    </div>
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {daySlot.slots.map((time, idx) => (
                      <Link
                        key={idx}
                        to={`/patient/booking/${doctor.id}?date=${daySlot.date}&time=${time}`}
                        className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center text-sm font-medium"
                      >
                        {time}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Đánh giá
          </h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{review.name}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-1">{review.comment}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:underline">
            Xem tất cả {doctor.reviews} đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}
