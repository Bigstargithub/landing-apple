# 개발 가이드

이 문서는 애플 랜딩페이지 프로젝트의 개발, 커스터마이징, 배포에 대한 상세 가이드를 제공합니다.

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

Node.js가 설치되어 있지 않다면:
- [Node.js 공식 웹사이트](https://nodejs.org/)에서 LTS 버전을 다운로드하세요 (v18.17 이상 권장)

### 2. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인 가능합니다.

### 3. 코드 수정 시 자동 새로고침

Next.js는 Fast Refresh를 지원하므로 파일을 저장하면 자동으로 브라우저가 업데이트됩니다.

## 📝 주요 파일 설명

### 설정 파일

#### `.cursorrules`
프로젝트의 핵심 설정 파일입니다. 제품 정보, 타깃 사용자, 브랜드 에셋을 정의합니다.

```yaml
product:
  idea: "제품 아이디어"
  goal: "비즈니스 목표"
  user:
    target: "타깃 사용자"
    problem: "해결하려는 문제"
    desired_emotion: "원하는 감정"
  brand:
    logo: "/logo.png"
    video_url: "YouTube URL"
```

#### `tailwind.config.ts`
Tailwind CSS 설정. 색상, 폰트, 반응형 브레이크포인트 등을 커스터마이징할 수 있습니다.

### 컴포넌트 구조

#### `components/Hero.tsx`
- **역할**: 첫 화면 섹션
- **포함**: 로고, 메인 헤드라인, 서브 헤드라인, YouTube 영상, CTA 버튼
- **커스터마이징**: 헤드라인 텍스트, 버튼 링크, 영상 URL 수정 가능

#### `components/Features.tsx`
- **역할**: 제품/서비스의 핵심 가치 제안
- **포함**: 3개의 기능 카드 (아이콘, 제목, 설명)
- **커스터마이징**: `features` 배열에서 내용과 아이콘 수정

```typescript
const features = [
  {
    title: '제목',
    description: '설명',
    icon: <svg>...</svg>
  },
  // 더 추가 가능
]
```

#### `components/Proof.tsx`
- **역할**: 신뢰 요소 제공
- **포함**: 통계 수치, 파트너 배지, 사용자 후기
- **커스터마이징**: `stats` 배열 수정, 후기 내용 변경

#### `components/CTA.tsx`
- **역할**: 최종 행동 유도
- **포함**: 이메일 수집 폼, CTA 버튼, 신뢰 지표
- **커스터마이징**: 폼 액션, 버튼 텍스트, 배경색 수정

## 🎨 스타일 커스터마이징

### 색상 변경

`tailwind.config.ts`에서 색상 팔레트를 확장할 수 있습니다:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#...',
        100: '#...',
        // ... 900까지
      },
    },
  },
}
```

### 폰트 변경

`tailwind.config.ts`와 `app/globals.css`에서 폰트를 변경할 수 있습니다:

```typescript
// tailwind.config.ts
fontFamily: {
  sans: ['Pretendard', 'sans-serif'],
}
```

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700&display=swap');
```

### 애니메이션 추가

`app/globals.css`에 새로운 키프레임 애니메이션을 추가하세요:

```css
@keyframes customAnimation {
  from {
    /* 시작 상태 */
  }
  to {
    /* 종료 상태 */
  }
}
```

## 🔧 기능 추가

### 새 섹션 추가

1. `components/` 폴더에 새 컴포넌트 생성:

```tsx
// components/NewSection.tsx
export default function NewSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 내용 */}
      </div>
    </section>
  )
}
```

2. `app/page.tsx`에 임포트 및 추가:

```tsx
import NewSection from '@/components/NewSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <NewSection /> {/* 새 섹션 */}
      <Proof />
      <CTA />
    </main>
  )
}
```

### 폼 처리 추가

CTA 섹션의 폼에 실제 제출 로직을 추가하려면:

```tsx
// components/CTA.tsx
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const email = formData.get('email')
  
  // API 호출 또는 서비스 연동
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    })
    // 성공 처리
  } catch (error) {
    // 에러 처리
  }
}
```

## 📊 SEO 최적화

### 메타데이터 수정

`app/layout.tsx`에서 메타데이터를 수정하세요:

```typescript
export const metadata: Metadata = {
  title: '페이지 제목',
  description: '페이지 설명',
  keywords: ['키워드1', '키워드2'],
  openGraph: {
    title: 'OG 제목',
    description: 'OG 설명',
    images: ['/og-image.png'],
  },
}
```

### sitemap.xml 추가

`app/sitemap.ts` 파일을 생성하세요:

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

### robots.txt 추가

`app/robots.ts` 파일을 생성하세요:

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

## 🧪 테스트

### 반응형 테스트

1. **Chrome DevTools**: F12 → Device Toolbar (Ctrl+Shift+M)
2. 다양한 기기 프리셋으로 테스트:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

### 성능 테스트

```bash
# Lighthouse 실행
npm run build
npm start

# Chrome DevTools → Lighthouse 탭에서 "Generate report"
```

### 접근성 테스트

- [axe DevTools](https://www.deque.com/axe/devtools/) 확장 프로그램 사용
- 키보드로만 네비게이션 테스트 (Tab 키)
- 스크린 리더 테스트 (macOS VoiceOver: Cmd+F5)

## 🚢 배포

### Vercel (권장)

1. GitHub 리포지토리에 코드 푸시
2. [Vercel](https://vercel.com)에 가입
3. "New Project" → GitHub 리포지토리 선택
4. 환경 변수 설정 (필요시)
5. "Deploy" 클릭

### Netlify

1. `npm run build` 실행
2. Netlify에 가입
3. "Add new site" → "Deploy manually"
4. `.next` 폴더를 드래그 앤 드롭

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# 빌드 및 실행
docker build -t apple-landing .
docker run -p 3000:3000 apple-landing
```

## 🐛 트러블슈팅

### "Cannot find module" 에러

```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

### 이미지가 표시되지 않음

- `public/logo.png` 파일이 존재하는지 확인
- Next.js Image 컴포넌트의 `src` 경로가 올바른지 확인
- 개발 서버 재시작

### Tailwind 스타일이 적용되지 않음

- `tailwind.config.ts`의 `content` 배열 확인
- 클래스명 오타 확인
- 개발 서버 재시작

### YouTube 영상이 재생되지 않음

- 유효한 YouTube URL인지 확인
- 임베드 URL 형식 사용: `https://www.youtube.com/embed/VIDEO_ID`
- iframe의 `allow` 속성에 `autoplay` 포함 확인

## 📚 추가 리소스

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [React 공식 문서](https://react.dev/)

## 💡 베스트 프랙티스

1. **컴포넌트 분리**: 재사용 가능한 작은 컴포넌트로 분리
2. **타입 안정성**: TypeScript 타입을 명시적으로 정의
3. **성능 최적화**: 이미지는 Next.js Image 컴포넌트 사용
4. **접근성**: ARIA 속성과 시맨틱 HTML 사용
5. **반응형**: 모바일 우선 접근 방식
6. **SEO**: 메타데이터와 구조화된 데이터 추가
7. **코드 품질**: ESLint와 Prettier 사용

## 🤝 기여 방법

이 프로젝트는 `AGENTS.md`에 정의된 AI 에이전트 시스템을 따릅니다. 기여 시:

1. `.cursorrules` 파일의 규칙 준수
2. 사용자 중심의 카피라이팅
3. 애플 스타일의 미니멀한 디자인 유지
4. 반응형 디자인 필수
5. 접근성 기준 준수

---

**Happy Coding! 🎉**

