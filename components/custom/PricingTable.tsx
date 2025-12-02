'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

interface PricingItem {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const pricingItems: PricingItem[] = [
  {
    name: '基础定制',
    price: '¥999',
    features: [
      '响应式设计',
      '基础功能实现',
      '1次修改机会',
      '7天交付周期',
    ],
  },
  {
    name: '标准定制',
    price: '¥2999',
    features: [
      '响应式设计',
      '完整功能实现',
      '3次修改机会',
      '14天交付周期',
      'SEO优化',
      '性能优化',
    ],
    popular: true,
  },
  {
    name: '高级定制',
    price: '¥5999',
    features: [
      '响应式设计',
      '完整功能实现',
      '无限修改机会',
      '21天交付周期',
      'SEO优化',
      '性能优化',
      '后台管理系统',
      '长期技术支持',
    ],
  },
];

export default function PricingTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {pricingItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card hover={true} className={item.popular ? 'ring-2 ring-warm-orange' : ''}>
            {item.popular && (
              <div className="bg-warm-orange text-white text-center py-2 text-sm font-semibold">
                最受欢迎
              </div>
            )}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-neutral-dark mb-2">{item.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-warm-orange">{item.price}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-warm-orange mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-gray">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

