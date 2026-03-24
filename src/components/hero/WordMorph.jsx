import { FluidTextMorph } from '../ui/fluid-text-morph'
import { useCursor } from '../cursor/CursorContext'

export default function WordMorph() {
  const { pushCursorState, popCursorState } = useCursor()

  return (
    <FluidTextMorph
      wordPairs={[
        ['Invisible.', 'Felt.'],
        ['Felt.',       'Trusted.'],
        ['Trusted.',    'Seamless.'],
        ['Seamless.',   'Human.'],
        ['Human.',      'Invisible.'],
      ]}
      className="!text-[length:inherit] !font-[inherit] !leading-[inherit] !tracking-[inherit] !justify-start !cursor-none"
      animationProps={{
        initialColor: 'var(--color-primary)',
        animateColor: 'var(--color-primary)',
        exitColor:    'var(--color-primary)',
      }}
      onEnter={() => pushCursorState('word-reveal')}
      onLeave={() => popCursorState()}
    />
  )
}
