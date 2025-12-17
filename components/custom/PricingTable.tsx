'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { div } from 'framer-motion/client';

interface PricingItem {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const pricingItems: PricingItem[] = [
  {
    name: '火花',
    price: '¥499',
    features: [
      '专注番茄钟+待办事项+邮箱',
      '戳戳乐',
      '商城（摆件*4，宠物*4， 背景*3）',
      '最多10名注册用户',
      '包含半年部署'
    ],
  },
  {
    name: '明灯',
    price: '¥888',
    features: [
      '上一级所有功能',
      '商城（摆件*12，宠物*12， 背景*8）',
      'ui/色系定制',
      '最多50名注册用户',
      '字卡/音乐盒/决策币/日记本',
      '包含3次内容更新',
    ],
    popular: false,
  },
  {
    name: '星体',
    price: '¥1299',
    features: [
      '上一级所有功能',
      '商品数量无限制',
      '定时邮件（生日/特殊节日）',
      '换装系统/皮肤系统',
      '包含6次内容更新',
    ],
  },
  {
    name: '增值服务',
    price: '¥？',
    features: [
      '半年后部署续费 - ¥9.9/月',
      '文案 - 根据需求定价',
      '定制功能 - 根据需求定价',
      '内容更新 - 还没想好先放着...'
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

