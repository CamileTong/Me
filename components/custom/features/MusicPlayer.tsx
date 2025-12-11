'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type PlayMode = 'sequential' | 'shuffle' | 'single';

interface Song {
  id: number;
  name: string;
  src: string;
}

const defaultSongs: Song[] = [
  { id: 1, name: 'Call Your Rocks', src: '/songs/song1.mp3' },
  { id: 2, name: 'Cantina Rag', src: '/songs/song2.mp3' },
  { id: 3, name: 'This Doubt Tastes Like You', src: '/songs/song3.mp3' },
];

export default function MusicPlayer() {
  const [songs] = useState<Song[]>(defaultSongs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playMode, setPlayMode] = useState<PlayMode>('sequential');
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songs[currentIndex];

  // 处理播放/暂停
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 获取随机索引（排除当前索引）
  const getRandomIndex = useCallback((excludeIndex: number): number => {
    if (songs.length <= 1) return 0;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === excludeIndex);
    return randomIndex;
  }, [songs.length]);

  // 处理上一首
  const playPrevious = () => {
    let newIndex: number;
    if (playMode === 'shuffle') {
      newIndex = getRandomIndex(currentIndex);
    } else {
      newIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    }
    setCurrentIndex(newIndex);
    setIsPlaying(true);
  };

  // 处理下一首
  const playNext = () => {
    if (playMode === 'single') {
      // 单曲循环：重新播放当前歌曲
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    let newIndex: number;
    if (playMode === 'shuffle') {
      newIndex = getRandomIndex(currentIndex);
    } else {
      newIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setIsPlaying(true);
  };

  // 切换播放模式
  const togglePlayMode = () => {
    const modes: PlayMode[] = ['sequential', 'shuffle', 'single'];
    const currentModeIndex = modes.indexOf(playMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    setPlayMode(nextMode);
  };

  // 当歌曲切换时，更新音频源并播放
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = currentSong.src;
    audioRef.current.load();
    
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error('播放失败:', error);
        setIsPlaying(false);
      });
    }
  }, [currentIndex, currentSong.src, isPlaying]);

  // 处理歌曲播放结束
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (playMode === 'sequential') {
        // 顺序播放：播放下一首，如果是最后一首则回到第一首循环播放
        const nextIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        setIsPlaying(true);
      } else if (playMode === 'shuffle') {
        // 随机播放：随机选择下一首
        const nextIndex = getRandomIndex(currentIndex);
        setCurrentIndex(nextIndex);
        setIsPlaying(true);
      } else if (playMode === 'single') {
        // 单曲循环：重新播放当前歌曲
        audio.currentTime = 0;
        audio.play();
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playMode, currentIndex, songs.length, getRandomIndex]);

  // 获取播放模式显示文本
  const getPlayModeText = () => {
    switch (playMode) {
      case 'sequential':
        return '顺序';
      case 'shuffle':
        return '随机';
      case 'single':
        return '单曲';
      default:
        return '顺序';
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-4">
      <audio ref={audioRef} />
      
      {/* 歌曲名称显示 */}
      <div className="w-full text-center">
        <div className="text-sm text-neutral-gray mb-1">正在播放</div>
        <div className="text-base font-semibold text-neutral-dark truncate">
          {currentSong.name}
        </div>
      </div>

      {/* 控制按钮区域 */}
      <div className="flex items-center gap-3">
        {/* 上一首 */}
        <button
          onClick={playPrevious}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-warm-orange hover:bg-warm-red transition-colors text-white"
          aria-label="上一首"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>

        {/* 播放/暂停 */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-warm-orange hover:bg-warm-red transition-colors text-white"
          aria-label={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* 下一首 */}
        <button
          onClick={playNext}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-warm-orange hover:bg-warm-red transition-colors text-white"
          aria-label="下一首"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* 播放模式切换 */}
      <button
        onClick={togglePlayMode}
        className="px-4 py-2 text-xs text-neutral-gray hover:text-neutral-dark transition-colors border border-neutral-gray/30 rounded-lg hover:bg-neutral-light/50"
        aria-label="切换播放模式"
      >
        {getPlayModeText()}
      </button>
    </div>
  );
}

