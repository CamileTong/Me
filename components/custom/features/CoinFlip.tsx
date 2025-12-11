'use client';

import { useRef } from 'react';
import Image from 'next/image';
import headImg from './head.png';
import tailImg from './tail.png';

export default function CoinFlip() {
  const coinRef = useRef<HTMLDivElement>(null);
  const isFlipping = useRef(false);

  const toss = () => {
    if (!coinRef.current || isFlipping.current) return;
    
    isFlipping.current = true;
    const coin = coinRef.current;
    
    // Reset animation
    coin.style.animation = 'none';
    
    // Force reflow to restart animation
    void coin.offsetWidth;
    
    // Randomly choose heads or tails
    if (Math.random() <= 0.5) {
      coin.style.animation = 'flip-heads 3s forwards';
    } else {
      coin.style.animation = 'flip-tails 3s forwards';
    }
    
    // Allow flipping again after animation completes
    setTimeout(() => {
      isFlipping.current = false;
    }, 3000);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <style jsx>{`
        .coin-container {
          height: 120px;
          width: 120px;
          position: relative;
          margin: 0;
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .coin-container img {
          width: 120px;
          height: 120px;
        }

        .coin-tails {
          transform: rotateX(180deg);
        }

        .coin-heads,
        .coin-tails {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
      `}</style>
      
      <div
        ref={coinRef}
        onClick={toss}
        className="coin-container"
      >
        <div className="coin-heads">
          <Image
            src={headImg}
            alt="正面"
            width={120}
            height={120}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="coin-tails">
          <Image
            src={tailImg}
            alt="反面"
            width={120}
            height={120}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

