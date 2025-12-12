import { Resend } from 'resend';
import socialData from '@/data/social.json';

export interface EmailData {
  name: string;
  qq: string;
  requirement: string;
  artAcknowledged: string;
  characterIntro: string;
  questions?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return {
        success: false,
        message: '邮件服务未配置，请稍后重试。',
      };
    }

    const recipientEmail = socialData.email || 'minkof777@gmail.com';

    const emailContent = `
      <h2>新的定制申请</h2>
      <p><strong>称呼：</strong>${data.name}</p>
      <p><strong>QQ：</strong>${data.qq}</p>
      <p><strong>意向需求：</strong>${data.requirement}</p>
      <p><strong>美术确认：</strong>${data.artAcknowledged}</p>
      <p><strong>角色介绍：</strong></p>
      <p>${data.characterIntro.replace(/\n/g, '<br>')}</p>
      ${data.questions ? `<p><strong>疑问：</strong></p><p>${data.questions.replace(/\n/g, '<br>')}</p>` : ''}
    `;

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: recipientEmail,
      replyTo: recipientEmail,
      subject: `定制申请 - ${data.name} (${data.requirement})`,
      html: emailContent,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return {
        success: false,
        message: '邮件发送失败，请稍后重试。',
      };
    }

    return {
      success: true,
      message: '邮件发送成功！感谢投递，我会尽快回复^^',
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      message: '邮件发送失败，请稍后重试。',
    };
  }
}

