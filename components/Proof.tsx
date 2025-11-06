export default function Proof() {
  const stats = [
    { value: '10억+', label: '전 세계 사용자' },
    { value: '99%', label: '고객 만족도' },
    { value: '1위', label: '브랜드 가치' },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-gray-600 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-8">신뢰할 수 있는 파트너</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Placeholder trust badges - 실제로는 파트너사 로고 등을 넣을 수 있습니다 */}
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
              파트너 1
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
              파트너 2
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
              파트너 3
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
              파트너 4
            </div>
          </div>
        </div>

        {/* Testimonial - Optional */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <svg className="w-10 h-10 text-blue-600 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 italic">
              "이제까지 사용한 제품 중 가장 직관적이고 아름다워요. 
              기술이 이렇게 쉬울 수 있다는 걸 처음 알았습니다."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full" />
              <div>
                <div className="font-semibold text-gray-900">김민지</div>
                <div className="text-gray-500 text-sm">디자이너</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

