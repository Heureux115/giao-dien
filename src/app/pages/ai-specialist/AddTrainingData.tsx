import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Database, ArrowLeft, CheckCircle } from "lucide-react";

export default function AddTrainingData() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorId = searchParams.get("errorId");

  const [formData, setFormData] = useState({
    symptoms: "",
    diagnosis: "",
    severity: "medium",
    recommendedAction: "",
    notes: ""
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Đã thêm vào training data!</h2>
            <p className="text-gray-600 mb-6">
              Dữ liệu đã được thêm vào tập huấn luyện. Model AI sẽ được cập nhật trong lần training tiếp theo.
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
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Thêm vào Training Data</h1>
              {errorId && (
                <p className="text-sm text-gray-600">Trường hợp lỗi #{errorId}</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Triệu chứng bệnh nhân
              </label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                placeholder="Mô tả chi tiết triệu chứng của bệnh nhân..."
                rows={3}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Chẩn đoán chính xác
              </label>
              <input
                type="text"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                placeholder="Ví dụ: Viêm ruột thừa cấp"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mức độ nghiêm trọng
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, severity: "high" })}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    formData.severity === "high"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Khẩn cấp
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, severity: "medium" })}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    formData.severity === "medium"
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cần bác sĩ
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, severity: "low" })}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    formData.severity === "low"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Nhẹ
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hành động được khuyến nghị
              </label>
              <textarea
                value={formData.recommendedAction}
                onChange={(e) => setFormData({ ...formData, recommendedAction: e.target.value })}
                placeholder="AI nên đề xuất hành động gì trong trường hợp này..."
                rows={3}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ghi chú thêm (tùy chọn)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Thông tin bổ sung về trường hợp này..."
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm font-semibold text-purple-900 mb-2">💡 Lưu ý:</p>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Dữ liệu sẽ được thêm vào tập huấn luyện để cải thiện độ chính xác của AI</li>
                <li>• Model sẽ học cách nhận diện tốt hơn các trường hợp tương tự</li>
                <li>• Thay đổi sẽ có hiệu lực sau lần training tiếp theo</li>
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
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang xử lý..." : "Thêm vào Training Data"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
