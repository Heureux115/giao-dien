import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Star, Send, ThumbsUp } from "lucide-react";
import { getMedicalAppointmentById, updateMedicalAppointment } from "../../lib/patientAppointmentStore";

export default function RateDoctor() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const doctor = {
    name: "BS. Nguyễn Văn A",
    specialty: "Nội khoa",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá");
      return;
    }

    if (appointmentId) {
      updateMedicalAppointment(appointmentId, { rating, status: "completed" });
    }

    setTimeout(() => {
      navigate("/patient/history");
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8 flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đánh giá bác sĩ
            </h1>
            <p className="text-gray-600">
              Đánh giá của bạn sẽ giúp cải thiện chất lượng dịch vụ
            </p>
          </div>

          {/* Doctor Info */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-1">Buổi tư vấn với</p>
            <p className="text-xl font-bold text-gray-900">{doctor.name}</p>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Bạn đánh giá thế nào về buổi tư vấn?
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 ${
                        star <= (hoverRating || rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center mt-2 text-gray-600">
                  {rating === 5 && "Xuất sắc! 🌟"}
                  {rating === 4 && "Rất tốt! 👍"}
                  {rating === 3 && "Tốt 😊"}
                  {rating === 2 && "Khá 🙂"}
                  {rating === 1 && "Cần cải thiện 😕"}
                </p>
              )}
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chia sẻ trải nghiệm của bạn (tùy chọn)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                placeholder="Bác sĩ tận tâm, giải thích rõ ràng..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Đánh giá của bạn sẽ được công khai và giúp người khác
              </p>
            </div>

            {/* Quick Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Điểm nổi bật
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Tận tâm",
                  "Giải thích rõ ràng",
                  "Thân thiện",
                  "Chuyên môn tốt",
                  "Hiệu quả",
                  "Đúng giờ",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow"
            >
              <Send className="w-5 h-5" />
              Gửi đánh giá
            </button>

            <button
              type="button"
              onClick={() => navigate("/patient/history")}
              className="w-full mt-3 text-gray-600 hover:text-gray-900 text-sm"
            >
              Bỏ qua
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
