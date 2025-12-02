// 邮件发送逻辑
// 这里可以集成 Resend 或 EmailJS

export interface EmailData {
  name: string;
  email: string;
  message: string;
  service?: string;
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
  // TODO: 集成 Resend 或 EmailJS
  // 示例实现：
  
  try {
    // 这里应该调用实际的邮件服务
    // 例如：await resend.emails.send({ ... })
    
    console.log('Email would be sent:', data);
    
    return {
      success: true,
      message: '邮件发送成功！我们会尽快回复您。',
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      message: '邮件发送失败，请稍后重试。',
    };
  }
}

