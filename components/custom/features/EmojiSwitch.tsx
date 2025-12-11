'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface EmojiSwitchProps {
  gif1?: string;
  gif2?: string;
  gif1Duration?: number; // GIF1 播放时长（毫秒）
  gif2Duration?: number; // GIF2 播放时长（毫秒）
}

interface Bubble {
  id: string;
  text: string;
}

interface EmojiBubbleProps {
  text: string;
  onComplete: () => void;
}

// 检测是否为 emoji（如果包含中文字符则认为是文字，否则检查是否包含 emoji 字符）
function isEmoji(text: string): boolean {
  // 如果包含中文字符，认为是文字
  if (/[\u4e00-\u9fa5]/.test(text)) {
    return false;
  }
  
  // 检测是否包含 emoji 字符（主要 emoji 范围）
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  return emojiRegex.test(text);
}

function EmojiBubble({ text, onComplete }: EmojiBubbleProps) {
  const isEmojiContent = useMemo(() => isEmoji(text), [text]);
  
  useEffect(() => {
    // 停留 1.5 秒后触发消失（包括出现动画时间）
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.8 }}
      animate={{ opacity: 1, y: -60, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.8 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      className="absolute top-[35%] right-[60%] pointer-events-none z-50"
    >
      {/* 对话气泡 */}
      <div className="relative">
        {/* 气泡主体 */}
        <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 ${
          isEmojiContent ? 'px-4 py-3' : 'px-3 py-2'
        }`}>
          <div className={isEmojiContent ? 'text-2xl' : 'text-base font-medium whitespace-nowrap'}>
            {text}
          </div>
        </div>
        {/* 小尾巴（指向右方） */}
        <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-t-[8px] border-b-[8px] border-l-[10px] border-t-transparent border-b-transparent border-l-white/95"></div>
      </div>
    </motion.div>
  );
}

// 文字泡内容列表（placeholder）
const TEXT_LIST = [
  '嗨甜心^^', '呜哇好痛', '轻一点戳啦', '^^', '你好你好', '请戳请戳', '好玩吗？',
  '嗨甜心^^', '呜哇好痛', '轻一点戳啦', '^^', '你好你好', '请戳请戳','好玩吗？',
  '🙂','🎵','🙄','😏','😎','🥺','🖕','🍷'
];

export default function EmojiSwitch({
  gif1 = '/images/features/emoji1-placeholder.gif',
  gif2 = '/images/features/emoji2-placeholder.gif',
  gif1Duration = 2000,
  gif2Duration = 3000,
}: EmojiSwitchProps) {
  const [currentGif, setCurrentGif] = useState<'gif1' | 'gif2'>('gif1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleDoubleClick = () => {
    // 只有在显示 GIF1 且未播放时才能切换
    if (currentGif === 'gif1' && !isPlaying) {
      // 切换到 GIF2
      setCurrentGif('gif2');
      setIsPlaying(true);

      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // GIF2 播放完成后切回 GIF1
      timeoutRef.current = setTimeout(() => {
        setCurrentGif('gif1');
        setIsPlaying(false);
      }, gif2Duration);
    }
  };

  const handleGifLoad = () => {
    // GIF 加载完成后的处理
    if (currentGif === 'gif2' && isPlaying) {
      // 如果 GIF2 加载完成，设置定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCurrentGif('gif1');
        setIsPlaying(false);
      }, gif2Duration);
    }
  };

  // 阻止右键菜单
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // 阻止拖拽
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 处理单击事件，显示文字泡
  const handleClick = useCallback(() => {
    // 防抖：清除之前的定时器
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    // 设置新的定时器
    debounceTimerRef.current = setTimeout(() => {
      // 随机选择一个文字
      const randomIndex = Math.floor(Math.random() * TEXT_LIST.length);
      const randomText = TEXT_LIST[randomIndex];
      
      // 确保文字存在（类型安全）
      if (!randomText) return;
      
      // 创建新气泡
      const newBubble: Bubble = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        text: randomText,
      };
      setBubbles((prev) => [...prev, newBubble]);
    }, 600); // 600ms 防抖延迟
  }, []);

  // 处理气泡完成（消失）的回调
  const handleBubbleComplete = useCallback((bubbleId: string) => {
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== bubbleId));
  }, []);

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      className="relative w-full h-full cursor-pointer select-none flex items-center justify-center"
    >
      {/* GIF1 占位符 */}
      {currentGif === 'gif1' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-warm-peach/20 to-warm-coral/20 rounded-lg">
          <div className="text-center">
            <div className="text-6xl mb-2">😊</div>
            <div className="text-xs text-neutral-gray">双击切换表情</div>
          </div>
        </div>
      )}

      {/* GIF2 占位符 */}
      {currentGif === 'gif2' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-warm-yellow/20 to-warm-orange/20 rounded-lg">
          <div className="text-center">
            <div className="text-6xl mb-2">😄</div>
            <div className="text-xs text-neutral-gray">播放中...</div>
          </div>
        </div>
      )}

      {/* 实际 GIF（当有图片时） */}
      {currentGif === 'gif1' && gif1 && gif1 !== '/images/features/emoji1-placeholder.gif' && (
        <div className="relative w-full h-full">
          <Image
            src={gif1}
            alt="表情1"
            fill
            className="object-contain"
            unoptimized
            draggable={false}
            onLoad={handleGifLoad}
            onDragStart={handleDragStart}
            onContextMenu={handleContextMenu}
          />
        </div>
      )}

      {currentGif === 'gif2' && gif2 && gif2 !== '/images/features/emoji2-placeholder.gif' && (
        <div className="relative w-full h-full">
          <Image
            src={gif2}
            alt="表情2"
            fill
            className="object-contain"
            unoptimized
            draggable={false}
            onLoad={handleGifLoad}
            onDragStart={handleDragStart}
            onContextMenu={handleContextMenu}
          />
        </div>
      )}

      {/* 提示文字
      {!isPlaying && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-neutral-gray bg-white/80 px-2 py-1 rounded">
          双击切换
        </div>
      )} */}

      {/* 文字泡列表 */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <EmojiBubble
            key={bubble.id}
            text={bubble.text}
            onComplete={() => handleBubbleComplete(bubble.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

