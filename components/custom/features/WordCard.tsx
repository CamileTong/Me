'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cardBg from './card.jpg';

interface WordCardProps {
  storageKey?: string;
}

const STORAGE_KEY = 'wordcard-items';

export default function WordCard({ storageKey = STORAGE_KEY }: WordCardProps) {
  const [words, setWords] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentCard, setCurrentCard] = useState<string | null>(null);
  const [showCard, setShowCard] = useState(false);

  // 从 localStorage 加载
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWords(parsed);
      } catch (e) {
        console.error('Failed to load words:', e);
      }
    }
  }, [storageKey]);

  // 保存到 localStorage
  const saveWords = useCallback((newWords: string[]) => {
    setWords(newWords);
    localStorage.setItem(storageKey, JSON.stringify(newWords));
  }, [storageKey]);

  // 处理输入文本
  const handleSave = () => {
    if (!inputText.trim()) return;

    // 按换行或分号分割
    const newWords = inputText
      .split(/[;；\n]/)
      .map((w) => w.trim())
      .filter((w) => w.length > 0);

    if (newWords.length > 0) {
      saveWords([...words, ...newWords]);
      setInputText('');
    }
  };

  // 随机抽取字卡
  const drawCard = () => {
    if (words.length === 0) {
      alert('请先添加一些文字！');
      return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];
    
    setCurrentCard(selectedWord);
    setShowCard(true);

    // 3秒后自动隐藏
    setTimeout(() => {
      setShowCard(false);
    }, 3000);
  };

  // 清空所有字卡
  const clearAll = () => {
    if (confirm('确定要清空所有字卡吗？')) {
      saveWords([]);
      setInputText('');
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-2 gap-4 p-4">
      {/* 左侧：输入区域 + 抽卡按钮 */}
      <div className="flex flex-col gap-4">
        {/* 输入区域 */}
        <div className="flex flex-col gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入文字，用分号分隔&#10;例如：&#10;大盘鸡；薯条；馄饨"
            className="w-full px-3 py-2 text-sm border border-neutral-gray rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-warm-orange h-32"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-1.5 bg-warm-orange text-white text-sm rounded-lg hover:bg-warm-red transition-colors"
            >
              保存
            </button>
            {words.length > 0 && (
              <button
                onClick={clearAll}
                className="px-3 py-1.5 bg-neutral-gray text-white text-sm rounded-lg hover:bg-neutral-dark transition-colors"
              >
                清空
              </button>
            )}
          </div>
          {words.length > 0 && (
            <div className="text-xs text-neutral-gray">
              已保存 {words.length} 条
            </div>
          )}
        </div>

        {/* 抽卡按钮 */}
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={drawCard}
            className="text-8xl hover:scale-110 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={words.length === 0}
          >
            🗃️
          </button>
        </div>
      </div>

      {/* 右侧：字卡显示区域 */}
      <div className="flex items-center justify-center relative">
        <AnimatePresence>
          {showCard && currentCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              transition={{ duration: 0.5 }}
              className="absolute"
            >
              <div 
                className="text-neutral-dark px-8 py-12 rounded-xl shadow-2xl text-2xl font-bold h-64 w-40 flex items-center justify-center text-center break-words bg-cover bg-center"
                style={{ backgroundImage: `url(${cardBg.src})` }}
              >
                {currentCard}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}