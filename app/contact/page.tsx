import Link from 'next/link';
import { SocialLinks } from '@/types/social';
import socialData from '@/data/social.json';
import Card from '@/components/ui/Card';

const social = socialData as SocialLinks;

export default function ContactPage() {
  const socialLinks = [
    { key: 'email', label: '邮箱', icon: '✉️', href: `mailto:${social.email}` },
    { key: 'xiaohongshu', label: '小红书', icon: '📱', href: social.xiaohongshu },
    { key: 'qq', label: 'QQ', icon: '💬', href: social.qq ? `tencent://message/?uin=${social.qq}` : undefined },
    { key: 'github', label: 'GitHub', icon: '💻', href: social.github },
  ].filter(item => item.href);
  
  return (
    <div className="py-20 bg-gradient-to-br from-warm-orange/10 via-warm-yellow/10 to-warm-peach/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-neutral-dark mb-4">联系我</h1>
          <p className="text-xl text-neutral-gray">
            土豆土豆，我是地瓜。收到请回复
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {socialLinks.map((link) => (
            <Card key={link.key} hover={true}>
              <Link
                href={link.href || '#'}
                target={link.key === 'email' ? undefined : '_blank'}
                rel={link.key === 'email' ? undefined : 'noopener noreferrer'}
                className="block p-8 text-center"
              >
                <div className="text-5xl mb-4">{link.icon}</div>
                <h3 className="text-2xl font-bold text-neutral-dark mb-2">
                  {link.label}
                </h3>
                <p className="text-neutral-gray break-all">
                  {link.key === 'email' ? social.email : link.href}
                </p>
              </Link>
            </Card>
          ))}
        </div>
        
        <Card>
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-neutral-dark mb-4">
              或者填写定制申请表单
            </h2>
            <p className="text-neutral-gray mb-6">
              如果您有项目需求，可以前往私人订制页面填写申请表单
            </p>
            <Link href="/custom" className="inline-block">
              <button className="px-8 py-3 bg-warm-orange text-white rounded-lg font-semibold hover:bg-warm-red transition-colors">
                前往私人订制
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

