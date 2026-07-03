import { motion, useReducedMotion } from 'motion/react';

export default function Reveal({ as = 'div', children, className, delay = 0 }) {
  const Component = motion[as] || motion.div;
  const shouldReduceMotion = useReducedMotion();

  return (
    <Component
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={shouldReduceMotion ? undefined : { duration: 0.45, ease: 'easeOut', delay }}
    >
      {children}
    </Component>
  );
}
