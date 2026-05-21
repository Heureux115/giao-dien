import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FileText, Save, X, Plus, Trash2, Check } from "lucide-react";

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
}

export default function ConsultationReport() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: "",
    },
  ]);

  const patient = {
    name: "Nguyễn Văn A",
    age: 35,
    gender: "Nam",
    symptoms: "Đau đầu, chóng mặt kéo dài 3 ngày",
  };

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      {
        id: Math.max(...medicines.map((m) => m.id), 0) + 1,
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        notes: "",
      },
    ]);
  };

  const handleRemoveMedicine = (id: number) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((m) => m.id !== id));
    }
  };

  const handleMedicineChange = (id: number, field: string, value: string) => {
    setMedicines(
      medicines.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!diagnosis.trim()) {
      alert("Vui lòng nhập chuẩn đoán");
      return;
    }

    const validMedicines = medicines.filter(
      (m) =>
        m.name.trim() &&
        m.dosage.trim() &&
        m.frequency.trim() &&
        m.duration.trim()
    );

    if (validMedicines.length === 0) {
      alert("Vui lòng nhập ít nhất một đơn thuốc");
      return;
    }

    // TODO: Send data to backend
    console.log({
      appointmentId,
      diagnosis,
      advice,
      medicines: validMedicines,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/doctor/appointments");
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thành công!</h2>
          <p className="text-gray-600 mb-4">
            Báo cáo khám bệnh đã được lưu thành công
          </p>
          <p className="text-sm text-gray-500">
            Quay lại danh sách lịch hẹn...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-teal-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Báo Cáo Khám Bệnh
            </h1>
          </div>
          <p className="text-gray-600">
            Điền thông tin chuẩn đoán, đơn thuốc và lời khuyên cho bệnh nhân
          </p>
        </div>

        {/* Patient Info Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-l-4 border-teal-600">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Thông Tin Bệnh Nhân
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Họ tên</p>
              <p className="font-semibold text-gray-900">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Tuổi</p>
              <p className="font-semibold text-gray-900">{patient.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Giới tính</p>
              <p className="font-semibold text-gray-900">{patient.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Triệu chứng</p>
              <p className="font-semibold text-gray-900 text-sm">
                {patient.symptoms}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Diagnosis Section */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              1. Chuẩn Đoán Bệnh
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kết quả chuẩn đoán <span className="text-red-500">*</span>
              </label>
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Nhập chuẩn đoán bệnh chi tiết..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Mô tả chi tiết kết quả khám và chuẩn đoán của bạn
              </p>
            </div>
          </div>

          {/* Prescription Section */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              2. Đơn Thuốc
            </h3>

            {medicines.map((medicine, index) => (
              <div
                key={medicine.id}
                className="mb-6 p-4 border-2 border-gray-200 rounded-xl hover:border-teal-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold text-gray-900">
                    Thuốc {index + 1}
                  </p>
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(medicine.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên thuốc <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={medicine.name}
                      onChange={(e) =>
                        handleMedicineChange(medicine.id, "name", e.target.value)
                      }
                      placeholder="VD: Paracetamol"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Liều lượng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={medicine.dosage}
                      onChange={(e) =>
                        handleMedicineChange(
                          medicine.id,
                          "dosage",
                          e.target.value
                        )
                      }
                      placeholder="VD: 500mg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tần suất dùng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={medicine.frequency}
                      onChange={(e) =>
                        handleMedicineChange(
                          medicine.id,
                          "frequency",
                          e.target.value
                        )
                      }
                      placeholder="VD: 3 lần/ngày"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thời gian dùng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={medicine.duration}
                      onChange={(e) =>
                        handleMedicineChange(
                          medicine.id,
                          "duration",
                          e.target.value
                        )
                      }
                      placeholder="VD: 5 ngày"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <input
                    type="text"
                    value={medicine.notes}
                    onChange={(e) =>
                      handleMedicineChange(medicine.id, "notes", e.target.value)
                    }
                    placeholder="VD: Không uống với nước ấm, uống trước ăn..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddMedicine}
              className="w-full px-4 py-3 border-2 border-dashed border-teal-300 rounded-xl text-teal-600 hover:bg-teal-50 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Thêm Thuốc
            </button>
          </div>

          {/* Advice Section */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              3. Lời Khuyên Của Bác Sĩ
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hướng dẫn và lời khuyên cho bệnh nhân
              </label>
              <textarea
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                placeholder="VD: Nghỉ ngơi đủ 8 giờ/ngày, uống nhiều nước, tránh căng thẳng..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Ghi chú các hướng dẫn, chế độ ăn, lối sống và các lưu ý quan trọng
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 sticky bottom-6">
            <button
              type="button"
              onClick={() => navigate("/doctor/appointments")}
              className="flex-1 px-6 py-3 border-2 border-gray-300 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Lưu Báo Cáo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
