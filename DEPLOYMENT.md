# 배포 가이드

애플 랜딩페이지를 프로덕션 환경에 배포하는 방법을 안내합니다.

## 📋 배포 전 체크리스트

배포하기 전에 다음 사항을 확인하세요:

- ✅ 로컬에서 테스트 완료 (`npm run build` 성공)
- ✅ Google Sheets 연동 테스트 완료
- ✅ 환경 변수 준비 완료 (`.env.local` 파일)
- ✅ 로고 파일 준비 완료 (`public/logo.png`)
- ✅ Git 저장소 준비 (GitHub, GitLab 등)

## 🚀 배포 옵션

### 옵션 1: Vercel (권장) ⭐

Next.js 프레임워크를 만든 회사의 호스팅 플랫폼으로, 가장 간단하고 빠른 배포 방법입니다.

#### 장점
- ✅ 무료 플랜 제공
- ✅ 자동 빌드 및 배포
- ✅ 커밋 시 자동 배포
- ✅ Preview 배포 지원
- ✅ CDN 및 Edge Network
- ✅ 환경 변수 관리 UI

#### 배포 단계

##### 1. GitHub에 코드 푸시

```bash
# Git 초기화 (아직 안 했다면)
git init

# .gitignore 확인 (.env.local은 제외됨)
cat .gitignore

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Apple landing page"

# GitHub에 리포지토리 생성 후 연결
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

##### 2. Vercel 계정 생성 및 프로젝트 연결

1. [Vercel](https://vercel.com) 접속
2. **GitHub로 가입/로그인**
3. **Add New** → **Project** 클릭
4. **Import Git Repository** 에서 저장소 선택
5. **Import** 클릭

##### 3. 프로젝트 설정

**Framework Preset**: Next.js (자동 감지됨)

**Root Directory**: `./` (기본값)

**Build Command**: `npm run build` (기본값)

**Output Directory**: `.next` (기본값)

##### 4. 환경 변수 설정

**Environment Variables** 섹션에서 다음 변수들을 추가:

```bash
# 변수 이름: GOOGLE_CLIENT_EMAIL
# 값: your-service-account@your-project.iam.gserviceaccount.com

# 변수 이름: GOOGLE_PRIVATE_KEY
# 값: "-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
# ⚠️ 주의: 큰따옴표 포함, \n은 실제 줄바꿈이 아님

# 변수 이름: GOOGLE_SHEET_ID
# 값: your-spreadsheet-id
```

**중요:** 
- Production, Preview, Development 모두 체크
- `GOOGLE_PRIVATE_KEY`는 전체 문자열을 그대로 복사 (큰따옴표 포함)

##### 5. 배포 시작

**Deploy** 버튼 클릭!

배포가 완료되면:
- ✅ 프로덕션 URL 제공 (예: `your-project.vercel.app`)
- ✅ 자동 HTTPS 적용
- ✅ 글로벌 CDN 배포

##### 6. 커스텀 도메인 설정 (선택사항)

1. Vercel 프로젝트 대시보드 → **Settings** → **Domains**
2. **Add** 클릭
3. 도메인 입력 (예: `apple-landing.com`)
4. DNS 설정 안내에 따라 설정
5. 자동 SSL 인증서 발급

#### Vercel CLI로 배포 (선택사항)

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

---

### 옵션 2: Netlify

#### 배포 단계

##### 1. Netlify 계정 생성

1. [Netlify](https://netlify.com) 접속
2. **GitHub로 가입/로그인**

##### 2. 새 사이트 생성

1. **Add new site** → **Import an existing project**
2. **GitHub** 선택
3. 저장소 선택
4. 배포 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Functions directory**: 비워두기

##### 3. 환경 변수 설정

**Site settings** → **Environment variables**

```bash
GOOGLE_CLIENT_EMAIL=your-service-account@...
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-spreadsheet-id
```

##### 4. Next.js 런타임 플러그인 설치

`netlify.toml` 파일 생성:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

package.json에 추가:

```bash
npm install -D @netlify/plugin-nextjs
```

##### 5. 재배포

변경사항을 푸시하면 자동으로 재배포됩니다.

---

### 옵션 3: AWS Amplify

#### 배포 단계

##### 1. AWS 계정 생성

[AWS Amplify Console](https://console.aws.amazon.com/amplify/) 접속

##### 2. 새 앱 호스팅

1. **New app** → **Host web app**
2. **GitHub** 선택 및 저장소 연결
3. 빌드 설정 확인:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

##### 3. 환경 변수 설정

**Environment variables** 탭에서 추가

##### 4. 배포

**Save and deploy** 클릭

---

### 옵션 4: Docker + 커스텀 서버

자체 서버나 클라우드 VM에 배포하는 경우

#### Dockerfile 생성

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# 의존성 설치
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# 빌드
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 프로덕션 이미지
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### next.config.js 수정

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = nextConfig
```

#### 빌드 및 실행

```bash
# 이미지 빌드
docker build -t apple-landing-page .

# 컨테이너 실행
docker run -p 3000:3000 \
  -e GOOGLE_CLIENT_EMAIL="your-email" \
  -e GOOGLE_PRIVATE_KEY="your-key" \
  -e GOOGLE_SHEET_ID="your-id" \
  apple-landing-page
```

#### docker-compose.yml (선택사항)

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - GOOGLE_CLIENT_EMAIL=${GOOGLE_CLIENT_EMAIL}
      - GOOGLE_PRIVATE_KEY=${GOOGLE_PRIVATE_KEY}
      - GOOGLE_SHEET_ID=${GOOGLE_SHEET_ID}
    restart: unless-stopped
```

실행:
```bash
docker-compose up -d
```

---

## 🔒 보안 체크리스트

배포 전 보안 사항을 확인하세요:

### 환경 변수
- ✅ `.env.local` 파일이 Git에 커밋되지 않았는지 확인
- ✅ `.gitignore`에 `.env*.local` 포함 확인
- ✅ 프로덕션 환경 변수가 안전하게 설정되었는지 확인

### API 보안
- ✅ Google Service Account의 권한이 최소화되어 있는지 확인
- ✅ Google Sheets가 Service Account에만 공유되어 있는지 확인
- ✅ Private Key가 절대 노출되지 않도록 관리

### Next.js 보안
- ✅ API 라우트에서 입력 검증 구현 (이메일 유효성 검사)
- ✅ Rate limiting 고려 (필요 시)
- ✅ CORS 설정 확인

---

## 📊 배포 후 확인사항

배포가 완료되면 다음 사항들을 테스트하세요:

### 1. 기본 기능 테스트
- [ ] 페이지가 정상적으로 로드되는가?
- [ ] 로고가 표시되는가?
- [ ] YouTube 영상이 재생되는가?
- [ ] 모든 섹션이 정상적으로 표시되는가?

### 2. 반응형 테스트
- [ ] 모바일 (375px)
- [ ] 태블릿 (768px)
- [ ] 데스크탑 (1920px)

### 3. 이메일 수집 기능
- [ ] 이메일 입력 후 제출 가능한가?
- [ ] 성공 메시지가 표시되는가?
- [ ] Google Sheets에 데이터가 저장되는가?
- [ ] 에러 처리가 올바른가?

### 4. 성능 테스트
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) 테스트
- [ ] Lighthouse 점수 확인
  - Performance: 90+ 목표
  - Accessibility: 90+ 목표
  - Best Practices: 90+ 목표
  - SEO: 90+ 목표

### 5. SEO 확인
- [ ] 메타 태그가 올바르게 설정되었는가?
- [ ] Open Graph 이미지가 표시되는가?
- [ ] robots.txt 접근 가능한가?

---

## 🔄 CI/CD 자동화

### GitHub Actions (선택사항)

`.github/workflows/deploy.yml` 생성:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          GOOGLE_CLIENT_EMAIL: ${{ secrets.GOOGLE_CLIENT_EMAIL }}
          GOOGLE_PRIVATE_KEY: ${{ secrets.GOOGLE_PRIVATE_KEY }}
          GOOGLE_SHEET_ID: ${{ secrets.GOOGLE_SHEET_ID }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📈 모니터링 및 분석

### Google Analytics 추가 (선택사항)

`app/layout.tsx`에 추가:

```typescript
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Vercel Analytics

Vercel을 사용하는 경우:

```bash
npm install @vercel/analytics

# app/layout.tsx에 추가
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 🐛 트러블슈팅

### 배포 실패

#### "Build failed" 에러
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 메시지 확인 및 수정
```

#### "Module not found" 에러
```bash
# package-lock.json 재생성
rm -rf node_modules package-lock.json
npm install

# 다시 빌드
npm run build
```

### 환경 변수 문제

#### "Cannot read environment variable"
- 환경 변수가 올바르게 설정되었는지 확인
- 변수 이름에 오타가 없는지 확인
- Vercel/Netlify 대시보드에서 재확인

#### Private Key 관련 에러
- `GOOGLE_PRIVATE_KEY`가 큰따옴표로 감싸져 있는지 확인
- `\n`이 실제 줄바꿈이 아닌 문자열인지 확인
- 전체 키가 포함되어 있는지 확인 (BEGIN ~ END)

### 성능 문제

#### 느린 로딩
- 이미지 최적화 확인 (Next.js Image 사용)
- CDN 캐싱 확인
- 불필요한 JavaScript 제거

#### YouTube 영상 로딩 느림
- `loading="lazy"` 속성 추가 고려
- 썸네일 우선 로드 후 클릭 시 재생 방식 고려

---

## 📝 배포 체크리스트 요약

### 배포 전
- [ ] 로컬 테스트 완료
- [ ] 프로덕션 빌드 성공 (`npm run build`)
- [ ] 환경 변수 준비
- [ ] Git 저장소 준비
- [ ] `.gitignore` 확인

### 배포 중
- [ ] 호스팅 플랫폼 선택 (Vercel 권장)
- [ ] 리포지토리 연결
- [ ] 환경 변수 설정
- [ ] 빌드 설정 확인
- [ ] 배포 시작

### 배포 후
- [ ] 프로덕션 URL 접속 확인
- [ ] 모든 기능 테스트
- [ ] Google Sheets 연동 테스트
- [ ] 반응형 테스트
- [ ] 성능 테스트 (Lighthouse)
- [ ] 커스텀 도메인 설정 (선택)
- [ ] 모니터링 설정 (선택)

---

## 🎉 배포 완료!

축하합니다! 애플 랜딩페이지가 성공적으로 배포되었습니다.

### 다음 단계
- 📊 사용자 피드백 수집
- 📈 Google Analytics로 트래픽 분석
- 🔄 지속적인 개선 및 업데이트
- 📧 수집된 이메일로 마케팅 시작

### 유용한 링크
- [Next.js 배포 문서](https://nextjs.org/docs/deployment)
- [Vercel 문서](https://vercel.com/docs)
- [Web.dev 성능 가이드](https://web.dev/performance/)

---

**문제가 발생하면 다음 문서를 참고하세요:**
- `README.md` - 프로젝트 개요
- `DEVELOPMENT.md` - 개발 가이드
- `GOOGLE_SHEETS_SETUP.md` - Google Sheets 설정

Happy Deploying! 🚀

