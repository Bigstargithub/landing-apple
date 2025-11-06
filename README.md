# Apple 랜딩페이지

혁신적인 기술로 일상을 바꾸는 애플의 제품들을 소개하는 현대적인 랜딩페이지입니다.

## 🎯 프로젝트 개요

이 프로젝트는 애플 스타일의 미니멀하고 세련된 디자인으로 구축된 반응형 랜딩페이지입니다. Next.js 14, TypeScript, Tailwind CSS를 사용하여 최고의 사용자 경험을 제공합니다.

**추가 기능**: 이메일 수집 폼이 Google Sheets와 연동되어 자동으로 데이터를 저장합니다.

## ✨ 주요 기능

- **Hero 섹션**: 로고, 메인 헤드라인, YouTube 영상 임베드, CTA 버튼
- **Features 섹션**: 3개의 핵심 가치 제안 카드 (직관적인 디자인, 혁신적인 기술, 완벽한 통합)
- **Proof 섹션**: 통계, 신뢰 배지, 사용자 후기
- **CTA 섹션**: 이메일 수집 폼과 명확한 행동 유도
- **Footer**: 링크, 소셜 미디어, 저작권 정보

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Apple 시스템 폰트 (-apple-system, SF Pro Display)
- **Video**: YouTube iframe 임베드

## 📦 설치 및 실행

### 사전 요구사항

- Node.js 18.17 이상
- npm 또는 yarn
- Google Cloud Console 계정 (이메일 수집 기능 사용 시)

### 설치

```bash
# 의존성 설치
npm install

# 또는
yarn install

# 환경 변수 설정 (Google Sheets 연동 시)
cp .env.example .env.local
# .env.local 파일을 열어 실제 값으로 수정
```

**Google Sheets 연동 설정**: 자세한 내용은 [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)를 참고하세요.

### 개발 서버 실행

```bash
# 개발 모드로 실행
npm run dev

# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 프로덕션 빌드

```bash
# 프로덕션 빌드 생성
npm run build

# 프로덕션 서버 시작
npm start
```

## 📁 프로젝트 구조

```
/Users/eddie-insaeng/vibecoding-test2/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (메타데이터, 글로벌 설정)
│   ├── page.tsx            # 메인 랜딩페이지
│   └── globals.css         # Tailwind + 커스텀 스타일
├── components/
│   ├── Hero.tsx            # 히어로 섹션
│   ├── Features.tsx        # 기능 소개 섹션
│   ├── Proof.tsx           # 신뢰 요소 섹션
│   └── CTA.tsx             # 행동 유도 섹션
├── public/
│   └── logo.png            # 애플 로고
├── .cursorrules            # 프로젝트 설정 및 브랜드 가이드
├── AGENTS.md               # AI 에이전트 역할 정의
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🎨 디자인 원칙

이 프로젝트는 `.cursorrules` 파일에 정의된 다음 원칙을 따릅니다:

- **사용자 중심**: 모든 문장은 사용자의 입장에서 작성
- **명확성**: 기술 설명보다 '이 페이지를 통해 무엇을 얻는가'를 강조
- **단순성**: 복잡한 기능 대신 시각적으로 명확한 구조 유지
- **일관성**: CTA는 페이지 내에서 한 가지로 통일
- **접근성**: 한눈에 이해되는 문장과 이미지로 전달

## 🎯 스타일 가이드

- **톤**: 간결하고 따뜻한 한국어, 누구나 이해할 수 있는 표현
- **디자인**: 깔끔하고 집중도 높은 단일 화면, 여백과 대비를 충분히 활용
- **색상**: 다크/라이트 중립적인 깔끔한 색상 (회색, 흰색, 검정, 블루 악센트)
- **타이포그래피**: 애플 특유의 넓은 여백과 타이포그래피 강조

## 📱 반응형 디자인

- **모바일** (< 640px): 최적화된 터치 인터페이스
- **태블릿** (641px - 1024px): 균형잡힌 레이아웃
- **데스크탑** (> 1025px): 넓은 화면에 최적화

## 🔧 커스터마이징

### 브랜드 정보 변경

`.cursorrules` 파일에서 제품 정보, 타깃 사용자, 브랜드 에셋을 수정하세요:

```yaml
product:
  idea: "혁신적인 기술로 일상을 바꾸는 애플의 제품들"
  goal: "최고의 사용자 경험을 통해 삶을 더 풍요롭게"
  brand:
    logo: "/logo.png"
    video_url: "https://www.youtube.com/watch?v=XOBE3FCyaqU"
```

### 로고 변경

`/public/logo.png` 파일을 원하는 로고로 교체하세요.

### 영상 변경

`.cursorrules` 파일의 `video_url`을 수정하고, `components/Hero.tsx`에서 YouTube URL을 업데이트하세요.

## 🚀 배포

프로덕션 배포에 대한 자세한 가이드는 **[DEPLOYMENT.md](./DEPLOYMENT.md)**를 참고하세요.

### 빠른 배포 (Vercel)

```bash
# 1. GitHub에 코드 푸시
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Vercel 사이트에서 GitHub 리포지토리 연결
# 3. 환경 변수 설정
# 4. Deploy 버튼 클릭!
```

### 지원 플랫폼

- ⭐ **Vercel** (권장) - 무료, 자동 배포, CDN
- **Netlify** - 무료, GitHub 연동
- **AWS Amplify** - AWS 통합
- **Docker** - 자체 서버 배포

## 📄 라이선스

이 프로젝트는 교육 및 데모 목적으로 제작되었습니다.

## 🤝 기여

이 프로젝트는 `.cursorrules`와 `AGENTS.md`에 정의된 AI 에이전트 시스템을 따릅니다:

1. **Planner**: 요구사항을 랜딩페이지 구조로 변환
2. **UI Builder**: Next.js + Tailwind 컴포넌트 생성
3. **Copy Refiner**: 문구 개선
4. **QA Reviewer**: 품질 점검
5. **Release Manager**: 배포 관리

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ using Next.js 14 + Tailwind CSS**

