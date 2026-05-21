import { Link } from "react-router";
import { MessageCircle, Stethoscope, Shield, Clock, CheckCircle, Star, ArrowRight } from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: MessageCircle,
      title: "Tư vấn AI 24/7",
      description: "Phân tích triệu chứng tức thì với công nghệ AI tiên tiến",
    },
    {
      icon: Stethoscope,
      title: "Bác sĩ chuyên khoa",
      description: "Kết nối với hơn 300+ bác sĩ giàu kinh nghiệm",
    },
    {
      icon: Shield,
      title: "An toàn & Bảo mật",
      description: "Thông tin y tế được mã hóa và bảo mật tuyệt đối",
    },
    {
      icon: Clock,
      title: "Tiết kiệm thời gian",
      description: "Tư vấn trực tuyến, không cần di chuyển",
    },
  ];

  const stats = [
    { value: "25,000+", label: "Người dùng" },
    { value: "342", label: "Bác sĩ" },
    { value: "45,000+", label: "Tư vấn" },
    { value: "4.9/5", label: "Đánh giá" },
  ];

  const testimonials = [
    {
      name: "Nguyễn Thị Mai",
      role: "Bệnh nhân",
      content: "Rất tiện lợi! AI giúp tôi phân tích triệu chứng và kết nối với bác sĩ phù hợp ngay lập tức.",
      rating: 5,
    },
    {
      name: "BS. Trần Văn Hùng",
      role: "Bác sĩ Tim mạch",
      content: "Nền tảng tuyệt vời để tiếp cận bệnh nhân. Giao diện dễ sử dụng và hệ thống thanh toán minh bạch.",
      rating: 5,
    },
    {
      name: "Lê Văn Đức",
      role: "Bệnh nhân",
      content: "Đã tư vấn nhiều lần, bác sĩ rất tận tâm. Không cần xếp hàng chờ đợi lâu như bệnh viện.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="font-bold text-xl text-gray-900">HealthCare AI</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Tư vấn sức khỏe thông minh với AI
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Phân tích triệu chứng tức thì, kết nối bác sĩ chuyên khoa, chăm sóc sức khỏe mọi lúc mọi nơi
              </p>
              <div className="flex gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow"
                >
                  Bắt đầu ngay
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors"
                >
                  Đăng nhập
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Miễn phí tư vấn AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Bảo mật 100%</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">AI Trợ lý</p>
                      <p className="text-sm text-gray-600">Đang hoạt động</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-700">Xin chào! Tôi có thể giúp bạn phân tích triệu chứng ngay bây giờ.</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">Đau đầu</div>
                    <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">Sốt</div>
                    <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">Ho</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn HealthCare AI?
            </h2>
            <p className="text-xl text-gray-600">
              Nền tảng tư vấn sức khỏe hiện đại, kết hợp AI và bác sĩ chuyên khoa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Người dùng nói gì về chúng tôi
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn sàng chăm sóc sức khỏe của bạn?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Đăng ký miễn phí ngay hôm nay và nhận tư vấn AI không giới hạn
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow"
          >
            Đăng ký miễn phí
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="font-bold text-xl">HealthCare AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Nền tảng tư vấn sức khỏe trực tuyến hàng đầu Việt Nam
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/register" className="hover:text-white">Tư vấn AI</Link></li>
                <li><Link to="/register" className="hover:text-white">Đặt lịch bác sĩ</Link></li>
                <li><Link to="/register" className="hover:text-white">Lịch sử khám</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Dành cho bác sĩ</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/register/doctor" className="hover:text-white">Đăng ký bác sĩ</Link></li>
                <li><Link to="/login" className="hover:text-white">Đăng nhập</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="hover:text-white">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white">Điều khoản</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 HealthCare AI Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
