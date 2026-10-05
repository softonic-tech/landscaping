import { motion } from 'framer-motion'
import useLiteMotion from '../hooks/useLiteMotion'

const ease = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
}

/** Instant variants for mobile — avoids scroll jank from opacity/transform. */
export const fadeUpLite = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
}

export const staggerContainerLite = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0, delayChildren: 0 },
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
  const lite = useLiteMotion()
  const Comp = motion[as] || motion.div

  if (lite) {
    const Tag = as === 'div' || !as ? 'div' : as
    const Static = Tag
    return (
      <Static className={className} {...props}>
        {children}
      </Static>
    )
  }

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

/** Staggered in-view grid that no-ops motion on mobile. */
export function InViewGroup({
  children,
  className,
  amount = 0.15,
  as = 'div',
}) {
  const lite = useLiteMotion()
  const Tag = as

  if (lite) {
    return <Tag className={className}>{children}</Tag>
  }

  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Comp>
  )
}

export function InViewItem({ children, className, as = 'div', ...props }) {
  const lite = useLiteMotion()

  if (lite) {
    const Tag = as
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }

  const Comp = motion[as] || motion.div
  return (
    <Comp className={className} variants={fadeUp} {...props}>
      {children}
    </Comp>
  )
}
