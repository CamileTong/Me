import PricingTable from '@/components/custom/PricingTable';
import CustomForm from '@/components/custom/CustomForm';
import FeatureShowcase from '@/components/custom/FeatureShowcase';
import Image from 'next/image';

export default function CustomPage() {
  return (
    <div className="py-20 bg-gradient-to-br from-neutral-light to-warm-peach/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-neutral-dark mb-4">私人订制</h1>
          <p className="text-xl text-neutral-gray max-w-2xl mx-auto">
            想要oc/其他角色的陪伴网站吗？一月中旬起将开放订制^ ^
            <br />
            感兴趣可以填写<a href="#custom-form" className="text-blue-600 hover:text-blue-800 underline">意向表</a>&加入蹲蹲群
          </p>
          <div className="mt-6 flex justify-center">
            <Image
              src="/images/other/gc_qr.webp"
              alt="群聊二维码"
              width={240}
              height={240}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
        
        <FeatureShowcase />
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-dark mb-4">价格表</h2>
          <br />
          <PricingTable />
        </div>
        
        
        <div id="custom-form" className="max-w-3xl mx-auto">
          <CustomForm />
        </div>
      </div>
    </div>
  );
}

