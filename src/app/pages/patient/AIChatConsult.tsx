import { useState } from "react";
import { useNavigate } from "react-router";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const commonSymptoms = [
  { label: "Đau đầu", icon: "🤕" },
  { label: "Sốt", icon: "🌡️" },
  { label: "Ho / Đau họng", icon: "😷" },
  { label: "Đau bụng / Buồn nôn", icon: "🤢" },
  { label: "Khó thở / Tức ngực", icon: "🫁" },
  { label: "Mệt mỏi", icon: "🥱" },
  { label: "Đau mỏi cơ khớp", icon: "💪" },
  { label: "Mẩn ngứa ngoài da", icon: "🔴" }
];

const durations = ["Mới hôm nay", "2-3 ngày nay", "Khoảng 1 tuần", "Trên 2 tuần"];
const severities = ["Nhẹ (1-3)", "Trung bình (4-7)", "Nặng (8-10)"];
const histories = ["Không có", "Tim mạch / Huyết áp", "Tiểu đường", "Hen suyễn / Hô hấp"];

const medications = ["Chưa dùng thuốc gì", "Đã uống giảm đau/hạ sốt", "Đã dùng thuốc theo đơn cũ"];
const aggravations = ["Khi vận động nhiều", "Khi nằm nghỉ/Ban đêm", "Liên tục không giảm"];
const fevers = ["Không bị sốt", "Sốt nhẹ (< 38°C)", "Sốt cao (≥ 38.5°C)"];

export default function AIChatConsult() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Xin chào! Tôi là trợ lý AI y tế. Tôi sẽ giúp bạn phân tích triệu chứng và đưa ra lời khuyên phù hợp.\n\nVui lòng mô tả triệu chứng bạn đang gặp phải?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  // States for selection suggestions
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedHistory, setSelectedHistory] = useState("");
  const [selectedMedication, setSelectedMedication] = useState("");
  const [selectedAggravation, setSelectedAggravation] = useState("");
  const [selectedFever, setSelectedFever] = useState("");

  const handleToggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) => {
      const isSelected = prev.includes(symptom);
      const updated = isSelected
        ? prev.filter((item) => item !== symptom)
        : [...prev, symptom];
      
      // Auto pre-fill input text
      if (updated.length > 0) {
        setInput(`Tôi đang có các triệu chứng: ${updated.join(", ")}`);
      } else {
        setInput("");
      }
      return updated;
    });
  };

  const handleSend = async (customText?: string) => {
    const messageText = customText !== undefined ? customText : input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (customText === undefined) {
      setInput("");
    }
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const newCount = questionCount + 1;
      setQuestionCount(newCount);

      let aiResponse = "";

      if (newCount === 1) {
        aiResponse = "Cảm ơn bạn đã chia sẻ. Để tôi hiểu rõ hơn, bạn có thể cho biết:\n\n• Triệu chứng này xuất hiện từ bao lâu?\n• Mức độ đau/khó chịu từ 1-10 là bao nhiêu?\n• Bạn có tiền sử bệnh nào không?";
      } else if (newCount === 2) {
        aiResponse = "Tôi hiểu rồi. Còn một vài câu hỏi nữa:\n\n• Bạn đã dùng thuốc gì chưa?\n• Triệu chứng có tăng lên khi nào không?\n• Bạn có bị sốt không?";
      } else {
        // After 3 questions, analyze and redirect
        aiResponse = "Cảm ơn bạn đã cung cấp thông tin chi tiết. Để phân tích chính xác, vui lòng chờ trong giây lát...";

        setTimeout(() => {
          // Randomly redirect to one of 3 result pages
          const results = ["/patient/result/light", "/patient/result/need-doctor", "/patient/result/emergency"];
          const randomResult = results[Math.floor(Math.random() * results.length)];
          
          // Compile all user responses to pass in state
          const allUserMessages = [...messages, userMessage]
            .filter((m) => m.type === "user")
            .map((m) => m.content.replace(/•/g, "").replace(/\n/g, ", "))
            .join(", ");

          navigate(randomResult, {
            state: {
              symptoms: allUserMessages
            }
          });
        }, 2000);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSendDetails = () => {
    if (!selectedDuration || !selectedSeverity || !selectedHistory || isLoading) return;
    const details = `• Thời gian xuất hiện: ${selectedDuration}\n• Mức độ khó chịu: ${selectedSeverity}\n• Tiền sử bệnh lý: ${selectedHistory}`;
    handleSend(details);
  };

  const handleSendMoreAnswers = () => {
    if (!selectedMedication || !selectedAggravation || !selectedFever || isLoading) return;
    const details = `• Sử dụng thuốc: ${selectedMedication}\n• Triệu chứng tăng lên: ${selectedAggravation}\n• Tình trạng sốt: ${selectedFever}`;
    handleSend(details);
  };

  return (
    <div className="h-[calc(100vh-73px)] md:h-[calc(100vh-65px)] flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-semibold">Trợ lý AI y tế</h2>
          <p className="text-xs text-gray-500">Đang hoạt động</p>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
        <p className="text-xs text-amber-700 text-center">
          ⚠️ Tư vấn AI chỉ mang tính tham khảo, không thay thế chẩn đoán của bác sĩ
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.type === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === "ai"
                  ? "bg-gradient-to-br from-blue-500 to-purple-600"
                  : "bg-blue-600"
              }`}
            >
              {message.type === "ai" ? (
                <Bot className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
            <div
              className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-3 ${
                message.type === "ai"
                  ? "bg-white shadow-sm"
                  : "bg-blue-600 text-white"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <span
                className={`text-xs mt-1 block ${
                  message.type === "ai" ? "text-gray-400" : "text-blue-200"
                }`}
              >
                {message.timestamp.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white shadow-sm rounded-2xl px-4 py-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Options Panel */}
      {!isLoading && (
        <>
          {/* Step 0 Suggestions */}
          {questionCount === 0 && (
            <div className="bg-white border-t border-gray-100 p-4 transition-all">
              <div className="max-w-4xl mx-auto">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">💡 Gợi ý triệu chứng phổ biến (Tích chọn)</p>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((s) => {
                    const isSelected = selectedSymptoms.includes(s.label);
                    return (
                      <button
                        key={s.label}
                        onClick={() => handleToggleSymptom(s.label)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-full border transition-all duration-200 ${
                          isSelected
                            ? "bg-blue-100 border-blue-500 text-blue-700 font-semibold shadow-sm scale-105"
                            : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>{s.icon}</span>
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 1 Suggestions */}
          {questionCount === 1 && (
            <div className="bg-white border-t border-gray-100 p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="max-w-4xl mx-auto space-y-4">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">💡 Gợi ý trả lời nhanh (Tích chọn cả 3 mục)</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1: Duration */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-semibold text-gray-700 block mb-2">1. Thời gian xuất hiện</span>
                    <div className="flex flex-wrap gap-2">
                      {durations.map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDuration(d)}
                          className={`text-xs px-3 py-2 rounded-lg border transition-all w-full text-left ${
                            selectedDuration === d 
                              ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold shadow-sm"
                              : "bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Severity */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-semibold text-gray-700 block mb-2">2. Mức độ đau / Khó chịu</span>
                    <div className="flex flex-wrap gap-2">
                      {severities.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSeverity(s)}
                          className={`text-xs px-3 py-2 rounded-lg border transition-all w-full text-left ${
                            selectedSeverity === s
                              ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold shadow-sm"
                              : "bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: History */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-semibold text-gray-700 block mb-2">3. Tiền sử bệnh lý</span>
                    <div className="flex flex-wrap gap-2">
                      {histories.map((h) => (
                        <button
                          key={h}
                          onClick={() => setSelectedHistory(h)}
                          className={`text-xs px-3 py-2 rounded-lg border transition-all w-full text-left ${
                            selectedHistory === h
                              ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold shadow-sm"
                              : "bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSendDetails}
                    disabled={!selectedDuration || !selectedSeverity || !selectedHistory || isLoading}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-xs font-bold hover:shadow-md disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all"
                  >
                    Xác nhận & Gửi thông tin chi tiết
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 Suggestions */}
          {questionCount === 2 && (
            <div className="bg-white border-t border-gray-100 p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="max-w-4xl mx-auto space-y-4">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">💡 Gợi ý trả lời nhanh (Tích chọn cả 3 mục)</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1: Medication */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-semibold text-gray-700 block mb-2">1. Tình trạng dùng thuốc</span>
                    <div className="flex flex-wrap gap-2">
                      {medications.map((m) => (
                        <button
                          key={m}
                          onClick={() => setSelectedMedication(m)}
                          className={`text-xs px-3 py-2 rounded-lg border transition-all w-full text-left ${
                            selectedMedication === m 
                              ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold shadow-sm"
                              : "bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Aggravation */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-semibold text-gray-700 block mb-2">2. Triệu chứng tăng khi</span>
                    <div className="flex flex-wrap gap-2">
                      {aggravations.map((a) => (
                        <button
                          key={a}
                          onClick={() => setSelectedAggravation(a)}
                          className={`text-xs px-3 py-2 rounded-lg border transition-all w-full text-left ${
                            selectedAggravation === a
                              ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold shadow-sm"
                              : "bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Fever */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-semibold text-gray-700 block mb-2">3. Tình trạng sốt</span>
                    <div className="flex flex-wrap gap-2">
                      {fevers.map((f) => (
                        <button
                          key={f}
                          onClick={() => setSelectedFever(f)}
                          className={`text-xs px-3 py-2 rounded-lg border transition-all w-full text-left ${
                            selectedFever === f
                              ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold shadow-sm"
                              : "bg-white border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSendMoreAnswers}
                    disabled={!selectedMedication || !selectedAggravation || !selectedFever || isLoading}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-xs font-bold hover:shadow-md disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all"
                  >
                    Xác nhận & Gửi câu trả lời
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nhập triệu chứng hoặc tích chọn các gợi ý bên trên..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
