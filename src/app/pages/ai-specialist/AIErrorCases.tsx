import { AlertCircle, XCircle, TrendingDown, Filter, MessageCircle, X, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const chatHistories: Record<number, Array<{ role: "patient" | "ai"; message: string; time: string }>> = {
  1: [
    { role: "patient", message: "Chào bác sĩ, con bị đau bụng từ tối qua đến giờ", time: "14:05" },
    { role: "ai", message: "Xin chào! Tôi rất tiếc khi nghe bạn đang gặp vấn đề. Bạn có thể mô tả cụ thể hơn về cơn đau không? Đau ở vị trí nào, mức độ đau như thế nào?", time: "14:05" },
    { role: "patient", message: "Đau vùng bụng dưới bên phải, lúc đầu đau nhẹ giờ đau dữ lắm", time: "14:06" },
    { role: "ai", message: "Bạn có bị nôn mửa không?", time: "14:06" },
    { role: "patient", message: "Có ạ, mới nôn 2 lần", time: "14:07" },
    { role: "ai", message: "Dựa vào triệu chứng, tôi khuyên bạn nên đặt lịch với bác sĩ để được khám kỹ hơn.", time: "14:08" },
  ],
  2: [
    { role: "patient", message: "Con bị chóng mặt và đau đầu", time: "13:50" },
    { role: "ai", message: "Bạn bị chóng mặt từ khi nào? Có kèm theo triệu chứng nào khác không?", time: "13:50" },
    { role: "patient", message: "Từ sáng nay, con thấy hơi buồn nôn", time: "13:51" },
    { role: "ai", message: "Triệu chứng của bạn có vẻ nhẹ. Bạn nên nghỉ ngơi và uống nhiều nước.", time: "13:52" },
  ],
  3: [
    { role: "patient", message: "Con ho kéo dài được 1 tuần rồi", time: "11:25" },
    { role: "ai", message: "Bạn ho có đờm không? Có khó thở không?", time: "11:26" },
    { role: "patient", message: "Ho khan, không có đờm, có hơi khó thở", time: "11:27" },
    { role: "ai", message: "Triệu chứng của bạn có vẻ nhẹ. Bạn có thể uống thuốc ho và nghỉ ngơi.", time: "11:28" },
  ],
  4: [
    { role: "patient", message: "Con đau ngực từ chiều, tim đập nhanh lắm", time: "16:15" },
    { role: "ai", message: "Đau ngực ở vị trí nào? Có lan ra tay không?", time: "16:16" },
    { role: "patient", message: "Đau giữa ngực, có lan qua vai trái", time: "16:17" },
    { role: "ai", message: "Bạn nên đặt lịch với bác sĩ tim mạch để được khám.", time: "16:18" },
  ],
  5: [
    { role: "patient", message: "Con thấy mệt mỏi và buồn nôn", time: "10:10" },
    { role: "ai", message: "Bạn bị như vậy từ khi nào? Có ăn uống gì lạ không?", time: "10:11" },
    { role: "patient", message: "Từ sáng nay thôi ạ, hôm qua ăn bình thường", time: "10:12" },
    { role: "ai", message: "Bạn nên đặt lịch với bác sĩ để được khám kỹ hơn.", time: "10:13" },
  ],
};

const initialErrorCases = [
  {
    id: 1,
    date: "2026-05-04 14:10",
    symptoms: "Đau bụng dữ dội, nôn mửa",
    aiPrediction: "Cần bác sĩ",
    actualResult: "Khẩn cấp",
    severity: "high",
    reason: "AI đánh giá thấp mức độ nghiêm trọng",
    doctorNote: "Bệnh nhân có dấu hiệu viêm ruột thừa cấp",
    fixed: false,
  },
  {
    id: 2,
    date: "2026-05-04 13:55",
    symptoms: "Chóng mặt, đau đầu nhẹ",
    aiPrediction: "Nhẹ",
    actualResult: "Cần bác sĩ",
    severity: "medium",
    reason: "Thiếu thông tin về tiền sử bệnh tim mạch",
    doctorNote: "Bệnh nhân có tiền sử huyết áp cao",
    fixed: true,
  },
  {
    id: 3,
    date: "2026-05-04 11:30",
    symptoms: "Ho khan kéo dài, khó thở nhẹ",
    aiPrediction: "Nhẹ",
    actualResult: "Cần bác sĩ",
    severity: "medium",
    reason: "Không nhận diện được triệu chứng viêm phổi",
    doctorNote: "Cần chụp X-quang phổi",
    fixed: true,
  },
  {
    id: 4,
    date: "2026-05-03 16:20",
    symptoms: "Đau ngực, tim đập nhanh",
    aiPrediction: "Cần bác sĩ",
    actualResult: "Khẩn cấp",
    severity: "high",
    reason: "Không phát hiện dấu hiệu nhồi máu cơ tim",
    doctorNote: "Bệnh nhân cần can thiệp khẩn cấp",
    fixed: false,
  },
  {
    id: 5,
    date: "2026-05-03 10:15",
    symptoms: "Mệt mỏi, buồn nôn",
    aiPrediction: "Cần bác sĩ",
    actualResult: "Nhẹ",
    severity: "low",
    reason: "Đánh giá quá cao mức độ nghiêm trọng",
    doctorNote: "Chỉ cần nghỉ ngơi và uống nhiều nước",
    fixed: true,
  },
];

export default function AIErrorCases() {
  const [errorCases, setErrorCases] = useState(initialErrorCases);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [fixedFilter, setFixedFilter] = useState<string>("all");
  const [viewChatId, setViewChatId] = useState<number | null>(null);

  const filteredErrors = errorCases.filter(error => {
    const matchesSeverity = severityFilter === "all" || error.severity === severityFilter;
    const matchesFixed = fixedFilter === "all" ||
      (fixedFilter === "fixed" && error.fixed) ||
      (fixedFilter === "unfixed" && !error.fixed);
    return matchesSeverity && matchesFixed;
  });

  const errorStats = {
    total: errorCases.length,
    high: errorCases.filter(e => e.severity === "high").length,
    medium: errorCases.filter(e => e.severity === "medium").length,
    low: errorCases.filter(e => e.severity === "low").length,
    fixed: errorCases.filter(e => e.fixed).length,
    unfixed: errorCases.filter(e => !e.fixed).length,
  };

  const toggleFixed = (id: number) => {
    setErrorCases(errorCases.map(error =>
      error.id === id ? { ...error, fixed: !error.fixed } : error
    ));
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Phân tích lỗi AI</h1>
        <p className="text-gray-600">Xem xét và cải thiện các trường hợp AI dự đoán sai</p>
      </div>

      {/* Error Summary */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{errorStats.total}</p>
          <p className="text-sm text-gray-600">Tổng lỗi hôm nay</p>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
          <div className="flex items-center justify-between mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600 mb-1">{errorStats.high}</p>
          <p className="text-sm text-gray-700">Lỗi nghiêm trọng</p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600 mb-1">{errorStats.medium}</p>
          <p className="text-sm text-gray-700">Lỗi trung bình</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-1">{errorStats.low}</p>
          <p className="text-sm text-gray-700">Lỗi nhẹ</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 space-y-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Lọc theo mức độ:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSeverityFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                severityFilter === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSeverityFilter("high")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                severityFilter === "high"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Nghiêm trọng
            </button>
            <button
              onClick={() => setSeverityFilter("medium")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                severityFilter === "medium"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Trung bình
            </button>
            <button
              onClick={() => setSeverityFilter("low")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                severityFilter === "low"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Nhẹ
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
          <CheckCircle className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Trạng thái chỉnh sửa:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFixedFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                fixedFilter === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFixedFilter("fixed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                fixedFilter === "fixed"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Đã chỉnh sửa
            </button>
            <button
              onClick={() => setFixedFilter("unfixed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                fixedFilter === "unfixed"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Chưa chỉnh sửa
            </button>
          </div>
        </div>
      </div>

      {/* Error Cases List */}
      <div className="space-y-4">
        {filteredErrors.map((error) => (
          <div
            key={error.id}
            className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
              error.severity === "high"
                ? "border-red-500"
                : error.severity === "medium"
                ? "border-yellow-500"
                : "border-blue-500"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-500">#{error.id}</span>
                  <span className="text-sm text-gray-500">{error.date}</span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    error.severity === "high"
                      ? "bg-red-100 text-red-700"
                      : error.severity === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {error.severity === "high" ? "Nghiêm trọng" : error.severity === "medium" ? "Trung bình" : "Nhẹ"}
                  </span>
                  {error.fixed && (
                    <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Đã chỉnh sửa
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Triệu chứng bệnh nhân:</p>
                  <p className="font-medium text-gray-900">{error.symptoms}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <p className="text-xs text-purple-600 mb-1">AI dự đoán</p>
                    <p className="font-semibold text-purple-700">{error.aiPrediction}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-green-600 mb-1">Kết quả thực tế</p>
                    <p className="font-semibold text-green-700">{error.actualResult}</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-sm font-semibold text-orange-900 mb-2">Nguyên nhân lỗi:</p>
                  <p className="text-sm text-orange-800">{error.reason}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Ghi chú từ bác sĩ:</p>
                  <p className="text-sm text-blue-800">{error.doctorNote}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => toggleFixed(error.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  error.fixed
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {error.fixed ? "Đánh dấu chưa sửa" : "Đánh dấu đã sửa"}
              </button>
              <Link
                to={`/ai-specialist/errors/${error.id}/update`}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
              >
                Cập nhật model AI
              </Link>
              <Link
                to={`/ai-specialist/errors/${error.id}/update?type=training`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
              >
                Thêm vào training data
              </Link>
              <Link
                to={`/ai-specialist/errors/${error.id}/update?type=rule`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
              >
                Thêm quy tắc mới
              </Link>
              <button
                onClick={() => setViewChatId(error.id)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                Xem lịch sử chat
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredErrors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Không có lỗi nào trong danh mục này</p>
        </div>
      )}

      {/* Chat History Modal */}
      {viewChatId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Lịch sử chat - Trường hợp #{viewChatId}
                </h2>
              </div>
              <button
                onClick={() => setViewChatId(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatHistories[viewChatId]?.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.role === "patient" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      chat.role === "patient"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm mb-1">{chat.message}</p>
                    <p
                      className={`text-xs ${
                        chat.role === "patient" ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {chat.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Phân tích:</p>
                  <p className="text-sm text-gray-700">
                    {errorCases.find(e => e.id === viewChatId)?.reason}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewChatId(null)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
