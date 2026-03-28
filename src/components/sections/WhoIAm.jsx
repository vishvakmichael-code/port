import './who-i-am.css'

const markedWords = [
  { word: "Blending",        state: "bold" },
  { word: "qualitative",     state: "highlight" },
  { word: "research,",       state: "highlight" },
  { word: "service",         state: "highlight" },
  { word: "blueprinting,",   state: "highlight" },
  { word: "facilitation,",   state: "highlight" },
  { word: "and",             state: "normal" },
  { word: "systems",         state: "highlight" },
  { word: "mapping",         state: "highlight" },
  { word: "into",            state: "bold" },
  { word: "experiences",     state: "bold" },
  { word: "that",            state: "bold" },
  { word: "work",            state: "bold" },
  { word: "for",             state: "normal" },
  { word: "the",             state: "normal" },
  { word: "people",          state: "mark" },
  { word: "living",          state: "mark" },
  { word: "through",         state: "mark" },
  { word: "them.",           state: "mark" },
]

const paragraph2 = "Working across the full arc of a project — from research and co-creation to blueprinting and delivery — with a particular instinct for the moments where human needs and organisational logic pull in opposite directions."

// Group consecutive words with the same state into one chunk
function groupWords(words) {
  return words.reduce((acc, item) => {
    const last = acc[acc.length - 1]
    if (last && last.state === item.state) {
      last.words.push(item.word)
    } else {
      acc.push({ state: item.state, words: [item.word] })
    }
    return acc
  }, [])
}

export default function WhoIAm() {
  const groups = groupWords(markedWords)

  return (
    <section id="sec-about" className="who-i-am">
      <div className="who-i-am-inner">
        <p className="who-i-am-p1">
          {groups.map((group, i) =>
            group.state === 'mark' ? (
              // Single span = one continuous background, no gaps
              <span key={i} className="wia-mark-group">
                {group.words.join(' ')}
              </span>
            ) : (
              group.words.map((word, j) => (
                <span key={`${i}-${j}`} className={`wia-word wia-word--${group.state}`}>
                  {word}
                </span>
              ))
            )
          )}
        </p>
        <p className="who-i-am-p2">{paragraph2}</p>
      </div>
    </section>
  )
}
