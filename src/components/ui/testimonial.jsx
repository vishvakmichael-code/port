import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Card, CardContent } from "./card"

const QuoteIcon = (props) => (
  <svg
    width="32"
    height="24"
    viewBox="0 0 48 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.9951 36C12.4951 36 10.2285 35.0167 8.19513 33.05C6.1618 31.0833 5.14513 28.8333 5.14513 26.3C5.14513 22.8 6.2118 19.4833 8.34513 16.35C10.4785 13.2167 13.2285 10.1 16.5951 7L21.4951 11.25C19.3618 13.1333 17.6785 14.8833 16.4451 16.5C15.2118 18.1167 14.5951 19.9833 14.5951 22.1H19.9951V36H14.9951ZM37.9951 36C35.4951 36 33.2285 35.0167 31.1951 33.05C29.1618 31.0833 28.1451 28.8333 28.1451 26.3C28.1451 22.8 29.2118 19.4833 31.3451 16.35C33.4785 13.2167 36.2285 10.1 39.5951 7L44.4951 11.25C42.3618 13.1333 40.6785 14.8833 39.4451 16.5C38.2118 18.1167 37.5951 19.9833 37.5951 22.1H42.9951V36H37.9951Z"
      fill="currentColor"
    />
  </svg>
)

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    style={{ height: '100%' }}
  >
    <Card
      style={{
        height: '100%',
        background: 'var(--color-bg-2)',
        border: '1px solid var(--color-subtle)',
        borderRadius: 'var(--radius-lg)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      className="hover:-translate-y-1 hover:shadow-xl"
    >
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-6)',
          height: '100%',
        }}
      >
        <QuoteIcon style={{ color: 'var(--color-subtle)', flexShrink: 0 }} />

        <p
          style={{
            fontFamily: 'var(--font-itim)',
            fontSize: 'var(--t-body-lg)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-fg)',
            margin: 0,
            flex: 1,
          }}
        >
          "{testimonial.quote}"
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            marginTop: 'auto',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--color-subtle)',
          }}
        >
          <Avatar>
            <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
            <AvatarFallback
              style={{
                background: 'var(--color-bg-3)',
                color: 'var(--color-fg)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--t-label)',
              }}
            >
              {testimonial.avatarFallback}
            </AvatarFallback>
          </Avatar>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-itim)',
                fontSize: 'var(--t-body)',
                fontWeight: 600,
                color: 'var(--color-fg)',
                margin: 0,
              }}
            >
              {testimonial.name}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--t-label)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                margin: 0,
              }}
            >
              {testimonial.role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export function TestimonialSection({ title, testimonials, className, ...props }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  return (
    <section
      style={{
        background: 'var(--color-bg)',
        paddingTop: 'var(--section-padding-top)',
        paddingBottom: 'var(--section-padding-bottom)',
        paddingInline: 'var(--page-padding-x)',
        position: 'relative',
        zIndex: 2,
      }}
      className={cn(className)}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--t-label)',
            color: 'var(--color-subtle)',
            letterSpacing: 'var(--tracking-label)',
          }}
        >
          03
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--t-h1)',
            fontWeight: 600,
            letterSpacing: 'var(--tracking-heading)',
            color: 'var(--color-primary)',
            margin: 0,
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.3em',
          }}
        >
          What people{' '}
          <em
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--color-primary)',
            }}
          >
            say
          </em>
        </h2>
      </div>

      <motion.div
        className="testimonial-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-4)',
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </motion.div>
    </section>
  )
}
