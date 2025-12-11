import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, qq, requirement, artAcknowledged, characterIntro, questions } = body;
    
    // 基本验证
    if (!name || !qq || !requirement || !artAcknowledged || !characterIntro) {
      return NextResponse.json(
        { success: false, message: '请填写所有必填字段' },
        { status: 400 }
      );
    }
    
    // 发送邮件
    const result = await sendEmail({
      name,
      qq,
      requirement,
      artAcknowledged,
      characterIntro,
      questions: questions || undefined,
    });
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 500 });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}

