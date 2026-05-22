import { useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Lightbulb } from "lucide-react";

export default function AddRecommendation() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <div className="p-6 md:p-8 pb-24 lg:pb-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-10 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Guideline đã được thêm</h1>
          <p className="text-gray-600 mb-6">Khuyến nghị mới đã sẵn sàng trong thư viện recommendations.</p>
          <button onClick={() => navigate("/uiux-specialist/recommendations")} className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
            Xem thư viện
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 pb-24 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm khuyến nghị</h1>
        <p className="text-gray-600">Tạo guideline mới để chuẩn hóa cách cải thiện UI/UX trong hệ thống.</p>
      </div>

      <div className="max-w-3xl bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Thông tin guideline</h2>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề</label>
            <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="VD: Hiển thị phản hồi sau hành động quan trọng" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Danh mục</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>CTA</option>
              <option>Phản hồi</option>
              <option>Biểu mẫu</option>
              <option>Khả năng tiếp cận</option>
              <option>Điều hướng</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">NÊN</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">KHÔNG NÊN</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ví dụ</label>
            <textarea rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <button onClick={() => setSaved(true)} className="w-full px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
            Lưu guideline
          </button>
        </div>
      </div>
    </div>
  );
}
