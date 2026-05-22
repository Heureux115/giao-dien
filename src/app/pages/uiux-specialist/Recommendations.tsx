import { Link } from "react-router";
import { Lightbulb, Plus } from "lucide-react";
import { recommendations } from "./data";

export default function Recommendations() {
  return (
    <div className="p-6 md:p-8 pb-24 lg:pb-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Khuyến nghị thiết kế</h1>
          <p className="text-gray-600">Thư viện thực hành tốt, guideline, ví dụ và NÊN/KHÔNG NÊN cho nhóm thiết kế.</p>
        </div>
        <Link to="/uiux-specialist/recommendations/new" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
          <Plus className="w-5 h-5" />
          Thêm khuyến nghị
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <div key={item.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded">{item.category}</span>
              </div>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">{item.title}</h2>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-sm font-semibold text-green-900 mb-1">NÊN</p>
                <p className="text-sm text-green-800">{item.do}</p>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                <p className="text-sm font-semibold text-red-900 mb-1">KHÔNG NÊN</p>
                <p className="text-sm text-red-800">{item.dont}</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-sm font-semibold text-blue-900 mb-1">Ví dụ</p>
                <p className="text-sm text-blue-800">{item.example}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
