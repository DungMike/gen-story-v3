'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useI18n } from '@/providers/I18nProvider';
import Header from '@/components/Header';

const HomePage: React.FC = () => {
  const { t } = useI18n();
  const router = useRouter();
  const [wordCount, setWordCount] = useState<number>(3000);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('mystery');
  const [currentTeamMember, setCurrentTeamMember] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Floating particles animation
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        background: linear-gradient(45deg, #06b6d4, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        z-index: 0;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        box-shadow: 0 0 6px #06b6d4;
      `;
      document.body.appendChild(particle);

      const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: 0 },
        { transform: 'translateY(-20px)', opacity: 1 },
        { transform: 'translateY(-100vh)', opacity: 0 }
      ], {
        duration: 8000 + Math.random() * 4000,
        easing: 'linear'
      });

      animation.onfinish = () => particle.remove();
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  // Team slider auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeamMember((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartCreating = () => {
    // Navigate to story creation with selected template
    router.push(`/template/${selectedTemplate}`);
  };

  const templates = [
    { id: 'mystery', name: t('homepage.templates.mystery'), icon: '🔍' },
    { id: 'romance', name: t('homepage.templates.romance'), icon: '💝' },
    { id: 'scifi', name: t('homepage.templates.scifi'), icon: '🚀' },
    { id: 'fantasy', name: t('homepage.templates.fantasy'), icon: '⚔️' },
    { id: 'horror', name: t('homepage.templates.horror'), icon: '👻' },
    { id: 'adventure', name: t('homepage.templates.adventure'), icon: '🗺️' }
  ];

  const teamMembers = [
    {
      name: 'Mai Dũng',
      role: 'Frontend Developer',
      description: 'Chuyên gia phát triển giao diện người dùng với 5+ năm kinh nghiệm React & Next.js',
      image: '/images/fe-dev.jpeg',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
    },
    {
      name: 'Dũng Mai',
      role: 'Backend Developer',
      description: 'Kiến trúc sư hệ thống backend với chuyên môn về AI và microservices',
      image: '/images/be-dev.jpg',
      skills: ['Node.js', 'Python', 'AI/ML', 'MongoDB']
    },
    {
      name: 'Dũng Mike',
      role: 'UI/UX Designer',
      description: 'Nhà thiết kế sáng tạo với tư duy user-centered và kinh nghiệm design thinking',
      image: '/images/designer.jpg',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
    },
    {
      name: 'Mike Dũng',
      role: 'Business Analyst',
      description: 'Chuyên gia phân tích nghiệp vụ với khả năng bridge giữa technical và business',
      image: '/images/ba.png',
      skills: ['Requirements Analysis', 'Process Mapping', 'Stakeholder Management', 'Agile']
    }
  ];

  const membershipPlans = [
    {
      id: 'free',
      name: 'Miễn phí',
      price: '0',
      period: 'tháng',
      description: 'Phù hợp cho người mới bắt đầu',
      features: [
        '5 câu chuyện/tháng',
        'Template cơ bản',
        'Export PDF',
        'Hỗ trợ email'
      ],
      popular: false
    },
    {
      id: 'basic',
      name: 'Cơ bản',
      price: '99.000',
      period: 'tháng',
      description: 'Tốt nhất cho người dùng cá nhân',
      features: [
        '50 câu chuyện/tháng',
        'Tất cả template',
        'Text-to-Speech',
        'Tạo ảnh AI',
        'Export đa định dạng',
        'Hỗ trợ ưu tiên'
      ],
      popular: true
    },
    {
      id: 'pro',
      name: 'Chuyên nghiệp',
      price: '199.000',
      period: 'tháng',
      description: 'Cho các nhà sáng tạo nội dung',
      features: [
        'Không giới hạn câu chuyện',
        'Template premium',
        'Voice cloning',
        'Tạo ảnh HD',
        'API access',
        'Hỗ trợ 24/7',
        'Tùy chỉnh branding'
      ],
      popular: false
    }
  ];

  const faqData = [
    {
      question: 'AI Story Generator hoạt động như thế nào?',
      answer: 'Chúng tôi sử dụng công nghệ AI tiên tiến để tạo ra các câu chuyện độc đáo dựa trên template và yêu cầu của bạn. Hệ thống sẽ phân tích ngữ cảnh và tạo nội dung phù hợp với phong cách bạn mong muốn.'
    },
    {
      question: 'Tôi có thể tùy chỉnh câu chuyện được tạo ra không?',
      answer: 'Có, bạn hoàn toàn có thể chỉnh sửa và tùy chỉnh câu chuyện sau khi AI tạo ra. Hệ thống hỗ trợ editing real-time và lưu trữ các phiên bản khác nhau.'
    },
    {
      question: 'Có hỗ trợ tiếng Việt không?',
      answer: 'Có, chúng tôi hỗ trợ đầy đủ tiếng Việt cho cả việc tạo nội dung và giao diện người dùng. AI của chúng tôi được huấn luyện đặc biệt để hiểu và tạo nội dung tiếng Việt tự nhiên.'
    },
    {
      question: 'Tôi có thể hủy gói thành viên bất cứ lúc nào không?',
      answer: 'Có, bạn có thể hủy gói thành viên bất cứ lúc nào mà không phát sinh phí phạt. Các tính năng premium sẽ được duy trì đến hết chu kỳ thanh toán hiện tại.'
    },
    {
      question: 'Làm sao để xuất câu chuyện ra các định dạng khác nhau?',
      answer: 'Sau khi tạo xong câu chuyện, bạn có thể xuất ra nhiều định dạng như PDF, DOCX, EPUB, hoặc âm thanh. Chức năng này có sẵn trong tất cả các gói thành viên.'
    }
  ];

  const tutorialSteps = [
    {
      step: 1,
      title: 'Chọn Template',
      description: 'Lựa chọn thể loại câu chuyện phù hợp với ý tưởng của bạn',
      icon: '🎯'
    },
    {
      step: 2,
      title: 'Điền Thông Tin',
      description: 'Nhập các thông tin cần thiết như nhân vật, bối cảnh, độ dài câu chuyện',
      icon: '✍️'
    },
    {
      step: 3,
      title: 'Tạo Câu Chuyện',
      description: 'AI sẽ phân tích và tạo ra câu chuyện hoàn chỉnh theo yêu cầu của bạn',
      icon: '🤖'
    },
    {
      step: 4,
      title: 'Chỉnh Sửa & Xuất Bản',
      description: 'Tùy chỉnh nội dung và xuất ra định dạng mong muốn',
      icon: '📚'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            {t('homepage.hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('homepage.hero.subtitle')}
          </p>
          
          <button
            onClick={handleStartCreating}
            className="group relative inline-flex items-center px-12 py-4 text-xl font-semibold text-white bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="relative flex items-center">
              {t('homepage.hero.cta')}
              <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        {/* Floating Tech Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-ping"></div>
      </section>

      

      {/* Template Selection Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t('homepage.templates.title')}
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t('homepage.templates.subtitle')}
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedTemplate === template.id
                    ? 'bg-gradient-to-br from-cyan-600/20 to-purple-600/20 border-cyan-400 shadow-lg shadow-cyan-500/25'
                    : 'bg-gray-800/30 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="text-4xl mb-3">{template.icon}</div>
                <div className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                  {template.name}
                </div>
              </button>
            ))}
          </div>

          {/* Create Story and Dashboard Buttons */}
          <div className="text-center space-y-4">
            <button
              onClick={handleStartCreating}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
              </svg>
              {t('homepage.createStory')}
            </button>
          </div>
        </div>
      </section>

      {/* Membership Plans Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Gói Thành Viên
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Lựa chọn gói phù hợp để tận hưởng đầy đủ tính năng AI Story Generator
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {membershipPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-yellow-400 shadow-lg shadow-yellow-500/25'
                    : 'border-gray-700/50 hover:border-gray-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                      PHỔ BIẾN NHẤT
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">₫/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 hover:from-yellow-600 hover:to-orange-600'
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  {plan.price === '0' ? 'Bắt Đầu Miễn Phí' : 'Đăng Ký Ngay'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('homepage.features.title')}
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t('homepage.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Story Generation */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('homepage.features.story.title')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('homepage.features.story.description')}</p>
            </div>

            {/* Feature 2: Voice Conversion */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.79l-4-3.207a1 1 0 01-.383-.79V6.207a1 1 0 01.383-.79l4-3.207a1 1 0 01.617-.134zM14 8.586V14a1 1 0 102 0V8.586l2.293 2.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 001.414 1.414L14 8.586z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('homepage.features.voice.title')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('homepage.features.voice.description')}</p>
            </div>

            {/* Feature 3: Image Generation */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('homepage.features.image.title')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('homepage.features.image.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Guide Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Hướng Dẫn Sử Dụng
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Tạo câu chuyện AI chỉ với 4 bước đơn giản
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutorialSteps.map((step, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 text-center">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                </div>
                
                {/* Arrow connector */}
                {index < tutorialSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleStartCreating}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Bắt Đầu Ngay
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Tìm câu trả lời cho những thắc mắc phổ biến về AI Story Generator
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-4 text-gray-300 leading-relaxed border-t border-gray-700/50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Vẫn có thắc mắc khác?</p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 text-white font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Liên Hệ Hỗ Trợ
            </button>
          </div>
        </div>
      </section>


      {/* Team Introduction Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Đội Ngũ Phát Triển
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Gặp gỡ những con người tài năng đằng sau sản phẩm AI Story Generator
            </p>
          </div>

          <div className="relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Team Member Info */}
              <div className="space-y-6">
                <div className="text-8xl text-center md:text-left rounded-full w-[150px] h-[150px] overflow-hidden">
                  <Image src={`${teamMembers[currentTeamMember].image}`} alt= '' width={150} height={150} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {teamMembers[currentTeamMember].name}
                  </h3>
                  <p className="text-xl text-cyan-400 mb-4">
                    {teamMembers[currentTeamMember].role}
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {teamMembers[currentTeamMember].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {teamMembers[currentTeamMember].skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-400/30 rounded-full text-sm text-cyan-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Member Navigation */}
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTeamMember(index)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      currentTeamMember === index
                        ? 'bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-400'
                        : 'bg-gray-700/30 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-semibold text-white">{member.name}</div>
                        <div className="text-sm text-gray-400">{member.role}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {teamMembers.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTeamMember === index ? 'bg-cyan-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">{t('homepage.footer.copyright')}</p>
        </div>
      </footer>

      {/* Custom CSS for slider */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </div>
  );
};

export default HomePage; 