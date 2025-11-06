import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    // Google Sheets API 설정
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
      throw new Error('Google Sheet ID가 설정되지 않았습니다.')
    }

    // 현재 날짜와 시간
    const timestamp = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    })

    // 시트에 데이터 추가
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:B', // 시트 이름과 범위 (A열: 이메일, B열: 날짜)
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, timestamp]],
      },
    })

    return NextResponse.json(
      { message: '성공적으로 등록되었습니다!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Google Sheets API 에러:', error)
    return NextResponse.json(
      { error: '등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}

