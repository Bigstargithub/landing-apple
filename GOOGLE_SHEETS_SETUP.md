# Google Sheets 연동 설정 가이드

이메일 주소를 Google Sheets에 자동으로 저장하기 위한 설정 가이드입니다.

## 📋 사전 준비

- Google 계정
- Google Cloud Console 접근 권한

## 🔧 설정 단계

### 1. Google Cloud Console 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. 프로젝트 이름: `apple-landing-page` (원하는 이름)

### 2. Google Sheets API 활성화

1. 좌측 메뉴 → **API 및 서비스** → **라이브러리**
2. "Google Sheets API" 검색
3. **사용 설정** 클릭

### 3. Service Account 생성

1. 좌측 메뉴 → **API 및 서비스** → **사용자 인증 정보**
2. **사용자 인증 정보 만들기** → **서비스 계정**
3. 서비스 계정 세부정보 입력:
   - 이름: `sheets-api-service`
   - ID: 자동 생성
   - 설명: `Landing page email collection`
4. **만들기 및 계속** 클릭
5. 역할 선택: **편집자** (선택사항)
6. **완료** 클릭

### 4. Service Account 키 생성

1. 생성한 서비스 계정 클릭
2. **키** 탭 선택
3. **키 추가** → **새 키 만들기**
4. 키 유형: **JSON** 선택
5. **만들기** 클릭
6. JSON 파일이 다운로드됩니다 (안전하게 보관!)

### 5. Google Sheets 생성 및 공유

1. [Google Sheets](https://sheets.google.com) 접속
2. 새 스프레드시트 생성
3. 시트 이름: **Sheet1** (기본값 사용)
4. 첫 번째 행에 헤더 추가 (선택사항):
   - A1: `이메일`
   - B1: `등록 날짜`

5. **공유** 버튼 클릭
6. 다운로드한 JSON 파일의 `client_email` 값을 복사
   ```json
   {
     "client_email": "sheets-api-service@your-project.iam.gserviceaccount.com"
   }
   ```
7. 이 이메일 주소로 스프레드시트 공유 (편집자 권한)

### 6. 환경 변수 설정

1. 프로젝트 루트에 `.env.local` 파일 생성:

```bash
cp .env.local.example .env.local
```

2. 다운로드한 JSON 파일에서 값 복사:

```bash
# .env.local
GOOGLE_CLIENT_EMAIL=sheets-api-service@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n실제_프라이빗_키_내용\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1abc123xyz456
```

**중요:**
- `GOOGLE_PRIVATE_KEY`는 JSON 파일의 `private_key` 값을 그대로 복사 (큰따옴표 포함)
- `GOOGLE_SHEET_ID`는 스프레드시트 URL의 ID 부분
  - URL 예시: `https://docs.google.com/spreadsheets/d/1abc123xyz456/edit`
  - ID: `1abc123xyz456`

### 7. 개발 서버 재시작

환경 변수를 적용하려면 서버를 재시작해야 합니다:

```bash
# 현재 실행 중인 서버 중지 (Ctrl+C 또는 프로세스 종료)
kill $(lsof -ti:3000)

# 서버 재시작
npm run dev
```

## ✅ 테스트

1. 브라우저에서 http://localhost:3000 접속
2. CTA 섹션의 이메일 폼에 이메일 주소 입력
3. **시작하기** 버튼 클릭
4. 성공 메시지 확인
5. Google Sheets에서 데이터 확인

## 🔍 데이터 구조

스프레드시트에 저장되는 데이터:

| 이메일 (A열) | 등록 날짜 (B열) |
|-------------|----------------|
| user@example.com | 2025. 11. 6. 오후 5:30:00 |
| test@test.com | 2025. 11. 6. 오후 5:35:00 |

## 🐛 트러블슈팅

### "Google Sheet ID가 설정되지 않았습니다" 에러

- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- `GOOGLE_SHEET_ID` 값이 올바른지 확인
- 서버를 재시작했는지 확인

### "권한이 없습니다" 에러

- Service Account 이메일로 스프레드시트를 공유했는지 확인
- 편집자 권한으로 공유했는지 확인

### "Invalid credentials" 에러

- `GOOGLE_CLIENT_EMAIL`이 올바른지 확인
- `GOOGLE_PRIVATE_KEY`가 완전한 키인지 확인 (시작과 끝 포함)
- JSON 파일에서 다시 복사

### Private Key 포맷 문제

Private key는 다음과 같은 형식이어야 합니다:

```
"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...(생략)...==\n-----END PRIVATE KEY-----\n"
```

- `\n`은 실제 줄바꿈이 아닌 문자열입니다
- 큰따옴표로 감싸야 합니다

## 🔒 보안

**중요:** 
- `.env.local` 파일은 절대 Git에 커밋하지 마세요!
- `.gitignore`에 이미 포함되어 있습니다
- JSON 키 파일은 안전한 곳에 보관하세요
- 프로덕션 배포 시에는 환경 변수를 호스팅 플랫폼에 안전하게 설정하세요

## 🚀 프로덕션 배포

### Vercel

1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 다음 환경 변수 추가:
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
4. 재배포

### 기타 플랫폼

각 플랫폼의 환경 변수 설정 방법을 참고하여 동일하게 설정하세요.

## 📊 데이터 활용

수집된 이메일 데이터는 다음과 같이 활용할 수 있습니다:

- 뉴스레터 발송
- 제품 출시 알림
- 마케팅 캠페인
- 사용자 분석

**참고:** 개인정보 보호법을 준수하여 사용자 동의를 받고 데이터를 처리하세요.

---

설정이 완료되었습니다! 🎉

