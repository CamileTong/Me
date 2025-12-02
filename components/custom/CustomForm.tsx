'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const formSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().optional(),
  service: z.string().min(1, '请选择服务类型'),
  message: z.string().min(10, '请至少输入10个字符描述您的需求'),
});

type FormData = z.infer<typeof formSchema>;

export default function CustomForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        reset();
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: '提交失败，请稍后重试' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <div className="p-8">
        <h2 className="text-3xl font-bold text-neutral-dark mb-6">定制申请</h2>
        
        {submitStatus && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {submitStatus.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-2">
              姓名 <span className="text-warm-red">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-warm-red">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-2">
              邮箱 <span className="text-warm-red">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-warm-red">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-dark mb-2">
              电话（可选）
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className="w-full px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange"
            />
          </div>
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-neutral-dark mb-2">
              服务类型 <span className="text-warm-red">*</span>
            </label>
            <select
              id="service"
              {...register('service')}
              className="w-full px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange"
            >
              <option value="">请选择服务类型</option>
              <option value="基础定制">基础定制</option>
              <option value="标准定制">标准定制</option>
              <option value="高级定制">高级定制</option>
              <option value="其他">其他</option>
            </select>
            {errors.service && (
              <p className="mt-1 text-sm text-warm-red">{errors.service.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-dark mb-2">
              需求描述 <span className="text-warm-red">*</span>
            </label>
            <textarea
              id="message"
              rows={6}
              {...register('message')}
              className="w-full px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange resize-none"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-warm-red">{errors.message.message}</p>
            )}
          </div>
          
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? '提交中...' : '提交申请'}
          </Button>
        </form>
      </div>
    </Card>
  );
}

