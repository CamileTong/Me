'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const formSchema = z.object({
  name: z.string().min(1, '你的名字是————'),
  qq: z.string().min(1, '请输入QQ号'),
  requirement: z.enum(['火花', '明灯', '星体', '其他'], {
    errorMap: () => ({ message: '请选择意向需求' }),
  }),
  artAcknowledged: z.literal('我已知悉', {
    errorMap: () => ({ message: '请确认' }),
  }),
  characterIntro: z.string().min(10, '至少输入10个字符'),
  questions: z.string().optional(),
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
        <h2 className="text-3xl font-bold text-neutral-dark mb-6">定制意向表</h2>
        <p className="text-neutral-gray mb-6">
        ！！必读须知！！
        <br />
        1. 我只提供程序和部署，不提供美术部分。所有美术（人物主图，商品图，背景图）需要自带！
        <br />
        2. 精力有限会挑客户，投递不代表一定能合作(｡ ́︿ ̀｡)无论成功与否都会在回复中告知
        <br />
        3. 不接mhy和1999相关
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-2">
              怎么称呼你？ <span className="text-warm-red">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange"
              placeholder="请输入您的称呼"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="qq" className="block text-sm font-medium text-neutral-dark mb-2">
              QQ <span className="text-warm-red">*</span>
            </label>
            <input
              type="text"
              id="qq"
              {...register('qq')}
              className="w-full px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange"
              placeholder="请输入QQ号"
            />
            {errors.qq && (
              <p className="mt-1 text-sm text-red-600">{errors.qq.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="requirement" className="block text-sm font-medium text-neutral-dark mb-2">
              意向需求 <span className="text-warm-red">*</span>
            </label>
            <select
              id="requirement"
              {...register('requirement')}
              className="w-full px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange"
            >
              <option value="">请选择意向需求</option>
              <option value="火花">火花</option>
              <option value="明灯">明灯</option>
              <option value="星体">星体</option>
              <option value="其他">其他</option>
            </select>
            {errors.requirement && (
              <p className="mt-1 text-sm text-red-600">{errors.requirement.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              定制不包含美术。所有美术部分需自带： <span className="text-warm-red">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="我已知悉"
                  {...register('artAcknowledged')}
                  className="mr-2"
                />
                <span className="text-neutral-dark">我已知悉</span>
              </label>
            </div>
            {errors.artAcknowledged && (
              <p className="mt-1 text-sm text-red-600">{errors.artAcknowledged.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="characterIntro" className="block text-sm font-medium text-neutral-dark mb-2">
              简单介绍一下想约的角色吧！ <span className="text-warm-red">*</span>
            </label>
            <textarea
              id="characterIntro"
              rows={6}
              {...register('characterIntro')}
              className="w-full px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange resize-none"
              placeholder="请详细描述您想约的角色..."
            />
            {errors.characterIntro && (
              <p className="mt-1 text-sm text-red-600">{errors.characterIntro.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="questions" className="block text-sm font-medium text-neutral-dark mb-2">
              有任何疑问可以写在这里：
            </label>
            <textarea
              id="questions"
              rows={4}
              {...register('questions')}
              className="w-full px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange resize-none"
              placeholder="选填，如有疑问请在此填写..."
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? '提交中...' : '提交申请'}
          </Button>
        </form>
        
        {submitStatus && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </div>
    </Card>
  );
}

