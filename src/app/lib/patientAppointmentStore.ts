export type MedicalAppointment = {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  status: "upcoming" | "completed" | "cancelled";
  rating: number | null;
  diagnosis: string | null;
};

export type HospitalAppointment = {
  id: number;
  hospitalName: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  hasInsurance: boolean;
  totalAmount: number;
  ticketNumber: string;
};

const MEDICAL_KEY = "patientMedicalAppointments";
const HOSPITAL_KEY = "patientHospitalAppointments";

const defaultMedicalAppointments: MedicalAppointment[] = [
  {
    id: "abc123",
    date: "2026-04-28",
    time: "14:00",
    doctor: "BS. Nguyễn Văn A",
    specialty: "Nội khoa",
    status: "completed",
    rating: 5,
    diagnosis: "Cảm cúm thông thường",
  },
  {
    id: "def456",
    date: "2026-04-15",
    time: "10:00",
    doctor: "BS. Trần Thị B",
    specialty: "Tim mạch",
    status: "completed",
    rating: 4,
    diagnosis: "Kiểm tra sức khỏe định kỳ",
  },
  {
    id: "ghi789",
    date: "2026-05-08",
    time: "09:00",
    doctor: "BS. Lê Văn C",
    specialty: "Tiêu hóa",
    status: "upcoming",
    rating: null,
    diagnosis: null,
  },
  {
    id: "xyz123",
    date: "2026-05-12",
    time: "14:30",
    doctor: "BS. Hoàng Thị E",
    specialty: "Da liễu",
    status: "upcoming",
    rating: null,
    diagnosis: null,
  },
  {
    id: "jkl012",
    date: "2026-03-20",
    time: "15:00",
    doctor: "BS. Phạm Thị D",
    specialty: "Nội tiết",
    status: "completed",
    rating: 5,
    diagnosis: "Tư vấn dinh dưỡng",
  },
  {
    id: "mno345",
    date: "2026-02-10",
    time: "11:00",
    doctor: "BS. Vũ Văn F",
    specialty: "Hô hấp",
    status: "completed",
    rating: null,
    diagnosis: "Viêm họng nhẹ",
  },
];

const defaultHospitalAppointments: HospitalAppointment[] = [
  {
    id: 1,
    hospitalName: "Bệnh viện Bạch Mai",
    specialty: "Tim mạch",
    date: "2026-05-10",
    time: "09:00",
    status: "upcoming",
    hasInsurance: true,
    totalAmount: 40000,
    ticketNumber: "BM20260510001",
  },
  {
    id: 2,
    hospitalName: "Bệnh viện Vinmec Times City",
    specialty: "Nội khoa",
    date: "2026-04-20",
    time: "14:00",
    status: "completed",
    hasInsurance: false,
    totalAmount: 200000,
    ticketNumber: "VM20260420001",
  },
  {
    id: 3,
    hospitalName: "Bệnh viện Chợ Rẫy",
    specialty: "Tiêu hóa",
    date: "2026-03-15",
    time: "10:30",
    status: "cancelled",
    hasInsurance: true,
    totalAmount: 40000,
    ticketNumber: "CR20260315001",
  },
];

function loadFromStorage<T>(key: string, defaultData: T[]): T[] {
  if (typeof window === "undefined") return defaultData;
  const stored = window.localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultData;
}

function saveToStorage<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function getMedicalAppointments() {
  return loadFromStorage(MEDICAL_KEY, defaultMedicalAppointments);
}

export function saveMedicalAppointments(appointments: MedicalAppointment[]) {
  saveToStorage(MEDICAL_KEY, appointments);
}

export function getMedicalAppointmentById(id: string) {
  return getMedicalAppointments().find((apt) => apt.id === id);
}

export function updateMedicalAppointment(
  id: string,
  update: Partial<MedicalAppointment>
) {
  const appointments = getMedicalAppointments();
  const nextAppointments = appointments.map((item) =>
    item.id === id ? { ...item, ...update } : item
  );
  saveMedicalAppointments(nextAppointments);
  return nextAppointments;
}

export function getHospitalAppointments() {
  return loadFromStorage(HOSPITAL_KEY, defaultHospitalAppointments);
}

export function saveHospitalAppointments(appointments: HospitalAppointment[]) {
  saveToStorage(HOSPITAL_KEY, appointments);
}

export function getHospitalAppointmentById(id: number) {
  return getHospitalAppointments().find((apt) => apt.id === id);
}

export function updateHospitalAppointment(
  id: number,
  update: Partial<HospitalAppointment>
) {
  const appointments = getHospitalAppointments();
  const nextAppointments = appointments.map((item) =>
    item.id === id ? { ...item, ...update } : item
  );
  saveHospitalAppointments(nextAppointments);
  return nextAppointments;
}

export function addHospitalAppointment(appointment: HospitalAppointment) {
  const appointments = getHospitalAppointments();
  const nextAppointments = [...appointments, appointment];
  saveHospitalAppointments(nextAppointments);
  return nextAppointments;
}
