import PricingTable from '@/components/custom/PricingTable';
import CustomForm from '@/components/custom/CustomForm';

export default function CustomPage() {
  return (
    <div className="py-20 bg-gradient-to-br from-neutral-light to-warm-peach/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-neutral-dark mb-4">私人订制</h1>
          <p className="text-xl text-neutral-gray max-w-2xl mx-auto">
            为您量身定制专业的网站和应用程序
          </p>
        </div>
        
        <PricingTable />
        
        <div className="max-w-3xl mx-auto">
          <CustomForm />
        </div>
      </div>
    </div>
  );
}

