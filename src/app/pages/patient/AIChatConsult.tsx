import { useState } from "react";
import { useNavigate } from "react-router";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
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
          navigate(randomResult, {
            state: {
              symptoms: messages.filter(m => m.type === "user").map(m => m.content).join(", ")
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

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nhập triệu chứng của bạn..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
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
