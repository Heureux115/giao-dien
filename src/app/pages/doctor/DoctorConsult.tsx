import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Video, VideoOff, Mic, MicOff, Send, Phone, User, FileText, Clock } from "lucide-react";

export default function DoctorConsult() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "patient", text: "Xin chào bác sĩ!" },
  ]);
  const [notes, setNotes] = useState("");

  const patient = {
    name: "Nguyễn Văn A",
    age: 35,
    gender: "Nam",
    symptoms: "Đau đầu, chóng mặt kéo dài 3 ngày",
    aiAnalysis: "AI phân tích: Có thể do stress, thiếu ngủ. Mức độ: Nhẹ - Nên khám để kiểm tra thêm.",
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: messages.length + 1, sender: "doctor", text: message }]);
    setMessage("");
  };

  const handleEndConsult = () => {
    if (confirm("Bạn có chắc muốn kết thúc buổi tư vấn?")) {
      navigate(`/doctor/consult/${appointmentId}/report`);
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Video Area */}
      <div className="flex-1 flex flex-col">
        {/* Patient Video */}
        <div className="flex-1 relative bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
                {patient.name.split(' ').pop()?.charAt(0)}
              </div>
              <p className="text-white text-xl font-semibold">{patient.name}</p>
              <p className="text-gray-400">{patient.age} tuổi - {patient.gender}</p>
            </div>
          </div>

          {/* Session Timer */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2">
            <div className="flex items-center gap-2 text-white">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium">15:23</p>
            </div>
          </div>

          {/* Self Video (Picture in Picture) */}
          <div className="absolute bottom-4 right-4 w-40 h-28 bg-gray-800 rounded-xl border-2 border-teal-600 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="bg-white h-48 flex flex-col border-t-4 border-teal-600">
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === "doctor" ? "flex-row-reverse" : ""}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.sender === "doctor" ? "bg-teal-600 text-white" : "bg-gray-100"
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 p-3">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isMicOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isMicOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isVideoOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isVideoOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
            </button>

            <button
              onClick={handleEndConsult}
              className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
            >
              <Phone className="w-5 h-5 text-white rotate-135" />
            </button>
          </div>
        </div>
      </div>

      {/* Patient Info Sidebar */}
      <div className="w-80 bg-white flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-gray-900">Thông tin bệnh nhân</h2>
        </div>

        <div className="p-4 space-y-4">
          {/* Basic Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Bệnh nhân</p>
            <p className="font-semibold text-gray-900 mb-1">{patient.name}</p>
            <p className="text-sm text-gray-600">{patient.age} tuổi - {patient.gender}</p>
          </div>

          {/* Symptoms */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Triệu chứng</h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">{patient.symptoms}</p>
            </div>
          </div>

          {/* AI Analysis */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Phân tích AI
            </h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">{patient.aiAnalysis}</p>
            </div>
          </div>

          {/* Medical Notes */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Ghi chú khám bệnh
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="Nhập chẩn đoán, lời khuyên, đơn thuốc..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
            <button className="w-full mt-2 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 text-sm font-medium">
              Lưu ghi chú
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
