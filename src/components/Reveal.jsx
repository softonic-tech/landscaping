import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = 'div',
  amount = 0.22,
  ...props
}) {
  const Comp = motion[as] || motion.div

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, ease, delay }}
      {...props}
    >
      {children}
    </Comp>
  )
}
