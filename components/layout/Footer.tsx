import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-warm-orange mb-4">Minkof.com</h3>
            <p className="text-neutral-gray">
             明昭的个人网站
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-gray hover:text-warm-orange transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-gray hover:text-warm-orange transition-colors">
                  日志
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-gray hover:text-warm-orange transition-colors">
                  联系我
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">联系方式</h4>
            <p className="text-neutral-gray">
              欢迎通过各个渠道联系我
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-gray text-center text-neutral-gray">
          <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

