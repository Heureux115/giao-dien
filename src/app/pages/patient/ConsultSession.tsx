import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Video, VideoOff, Mic, MicOff, Send, Phone, User, Bot } from "lucide-react";
import { updateMedicalAppointment } from "../../lib/patientAppointmentStore";

export default function ConsultSession() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "doctor", text: "Xin chào! Tôi là BS. Nguyễn Văn A. Bạn cảm thấy thế nào hôm nay?" },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: messages.length + 1, sender: "patient", text: message }]);
    setMessage("");

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: "doctor",
        text: "Tôi hiểu rồi. Để tôi kiểm tra thêm một vài thông tin..."
      }]);
    }, 1000);
  };

  const handleEndCall = () => {
    if (confirm("Bạn có chắc muốn kết thúc buổi tư vấn?")) {
      if (appointmentId) {
        updateMedicalAppointment(appointmentId, { status: "completed" });
      }
      navigate(`/patient/rate/${appointmentId}`);
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Main Video (Doctor) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
              NA
            </div>
            <p className="text-white text-xl font-semibold">BS. Nguyễn Văn A</p>
            <p className="text-gray-400">Nội khoa</p>
          </div>
        </div>

        {/* Self Video (Picture in Picture) */}
        <div className="absolute bottom-4 right-4 w-40 h-28 bg-gray-800 rounded-xl border-2 border-gray-600 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <User className="w-12 h-12 text-gray-500" />
          </div>
        </div>

        {/* Session Info */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2">
          <p className="text-white text-sm font-medium">Buổi tư vấn #{appointmentId}</p>
          <p className="text-gray-300 text-xs">Đang diễn ra - 12:35</p>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="bg-white h-64 flex flex-col border-t-4 border-blue-600">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === "patient" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === "doctor" ? "bg-blue-600" : "bg-teal-600"
              }`}>
                {msg.sender === "doctor" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                msg.sender === "doctor" ? "bg-gray-100" : "bg-blue-600 text-white"
              }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4">
        <div className="max-w-md mx-auto flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isMicOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isMicOn ? (
              <Mic className="w-6 h-6 text-white" />
            ) : (
              <MicOff className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isVideoOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isVideoOn ? (
              <Video className="w-6 h-6 text-white" />
            ) : (
              <VideoOff className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={handleEndCall}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
          >
            <Phone className="w-6 h-6 text-white rotate-135" />
          </button>
        </div>
      </div>
    </div>
  );
}
