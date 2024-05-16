import { connect } from '@/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: 'Logout Successful',
      success: 200
    })

    response.cookies.set('token', '', {
      httpOnly: false,
      expires: new Date(0)
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
