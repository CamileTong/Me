'use client';

import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import { features } from './featuresConfig';

export default function FeatureShowcase() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-neutral-dark mb-4">功能demo</h2>
        <p className="text-xl text-neutral-gray max-w-2xl mx-auto">
          主要玩法可以在<a href="https://redbird.minkof.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">红鸟小屋</a>体验！这里囤些小demo
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const FeatureComponent = feature.component;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard title={feature.title}>
                <FeatureComponent {...(feature.props || {})} />
              </FeatureCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

