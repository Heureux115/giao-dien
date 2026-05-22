import { Bot, CheckCircle, Sparkles } from "lucide-react";

const feedback = [
  {
    title: "CTA đặt lịch bị cạnh tranh thị giác",
    confidence: "Cao",
    detail: "Nút đặt lịch và các hành động phụ có độ nổi bật gần tương đương, làm giảm khả năng nhận biết hành động chính.",
  },
  {
    title: "Phản hồi thanh toán chưa đủ rõ",
    confidence: "Trung bình",
    detail: "Sau thao tác thanh toán nên có trạng thái xác nhận, mã lịch hẹn và hướng dẫn bước tiếp theo.",
  },
  {
    title: "Một số text phụ có contrast thấp",
    confidence: "Trung bình",
    detail: "Các đoạn text xám nhỏ trên nền sáng cần kiểm tra WCAG contrast ở kích thước font hiện tại.",
  },
];

export default function AIFeedback() {
  return (
    <div className="p-6 md:p-8 pb-24 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gợi ý tự động</h1>
        <p className="text-gray-600">
          Gợi ý tự động hỗ trợ chuyên gia UX/UI rà soát nhanh, không thay thế kết luận kiểm thử thực tế.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl p-6">
          <Bot className="w-8 h-8 mb-4" />
          <p className="text-3xl font-bold mb-1">9</p>
          <p className="text-sm opacity-90">Gợi ý tự động</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Sparkles className="w-8 h-8 text-purple-600 mb-4" />
          <p className="text-3xl font-bold text-gray-900 mb-1">3</p>
          <p className="text-sm text-gray-600">Ưu tiên cao</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
          <p className="text-3xl font-bold text-gray-900 mb-1">6</p>
          <p className="text-sm text-gray-600">Cần chuyên gia xác nhận</p>
        </div>
      </div>

      <div className="space-y-4">
        {feedback.map((item) => (
          <div key={item.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
                {item.confidence}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{item.detail}</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
                Tạo issue
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                Bỏ qua
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
