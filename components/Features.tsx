export default function Features() {
  const features = [
    {
      title: '직관적인 디자인',
      description: '누구나 쉽게 사용할 수 있는 인터페이스로 복잡한 기술을 단순하게 만듭니다.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: '혁신적인 기술',
      description: '최신 기술로 더 빠르고 효율적인 경험을 제공합니다. 당신의 시간을 아껴드립니다.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: '완벽한 통합',
      description: '모든 기기에서 끊김 없이 연결되는 경험. 언제 어디서나 당신과 함께합니다.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-wide">
            최고의 사용자 경험을
            <br />
            <span className="text-blue-600">더 풍요롭게</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto tracking-wide">
            혁신과 디자인이 만나 당신의 삶을 변화시킵니다
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className="mb-6 text-blue-600 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
            <span>그리고 더 많은 기능들</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
          </div>
        </div>
      </div>
    </section>
  )
}

