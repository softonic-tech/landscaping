import Reveal from './Reveal'

export default function SectionTitle({ title, subtitle, label }) {
  return (
    <section className="aq-section-title" aria-label={label || title}>
      <Reveal className="aq-section-title-inner">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </Reveal>
    </section>
  )
}
