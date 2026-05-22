import { useMemo, useState } from "react";
import { MessageSquare, Search, Star, TrendingUp, User } from "lucide-react";

const initialReviews = [
  {
    id: 1,
    patient: "Nguyễn Minh Anh",
    date: "20/05/2026",
    appointment: "Tư vấn nội khoa",
    rating: 5,
    comment: "Bác sĩ tư vấn rõ ràng, giải thích dễ hiểu và hướng dẫn cách theo dõi triệu chứng rất cụ thể.",
    replied: true,
    reply: "Cảm ơn bạn đã tin tưởng. Chúc bạn mau khỏe.",
  },
  {
    id: 2,
    patient: "Trần Hoàng Nam",
    date: "18/05/2026",
    appointment: "Khám đau dạ dày",
    rating: 4,
    comment: "Bác sĩ nhiệt tình, nhưng tôi muốn phần hướng dẫn sau tư vấn được tóm tắt ngắn hơn.",
    replied: false,
    reply: "",
  },
  {
    id: 3,
    patient: "Lê Thu Hà",
    date: "15/05/2026",
    appointment: "Tư vấn mệt mỏi kéo dài",
    rating: 5,
    comment: "Tôi tìm được hướng xử lý nhanh. Bác sĩ hỏi kỹ và không làm tôi thấy lo lắng.",
    replied: true,
    reply: "Cảm ơn phản hồi của bạn.",
  },
  {
    id: 4,
    patient: "Phạm Quốc Bảo",
    date: "11/05/2026",
    appointment: "Tư vấn đau đầu",
    rating: 3,
    comment: "Thời gian chờ hơi lâu. Nội dung tư vấn ổn nhưng phần kết luận nên rõ bước tiếp theo hơn.",
    replied: false,
    reply: "",
  },
  {
    id: 5,
    patient: "Đỗ Mai Linh",
    date: "08/05/2026",
    appointment: "Tái khám online",
    rating: 5,
    comment: "Bác sĩ nhớ lịch sử bệnh và đưa lời khuyên phù hợp. Trải nghiệm rất tốt.",
    replied: true,
    reply: "Rất vui vì bạn hài lòng với buổi tư vấn.",
  },
];

export default function DoctorReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});

  const filteredReviews = reviews.filter((review) => {
    const matchesRating = ratingFilter === "all" || review.rating === Number(ratingFilter);
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      !normalizedQuery ||
      review.patient.toLowerCase().includes(normalizedQuery) ||
      review.comment.toLowerCase().includes(normalizedQuery) ||
      review.appointment.toLowerCase().includes(normalizedQuery);
    return matchesRating && matchesQuery;
  });

  const averageRating = useMemo(
    () => reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
    []
  );

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
  }));

  const submitReply = (reviewId: number) => {
    const draft =
      (replyDrafts[reviewId] || "").trim() ||
      "Cảm ơn bạn đã gửi đánh giá. Tôi sẽ ghi nhận phản hồi này để cải thiện các buổi tư vấn tiếp theo.";

    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === reviewId ? { ...review, replied: true, reply: draft } : review
      )
    );
    setReplyDrafts((drafts) => ({ ...drafts, [reviewId]: "" }));
    setReplyingId(null);
  };

  return (
    <div className="p-6 md:p-8 pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Đánh giá của bệnh nhân</h1>
        <p className="text-gray-600">Xem toàn bộ phản hồi, điểm sao và nội dung góp ý sau mỗi buổi tư vấn</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-teal-600 to-blue-600 text-white rounded-xl p-6">
          <Star className="w-8 h-8 mb-4 fill-current" />
          <p className="text-4xl font-bold mb-1">{averageRating.toFixed(1)}</p>
          <p className="text-sm opacity-90">Điểm trung bình</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <MessageSquare className="w-8 h-8 text-teal-600 mb-4" />
          <p className="text-3xl font-bold text-gray-900 mb-1">{reviews.length}</p>
          <p className="text-sm text-gray-600">Tổng đánh giá</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
          <p className="text-3xl font-bold text-gray-900 mb-1">92%</p>
          <p className="text-sm text-gray-600">Hài lòng</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <User className="w-8 h-8 text-blue-600 mb-4" />
          <p className="text-3xl font-bold text-gray-900 mb-1">3</p>
          <p className="text-sm text-gray-600">Đã phản hồi</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm theo bệnh nhân, nội dung hoặc loại tư vấn"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">Tất cả số sao</option>
                <option value="5">5 sao</option>
                <option value="4">4 sao</option>
                <option value="3">3 sao</option>
                <option value="2">2 sao</option>
                <option value="1">1 sao</option>
              </select>
            </div>
          </div>

          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{review.patient}</h3>
                  <p className="text-sm text-gray-600">{review.appointment} - {review.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${index < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-800 mb-4">{review.comment}</p>

              {review.replied ? (
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                  <p className="text-sm font-semibold text-teal-900 mb-1">Phản hồi của bạn</p>
                  <p className="text-sm text-teal-800">{review.reply}</p>
                </div>
              ) : replyingId === review.id ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phản hồi đánh giá
                  </label>
                  <textarea
                    value={replyDrafts[review.id] || ""}
                    onChange={(e) => setReplyDrafts({ ...replyDrafts, [review.id]: e.target.value })}
                    rows={3}
                    placeholder="Nhập phản hồi gửi đến bệnh nhân..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => submitReply(review.id)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium"
                    >
                      Gửi phản hồi
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyingId(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setReplyingId(review.id)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium"
                >
                  Phản hồi đánh giá
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Phân bố điểm sao</h2>
          <div className="space-y-4">
            {ratingCounts.map((item) => (
              <div key={item.rating}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.rating} sao</span>
                  <span className="text-sm text-gray-600">{item.count}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-yellow-500 rounded-full"
                    style={{ width: `${(item.count / reviews.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-900 mb-2">Gợi ý cải thiện</p>
            <p className="text-sm text-gray-600">
              Một số bệnh nhân muốn phần kết luận sau tư vấn ngắn gọn và rõ bước tiếp theo hơn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
