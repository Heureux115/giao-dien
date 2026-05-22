import { useState } from "react";
import { CheckCircle, FilePlus2 } from "lucide-react";

export default function ReportIssue() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="p-6 md:p-8 pb-24 lg:pb-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-10 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Vấn đề đã được ghi nhận</h1>
          <p className="text-gray-600 mb-6">Vấn đề sẽ xuất hiện trong danh sách điểm khó khăn để theo dõi tiếp.</p>
          <button onClick={() => { setSubmitted(false); setStep(1); }} className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
            Tạo issue khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 pb-24 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Báo cáo vấn đề</h1>
        <p className="text-gray-600">Ghi nhận vấn đề thiết kế theo role, màn hình, loại lỗi và mức độ nghiêm trọng.</p>
      </div>

      <div className="max-w-4xl bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                item <= step ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                {item}
              </div>
              {item < 3 && <div className={`h-1 flex-1 ${item < step ? "bg-purple-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <FilePlus2 className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Thông tin cơ bản</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role bị ảnh hưởng</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Bệnh nhân</option>
                  <option>Bác sĩ</option>
                  <option>Quản trị viên</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Màn hình / luồng</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Đặt lịch khám</option>
                  <option>Thanh toán</option>
                  <option>Đánh giá bác sĩ</option>
                  <option>Duyệt hồ sơ</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-900">Phân loại vấn đề</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Loại lỗi</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>CTA không rõ</option>
                  <option>Luồng quá nhiều bước</option>
                  <option>Thiếu phản hồi hệ thống</option>
                  <option>Khả năng tiếp cận</option>
                  <option>Tính nhất quán</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mức độ nghiêm trọng</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Cao</option>
                  <option>Trung bình</option>
                  <option>Thấp</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Điểm khó khăn</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Người dùng gặp khó khăn gì?" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-900">Đề xuất cải thiện</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phân tích nguyên nhân</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Lỗi thiết kế nằm ở đâu?" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Đề xuất</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Nên cải thiện thế nào?" />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setStep(Math.max(1, step - 1))}
            className="px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
          >
            Quay lại
          </button>
          {step < 3 ? (
            <button type="button" onClick={() => setStep(step + 1)} className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              Tiếp tục
            </button>
          ) : (
            <button type="button" onClick={() => setSubmitted(true)} className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              Lưu vấn đề
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
