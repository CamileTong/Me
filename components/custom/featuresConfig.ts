import { ComponentType } from 'react';
import PokeFun from './features/PokeFun';
import WordCard from './features/WordCard';
import EmojiSwitch from './features/EmojiSwitch';
import CoinFlip from './features/CoinFlip';
import MusicPlayer from './features/MusicPlayer';

export interface FeatureConfig {
  id: string;
  title: string;
  component: ComponentType<any>;
  props?: Record<string, any>;
}

export const features: FeatureConfig[] = [
  // {
  //   id: 'poke-fun',
  //   title: '戳戳乐',
  //   component: PokeFun,
  //   props: {
  //     gif: '/images/features/poke-placeholder.gif',
  //     messages: [
  //       '戳我干嘛！',
  //       '再戳试试？',
  //       '别戳了！',
  //       '好痒啊～',
  //       '哈哈哈哈哈',
  //       '继续戳！',
  //       '好玩吗？',
  //       '再来一次！',
  //     ],
  //   },
  // },
  {
    id: 'emoji-switch',
    title: '角色互动（单击/双击试试看^^）',
    component: EmojiSwitch,
    props: {
      gif1: '/images/features/1.webp',
      gif2: '/images/features/2.webp',
      gif1Duration: 2000,
      gif2Duration: 3000,
    },
  },
  {
    id: 'word-card',
    title: '字卡',
    component: WordCard,
    props: {
      storageKey: 'wordcard-items',
    },
  },
  {
    id: 'coin-flip',
    title: '决策币',
    component: CoinFlip,
  },
  {
    id: 'music-player',
    title: '音乐播放器',
    component: MusicPlayer,
  },
];

