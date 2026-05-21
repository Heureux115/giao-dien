import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FileText, ArrowLeft, CheckCircle } from "lucide-react";

export default function AddRule() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorId = searchParams.get("errorId");

  const [formData, setFormData] = useState({
    symptom: "",
    condition: "",
    action: "",
    priority: "medium"
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/ai-specialist/errors");
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Quy tắc đã được thêm!</h2>
            <p className="text-gray-600 mb-6">
              Quy tắc mới đã được áp dụng vào hệ thống AI. Model sẽ sử dụng quy tắc này trong các đánh giá tiếp theo.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/ai-specialist/errors")}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách lỗi
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Thêm Quy Tắc Mới cho AI</h1>
              {errorId && (
                <p className="text-sm text-gray-600">Trường hợp lỗi #{errorId}</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Triệu chứng / Tình huống
              </label>
              <input
                type="text"
                value={formData.symptom}
                onChange={(e) => setFormData({ ...formData, symptom: e.target.value })}
                placeholder="Ví dụ: Đau bụng dữ dội + nôn mửa + sốt cao"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Điều kiện cần kiểm tra
              </label>
              <textarea
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                placeholder="Ví dụ: Nếu bệnh nhân có tiền sử bệnh tim mạch hoặc huyết áp cao"
                rows={3}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hành động AI nên thực hiện
              </label>
              <textarea
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                placeholder="Ví dụ: Đánh giá là 'Khẩn cấp' và đề xuất gọi cấp cứu ngay lập tức"
                rows={3}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mức độ ưu tiên
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: "high" })}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    formData.priority === "high"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cao
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: "medium" })}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    formData.priority === "medium"
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Trung bình
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: "low" })}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    formData.priority === "low"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Thấp
                </button>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-sm font-semibold text-indigo-900 mb-2">💡 Lưu ý:</p>
              <ul className="text-sm text-indigo-800 space-y-1">
                <li>• Quy tắc mới sẽ được thêm vào logic xử lý của AI model</li>
                <li>• Cần kiểm thử quy tắc trước khi áp dụng vào production</li>
                <li>• Quy tắc ưu tiên cao sẽ được AI xem xét trước</li>
                <li>• Quy tắc sẽ có hiệu lực ngay sau khi lưu</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/ai-specialist/errors")}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang xử lý..." : "Lưu Quy Tắc"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
