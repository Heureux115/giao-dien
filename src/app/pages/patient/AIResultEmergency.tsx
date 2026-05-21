import { useLocation } from "react-router";
import { AlertTriangle, Phone, MapPin, Clock } from "lucide-react";

export default function AIResultEmergency() {
  const location = useLocation();
  const symptoms = location.state?.symptoms || "Các triệu chứng bạn đã mô tả";

  const hospitals = [
    { name: "Bệnh viện Bạch Mai", distance: "2.5 km", phone: "024 3869 3731" },
    { name: "Bệnh viện 108", distance: "3.8 km", phone: "024 3862 4305" },
    { name: "Bệnh viện Việt Đức", distance: "4.2 km", phone: "024 3825 3531" },
  ];

  return (
    <div className="min-h-screen bg-red-600 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Emergency Alert */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6 animate-pulse">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-16 h-16 text-white animate-bounce" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
              KHẨN CẤP!
            </h1>
            <p className="text-xl text-gray-900 font-semibold">
              Cần đến cơ sở y tế NGAY LẬP TỨC
            </p>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-900 font-medium mb-2">Triệu chứng của bạn:</p>
            <p className="text-red-800">{symptoms}</p>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
            <p className="text-yellow-900 font-semibold mb-2">⚠️ Cảnh báo nghiêm trọng:</p>
            <p className="text-yellow-800 text-sm">
              Dựa trên phân tích, triệu chứng của bạn có dấu hiệu nguy hiểm và cần được xử lý y tế khẩn cấp. KHÔNG TỰ Ý điều trị tại nhà.
            </p>
          </div>
        </div>

        {/* Emergency Actions */}
        <div className="space-y-4 mb-6">
          <a
            href="tel:115"
            className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
          >
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Gọi cấp cứu 115</h3>
              <p className="text-sm text-gray-600">Nhấn để gọi ngay</p>
            </div>
            <div className="text-3xl font-bold text-red-600">115</div>
          </a>

          <a
            href="tel:113"
            className="flex items-center gap-4 bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Công an 113</h3>
              <p className="text-sm text-gray-600">Nếu cần hỗ trợ khẩn cấp</p>
            </div>
          </a>
        </div>

        {/* Nearby Hospitals */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600" />
            Bệnh viện gần nhất
          </h2>
          <div className="space-y-3">
            {hospitals.map((hospital, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    Cách {hospital.distance}
                  </p>
                  <a
                    href={`tel:${hospital.phone.replace(/\s/g, '')}`}
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    <Phone className="w-4 h-4" />
                    {hospital.phone}
                  </a>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(hospital.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Chỉ đường
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Trong lúc chờ cấp cứu
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-semibold text-xs">
                1
              </span>
              <span>Giữ bình tĩnh và nằm nghỉ tại chỗ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-semibold text-xs">
                2
              </span>
              <span>Thông báo cho người thân hoặc người xung quanh</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-semibold text-xs">
                3
              </span>
              <span>KHÔNG tự ý uống thuốc hoặc ăn uống</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-semibold text-xs">
                4
              </span>
              <span>Chuẩn bị giấy tờ: CMND, thẻ BHYT (nếu có)</span>
            </li>
          </ul>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 text-center">
          <p className="text-yellow-900 font-bold">
            ⚠️ Trang này KHÔNG cho phép đặt lịch khám trực tuyến
          </p>
          <p className="text-yellow-800 text-sm mt-1">
            Vui lòng đến cơ sở y tế hoặc gọi cấp cứu ngay lập tức
          </p>
        </div>
      </div>
    </div>
  );
}
