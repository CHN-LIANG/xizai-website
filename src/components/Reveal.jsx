import { motion } from 'motion/react';

export default function Reveal({ as = 'div', children, className, delay = 0 }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
    >
      {children}
    </Component>
  );
}
