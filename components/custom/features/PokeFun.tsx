'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Bubble {
  id: number;
  text: string;
  x: number;
  y: number;
}

interface PokeFunProps {
  gif?: string;
  messages?: string[];
}

const defaultMessages = [
  '戳我干嘛！',
  '再戳试试？',
  '别戳了！',
  '好痒啊～',
  '哈哈哈哈哈',
  '继续戳！',
  '好玩吗？',
  '再来一次！',
];

export default function PokeFun({ 
  gif = '/images/features/poke-placeholder.gif',
  messages = defaultMessages 
}: PokeFunProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickTime = useRef<number>(0);

  const showBubble = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    // 防抖：300ms 内只响应一次
    if (now - lastClickTime.current < 300) {
      return;
    }
    lastClickTime.current = now;

    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 随机选择一条消息
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // 随机偏移位置（避免重叠）
    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;

    const newBubble: Bubble = {
      id: Date.now(),
      text: randomMessage,
      x: Math.max(20, Math.min(rect.width - 20, x + offsetX)),
      y: Math.max(20, Math.min(rect.height - 20, y + offsetY)),
    };

    setBubbles((prev) => [...prev, newBubble]);

    // 1.5秒后移除
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
    }, 1500);
  }, [messages]);

  return (
    <div
      ref={containerRef}
      onClick={showBubble}
      className="relative w-full h-full cursor-pointer select-none"
    >
      {/* GIF 占位符 */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-warm-orange/20 to-warm-yellow/20 rounded-lg">
        <div className="text-center">
          <div className="text-6xl mb-2">👆</div>
          <div className="text-xs text-neutral-gray">点击 GIF 区域</div>
        </div>
      </div>
      
      {/* 实际 GIF（当有图片时） */}
      {gif && gif !== '/images/features/poke-placeholder.gif' && (
        <div className="relative w-full h-full">
          <Image
            src={gif}
            alt="戳戳乐"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      )}

      {/* 文字泡 */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ opacity: 0, scale: 0.5, y: bubble.y }}
            animate={{ opacity: 1, scale: 1, y: bubble.y - 30 }}
            exit={{ opacity: 0, scale: 0.5, y: bubble.y - 50 }}
            transition={{ duration: 0.3 }}
            className="absolute pointer-events-none"
            style={{ left: bubble.x, top: bubble.y }}
          >
            <div className="bg-warm-yellow text-neutral-dark px-3 py-1.5 rounded-full text-sm font-medium shadow-lg whitespace-nowrap">
              {bubble.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

