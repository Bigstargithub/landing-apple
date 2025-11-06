import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 opacity-90 hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/logo.png"
              alt="Apple Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-gray-900 mb-6 leading-tight tracking-wider">
          혁신적인 기술로
          <br />
          <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            일상을 바꾸다
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed tracking-wide">
          복잡하고 직관적이지 않은 기술은 이제 그만.
          <br />
          간편하고 아름다운 기술을 경험하세요.
        </p>

        {/* Video Section */}
        <div className="mb-12 max-w-5xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
              src="https://www.youtube.com/embed/XOBE3FCyaqU?autoplay=1&mute=1&loop=1&playlist=XOBE3FCyaqU&controls=0&showinfo=0&rel=0&modestbranding=1"
              title="Apple Product Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#cta"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            지금 시작하기
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-blue-600 bg-transparent hover:bg-blue-50 rounded-full transition-all duration-300 border-2 border-blue-600"
          >
            더 알아보기
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}

