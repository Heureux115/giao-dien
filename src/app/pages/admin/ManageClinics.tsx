import { useState } from "react";
import { Building2, MapPin, Phone, Clock, Plus, Edit, Trash2, X } from "lucide-react";

interface Clinic {
  id: number;
  name: string;
  address: string;
  phone: string;
  specialties: string[];
  openHours: string;
  status: "active" | "inactive";
}

const initialClinics: Clinic[] = [
  {
    id: 1,
    name: "Phòng khám Đa khoa Medlatec",
    address: "42-44 Nghĩa Dũng, Ba Đình, Hà Nội",
    phone: "024 7106 6858",
    specialties: ["Nội khoa", "Ngoại khoa", "Da liễu"],
    openHours: "7:00 - 20:00",
    status: "active",
  },
  {
    id: 2,
    name: "Phòng khám Thu Cúc",
    address: "286 Thụy Khuê, Tây Hồ, Hà Nội",
    phone: "024 3927 5568",
    specialties: ["Tim mạch", "Tai mũi họng", "Mắt"],
    openHours: "8:00 - 17:00",
    status: "active",
  },
];

export default function ManageClinics() {
  const [clinics, setClinics] = useState<Clinic[]>(initialClinics);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
  const [formData, setFormData] = useState<Partial<Clinic>>({
    name: "",
    address: "",
    phone: "",
    specialties: [],
    openHours: "",
    status: "active",
  });
  const [newSpecialty, setNewSpecialty] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingClinic) {
      setClinics(
        clinics.map((c) =>
          c.id === editingClinic.id ? { ...editingClinic, ...formData } as Clinic : c
        )
      );
      alert("Cập nhật phòng khám thành công!");
    } else {
      const newClinic: Clinic = {
        id: Math.max(...clinics.map((c) => c.id)) + 1,
        name: formData.name || "",
        address: formData.address || "",
        phone: formData.phone || "",
        specialties: formData.specialties || [],
        openHours: formData.openHours || "",
        status: formData.status || "active",
      };
      setClinics([...clinics, newClinic]);
      alert("Thêm phòng khám thành công!");
    }

    setShowAddModal(false);
    setEditingClinic(null);
    setFormData({
      name: "",
      address: "",
      phone: "",
      specialties: [],
      openHours: "",
      status: "active",
    });
  };

  const handleEdit = (clinic: Clinic) => {
    setEditingClinic(clinic);
    setFormData(clinic);
    setShowAddModal(true);
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa phòng khám "${name}"?`)) {
      setClinics(clinics.filter((c) => c.id !== id));
      alert("Đã xóa phòng khám!");
    }
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && formData.specialties) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, newSpecialty.trim()],
      });
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (index: number) => {
    setFormData({
      ...formData,
      specialties: formData.specialties?.filter((_, i) => i !== index),
    });
  };

  const stats = {
    total: clinics.length,
    active: clinics.filter((c) => c.status === "active").length,
    inactive: clinics.filter((c) => c.status === "inactive").length,
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý phòng khám</h1>
          <p className="text-gray-600">{stats.total} phòng khám trong hệ thống</p>
        </div>
        <button
          onClick={() => {
            setEditingClinic(null);
            setFormData({
              name: "",
              address: "",
              phone: "",
              specialties: [],
              openHours: "",
              status: "active",
            });
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Thêm phòng khám
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-700 font-medium">Tổng số</span>
            <Building2 className="w-6 h-6 text-blue-700" />
          </div>
          <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
        </div>

        <div className="bg-green-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 font-medium">Hoạt động</span>
            <Building2 className="w-6 h-6 text-green-700" />
          </div>
          <p className="text-3xl font-bold text-green-900">{stats.active}</p>
        </div>

        <div className="bg-gray-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Tạm ngưng</span>
            <Building2 className="w-6 h-6 text-gray-700" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.inactive}</p>
        </div>
      </div>

      {/* Clinics List */}
      <div className="space-y-6">
        {clinics.map((clinic) => (
          <div key={clinic.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-3xl">
                  🏥
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{clinic.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{clinic.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{clinic.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Giờ làm việc: {clinic.openHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    clinic.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {clinic.status === "active" ? "Hoạt động" : "Tạm ngưng"}
                </span>
                <button
                  onClick={() => handleEdit(clinic)}
                  className="p-2 hover:bg-blue-100 rounded-lg"
                  title="Chỉnh sửa"
                >
                  <Edit className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(clinic.id, clinic.name)}
                  className="p-2 hover:bg-red-100 rounded-lg"
                  title="Xóa"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Chuyên khoa:</p>
              <div className="flex flex-wrap gap-2">
                {clinic.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingClinic ? "Chỉnh sửa phòng khám" : "Thêm phòng khám mới"}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên phòng khám *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ làm việc *
                </label>
                <input
                  type="text"
                  value={formData.openHours}
                  onChange={(e) => setFormData({ ...formData, openHours: e.target.value })}
                  placeholder="Ví dụ: 8:00 - 17:00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chuyên khoa
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                    placeholder="Nhập chuyên khoa..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addSpecialty}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.specialties?.map((specialty, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg"
                    >
                      {specialty}
                      <button
                        type="button"
                        onClick={() => removeSpecialty(index)}
                        className="hover:bg-blue-200 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as "active" | "inactive" })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm ngưng</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  {editingClinic ? "Cập nhật" : "Thêm phòng khám"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
