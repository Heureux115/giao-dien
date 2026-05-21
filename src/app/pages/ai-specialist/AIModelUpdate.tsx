import { useParams, useNavigate, useSearchParams } from "react-router";
import { Brain, Upload, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

type UpdateType = "model" | "training" | "rule";

const getUpdateTypeFromUrl = (type: string | null): UpdateType => {
  return type === "training" || type === "rule" ? type : "model";
};

export default function AIModelUpdate() {
  const { errorId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [updateType, setUpdateType] = useState<UpdateType>(() =>
    getUpdateTypeFromUrl(searchParams.get("type"))
  );

  useEffect(() => {
    setUpdateType(getUpdateTypeFromUrl(searchParams.get("type")));
  }, [searchParams]);

  const selectUpdateType = (type: UpdateType) => {
    setUpdateType(type);
    setSearchParams(type === "model" ? {} : { type });
  };

  const errorCase = {
    id: errorId,
    symptoms: "Đau bụng dữ dội, nôn mửa",
    aiPrediction: "Cần bác sĩ",
    actualResult: "Khẩn cấp",
    reason: "AI đánh giá thấp mức độ nghiêm trọng",
  };

  const handleUpdateModel = () => {
    alert("Đã cập nhật model AI với case này!");
    navigate("/ai-specialist/errors");
  };

  const handleAddToTraining = () => {
    alert("Đã thêm case vào training dataset!");
    navigate("/ai-specialist/errors");
  };

  return (
    <div className="p-6 md:p-8">
      <button
        onClick={() => navigate("/ai-specialist/errors")}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Quay lại danh sách lỗi
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Cập nhật AI Model</h1>
      <p className="text-gray-600 mb-8">Điều chỉnh AI để tăng độ chính xác</p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Error Case Info */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-lg mb-4">Thông tin lỗi #{errorCase.id}</h2>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-1">Triệu chứng:</p>
              <p className="text-gray-900 font-medium">{errorCase.symptoms}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-xs text-purple-600 mb-1">AI dự đoán</p>
                <p className="font-semibold text-purple-700">{errorCase.aiPrediction}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-green-600 mb-1">Thực tế</p>
                <p className="font-semibold text-green-700">{errorCase.actualResult}</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-orange-900 mb-1">Nguyên nhân:</p>
              <p className="text-sm text-orange-800">{errorCase.reason}</p>
            </div>
          </div>
        </div>

        {/* Update Options */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="font-semibold text-lg mb-6">Chọn phương thức cập nhật</h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => selectUpdateType("model")}
                className={`p-4 border-2 rounded-xl transition-all ${
                  updateType === "model"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Brain className={`w-8 h-8 mx-auto mb-2 ${
                  updateType === "model" ? "text-purple-600" : "text-gray-400"
                }`} />
                <p className="font-semibold text-gray-900">Cập nhật Model</p>
                <p className="text-xs text-gray-600 mt-1">Điều chỉnh trọng số</p>
              </button>

              <button
                onClick={() => selectUpdateType("training")}
                className={`p-4 border-2 rounded-xl transition-all ${
                  updateType === "training"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Upload className={`w-8 h-8 mx-auto mb-2 ${
                  updateType === "training" ? "text-purple-600" : "text-gray-400"
                }`} />
                <p className="font-semibold text-gray-900">Training Data</p>
                <p className="text-xs text-gray-600 mt-1">Thêm vào dataset</p>
              </button>

              <button
                onClick={() => selectUpdateType("rule")}
                className={`p-4 border-2 rounded-xl transition-all ${
                  updateType === "rule"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${
                  updateType === "rule" ? "text-purple-600" : "text-gray-400"
                }`} />
                <p className="font-semibold text-gray-900">Quy tắc</p>
                <p className="text-xs text-gray-600 mt-1">Thêm rule mới</p>
              </button>
            </div>

            {/* Model Update */}
            {updateType === "model" && (
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-3">Cập nhật Model AI</h3>
                  <p className="text-sm text-purple-800 mb-4">
                    Điều chỉnh trọng số của model để nhận diện tốt hơn các triệu chứng tương tự
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Mức độ ưu tiên</label>
                      <select className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Cao - Retrain ngay</option>
                        <option>Trung bình - Thêm vào batch</option>
                        <option>Thấp - Lưu để sau</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Feature quan trọng</label>
                      <div className="mt-2 space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Mức độ đau</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Triệu chứng kèm theo</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Thời gian xuất hiện</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleUpdateModel}
                    className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                  >
                    Cập nhật Model
                  </button>
                </div>
              </div>
            )}

            {/* Training Data */}
            {updateType === "training" && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Thêm vào Training Dataset</h3>
                  <p className="text-sm text-blue-800 mb-4">
                    Case này sẽ được thêm vào dataset để training model trong lần cập nhật tiếp theo
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Label chính xác</label>
                      <select className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Khẩn cấp</option>
                        <option>Cần bác sĩ</option>
                        <option>Nhẹ</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Ghi chú bổ sung</label>
                      <textarea
                        rows={3}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Các yếu tố quan trọng cần chú ý..."
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="validate" className="rounded" />
                      <label htmlFor="validate" className="text-sm text-gray-700">
                        Đã được bác sĩ xác nhận
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToTraining}
                    className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Thêm vào Dataset
                  </button>
                </div>
              </div>
            )}

            {/* Rule Based */}
            {updateType === "rule" && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-3">Thêm Quy tắc Mới</h3>
                  <p className="text-sm text-green-800 mb-4">
                    Tạo rule-based logic để xử lý các trường hợp tương tự
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Điều kiện</label>
                      <input
                        type="text"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="VD: Nếu có 'đau bụng dữ dội' + 'nôn mửa'"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Kết quả</label>
                      <select className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>→ Khẩn cấp</option>
                        <option>→ Cần bác sĩ</option>
                        <option>→ Nhẹ</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Độ ưu tiên</label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        defaultValue="8"
                        className="mt-1 w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Thấp</span>
                        <span>Cao</span>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
                    Tạo Quy tắc
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Impact Prediction */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Dự đoán tác động</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">+2.3%</p>
                <p className="text-sm text-gray-600 mt-1">Độ chính xác dự kiến</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">156</p>
                <p className="text-sm text-gray-600 mt-1">Cases tương tự</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">24h</p>
                <p className="text-sm text-gray-600 mt-1">Thời gian áp dụng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
