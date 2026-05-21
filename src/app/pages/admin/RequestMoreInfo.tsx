import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Send, ArrowLeft, FileText } from "lucide-react";

export default function RequestMoreInfo() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [requestedItems, setRequestedItems] = useState({
    moreEducation: false,
    moreCertifications: false,
    moreExperience: false,
    workVerification: false,
    other: false,
  });
  const [otherDetails, setOtherDetails] = useState("");

  const doctor = {
    id: doctorId,
    name: "Hoàng Văn F",
    email: "hoangvanf@email.com",
    specialty: "Da liễu",
    experience: 8,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedItems = Object.entries(requestedItems)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (selectedItems.length === 0 && !message) {
      alert("Vui lòng chọn ít nhất một mục hoặc nhập nội dung yêu cầu!");
      return;
    }

    alert(`Đã gửi yêu cầu bổ sung đến ${doctor.email}`);
    navigate("/admin/approve-doctors");
  };

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/admin/approve-doctors")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Yêu cầu bổ sung hồ sơ</h1>
          <p className="text-gray-600 mb-6">Gửi yêu cầu bổ sung thông tin cho bác sĩ</p>

          {/* Doctor Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-bold">
                {doctor.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">BS. {doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.specialty} - {doctor.experience} năm KN</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Email: {doctor.email}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Checklist */}
            <div className="mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">Thông tin cần bổ sung</h2>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requestedItems.moreEducation}
                    onChange={(e) => setRequestedItems({ ...requestedItems, moreEducation: e.target.checked })}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Bằng cấp học vấn</p>
                    <p className="text-sm text-gray-600">Cần bổ sung bản sao bằng tốt nghiệp, chứng chỉ...</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requestedItems.moreCertifications}
                    onChange={(e) => setRequestedItems({ ...requestedItems, moreCertifications: e.target.checked })}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Chứng chỉ hành nghề</p>
                    <p className="text-sm text-gray-600">Cần scan rõ nét chứng chỉ hành nghề hiện tại</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requestedItems.moreExperience}
                    onChange={(e) => setRequestedItems({ ...requestedItems, moreExperience: e.target.checked })}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Kinh nghiệm làm việc</p>
                    <p className="text-sm text-gray-600">Cần cung cấp giấy xác nhận từ nơi làm việc trước</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requestedItems.workVerification}
                    onChange={(e) => setRequestedItems({ ...requestedItems, workVerification: e.target.checked })}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Xác minh nơi làm việc</p>
                    <p className="text-sm text-gray-600">Cần giấy xác nhận từ đơn vị hiện tại</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requestedItems.other}
                    onChange={(e) => setRequestedItems({ ...requestedItems, other: e.target.checked })}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Khác</p>
                    <p className="text-sm text-gray-600">Yêu cầu thông tin khác</p>
                  </div>
                </label>

                {requestedItems.other && (
                  <div className="ml-7">
                    <textarea
                      value={otherDetails}
                      onChange={(e) => setOtherDetails(e.target.value)}
                      rows={3}
                      placeholder="Mô tả chi tiết thông tin cần bổ sung..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Additional Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tin nhắn bổ sung (tùy chọn)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Nhập nội dung yêu cầu chi tiết, hướng dẫn cách bổ sung..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Lưu ý:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Email yêu cầu sẽ được gửi đến địa chỉ: {doctor.email}</li>
                    <li>Bác sĩ có 7 ngày để bổ sung thông tin</li>
                    <li>Sau 7 ngày không phản hồi, hồ sơ sẽ bị từ chối tự động</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
              Gửi yêu cầu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
