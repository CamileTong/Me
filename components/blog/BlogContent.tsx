'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => {
            return (
              <div className="relative w-full h-64 md:h-96 my-8 rounded-lg overflow-hidden">
                <Image
                  src={props.src || ''}
                  alt={props.alt || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            );
          },
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold text-neutral-dark mb-6" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-bold text-neutral-dark mb-4 mt-8" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-semibold text-neutral-dark mb-3 mt-6" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-neutral-gray leading-relaxed mb-4" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-warm-orange hover:text-warm-red underline" {...props} />
          ),
          code: ({ node, ...props }) => (
            <code className="bg-neutral-light px-2 py-1 rounded text-sm" {...props} />
          ),
          pre: ({ node, ...props }) => (
            <pre className="bg-neutral-dark text-white p-4 rounded-lg overflow-x-auto my-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

