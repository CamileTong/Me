'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-warm-lighter">
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-warm-yellow/20 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-warm-orange/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-warm-light/50 rounded-full blur-[80px]" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <h1 className="text-6xl md:text-8xl font-bold text-warm-text mb-8 tracking-tight leading-tight">
            你好，我是<span className="text-warm-orange relative inline-block">
              明昭
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-warm-yellow -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-warm-text/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          奇思妙想卸货点！梦见什么干什么！
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="group px-8 py-4 bg-warm-orange text-white rounded-full font-semibold hover:bg-warm-accent transition-all duration-300 shadow-lg shadow-warm-orange/20 hover:shadow-xl hover:shadow-warm-orange/30 hover:-translate-y-0.5"
          >
            查看项目
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="/contact"
            className="px-8 py-4 border border-warm-text/10 text-warm-text rounded-full font-semibold hover:bg-white hover:border-transparent hover:shadow-lg hover:shadow-warm-text/5 transition-all duration-300 bg-white/50 backdrop-blur-sm"
          >
            联系我
          </a>
        </motion.div>
      </div>
    </section>
  );
}
