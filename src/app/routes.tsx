import { createBrowserRouter } from "react-router";

// Auth & Landing pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import LoginPatient from "./pages/LoginPatient";
import LoginDoctor from "./pages/LoginDoctor";
import LoginAdmin from "./pages/LoginAdmin";
import LoginAISpecialist from "./pages/LoginAISpecialist";
import Register from "./pages/Register";
import RegisterDoctor from "./pages/RegisterDoctor";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Patient pages
import Home from "./pages/patient/Home";
import AIChatConsult from "./pages/patient/AIChatConsult";
import AIResultLight from "./pages/patient/AIResultLight";
import AIResultNeedDoctor from "./pages/patient/AIResultNeedDoctor";
import AIResultEmergency from "./pages/patient/AIResultEmergency";
import DoctorList from "./pages/patient/DoctorList";
import DoctorDetail from "./pages/patient/DoctorDetail";
import Booking from "./pages/patient/Booking";
import Payment from "./pages/patient/Payment";
import BookingConfirmed from "./pages/patient/BookingConfirmed";
import ConsultSession from "./pages/patient/ConsultSession";
import PatientProfile from "./pages/patient/PatientProfile";
import MedicalHistory from "./pages/patient/MedicalHistory";
import RateDoctor from "./pages/patient/RateDoctor";
import Settings from "./pages/patient/Settings";
import AppointmentDetail from "./pages/patient/AppointmentDetail";
import HospitalBooking from "./pages/patient/HospitalBooking";
import HospitalPayment from "./pages/patient/HospitalPayment";
import HospitalTicket from "./pages/patient/HospitalTicket";
import HospitalHistory from "./pages/patient/HospitalHistory";

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorConsult from "./pages/doctor/DoctorConsult";
import ConsultationReport from "./pages/doctor/ConsultationReport";
import DoctorWallet from "./pages/doctor/DoctorWallet";
import DoctorWithdraw from "./pages/doctor/DoctorWithdraw";
import DoctorSettings from "./pages/doctor/DoctorSettings";

// AI Specialist pages
import AISpecialistDashboard from "./pages/ai-specialist/AISpecialistDashboard";
import AIStats from "./pages/ai-specialist/AIStats";
import AIErrorCases from "./pages/ai-specialist/AIErrorCases";
import AIModelUpdate from "./pages/ai-specialist/AIModelUpdate";
import AddTrainingData from "./pages/ai-specialist/AddTrainingData";
import AddRule from "./pages/ai-specialist/AddRule";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ApproveDoctors from "./pages/admin/ApproveDoctors";
import SystemStats from "./pages/admin/SystemStats";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManageClinics from "./pages/admin/ManageClinics";
import RequestMoreInfo from "./pages/admin/RequestMoreInfo";

// Layouts
import PatientLayout from "./layouts/PatientLayout";
import DoctorLayout from "./layouts/DoctorLayout";
import AISpecialistLayout from "./layouts/AISpecialistLayout";
import AdminLayout from "./layouts/AdminLayout";

// Other
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/login/patient",
    Component: LoginPatient,
  },
  {
    path: "/login/doctor",
    Component: LoginDoctor,
  },
  {
    path: "/login/admin",
    Component: LoginAdmin,
  },
  {
    path: "/login/ai-specialist",
    Component: LoginAISpecialist,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/register/doctor",
    Component: RegisterDoctor,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  // Patient routes
  {
    path: "/patient",
    Component: PatientLayout,
    children: [
      { index: true, Component: Home },
      { path: "consult", Component: AIChatConsult },
      { path: "result/light", Component: AIResultLight },
      { path: "result/need-doctor", Component: AIResultNeedDoctor },
      { path: "result/emergency", Component: AIResultEmergency },
      { path: "doctors", Component: DoctorList },
      { path: "doctors/:id", Component: DoctorDetail },
      { path: "hospitals", Component: HospitalBooking },
      { path: "hospital-payment/:appointmentId", Component: HospitalPayment },
      { path: "hospital-ticket/:appointmentId", Component: HospitalTicket },
      { path: "hospital-history", Component: HospitalHistory },
      { path: "booking/:doctorId", Component: Booking },
      { path: "payment/:appointmentId", Component: Payment },
      { path: "booking-confirmed/:appointmentId", Component: BookingConfirmed },
      { path: "consult-session/:appointmentId", Component: ConsultSession },
      { path: "profile", Component: PatientProfile },
      { path: "history", Component: MedicalHistory },
      { path: "history/:appointmentId", Component: AppointmentDetail },
      { path: "rate/:appointmentId", Component: RateDoctor },
      { path: "settings", Component: Settings },
    ],
  },
  // Doctor routes
  {
    path: "/doctor",
    Component: DoctorLayout,
    children: [
      { index: true, Component: DoctorDashboard },
      { path: "appointments", Component: DoctorAppointments },
      { path: "consult/:appointmentId", Component: DoctorConsult },
      { path: "consult/:appointmentId/report", Component: ConsultationReport },
      { path: "wallet", Component: DoctorWallet },
      { path: "withdraw", Component: DoctorWithdraw },
      { path: "settings", Component: DoctorSettings },
    ],
  },
  // AI Specialist routes
  {
    path: "/ai-specialist",
    Component: AISpecialistLayout,
    children: [
      { index: true, Component: AISpecialistDashboard },
      { path: "stats", Component: AIStats },
      { path: "errors", Component: AIErrorCases },
      { path: "errors/:errorId/update", Component: AIModelUpdate },
      { path: "add-training-data", Component: AddTrainingData },
      { path: "add-rule", Component: AddRule },
    ],
  },
  // Admin routes
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "approve-doctors", Component: ApproveDoctors },
      { path: "approve-doctors/:doctorId/request-info", Component: RequestMoreInfo },
      { path: "manage-doctors", Component: ManageDoctors },
      { path: "manage-clinics", Component: ManageClinics },
      { path: "stats", Component: SystemStats },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
