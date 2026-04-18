export const sketchImages = Array.from({ length: 7 }, (_, i) => `/images/about/${i + 1}-draw.jpg`)

export const bio = `Honestly, I never knew service design was a thing before I found it. When I did, I realised I'd been doing it my whole life without a name for it.

As a kid I was always taking things apart to see how they worked. Asking why until people got tired of answering. My parents included. I tried everything, sports, art, competitions, physics, not because I had a plan but because I needed to get inside something before I could say anything useful about it.

I ended up in marketing, then education, then training. Partly because I love talking to people. Partly because figuring out what someone actually needs, not what they say they need, kept pulling me in. I didn't have a word for that yet.

I find joy in small things too. Stuff most people walk straight past. I'm not sure when that started but it's probably connected to all of this.

Service design gave a name to something I'd already been doing. That's the short version. The longer version is that everything I tried, the physics, the training, the documentation, the workshops, it was all the same instinct. Get close enough to how something works to feel where it doesn't. That's what I do now. Just with a methodology behind it.`

export const trajectory = [
  {
    year: 'Current, 2026',
    location: 'Riga, Latvia',
    image: '/images/about/trajectory-2026.jpg',
    side: 'left',
    content: `Completing an Erasmus Mundus MA in Service Design at the Art Academy of Latvia. Designing services for real clients, researching how people behave inside broken systems, and figuring out what it actually means to make something work for the people living through it.`,
  },
  {
    year: '2025',
    location: 'Chennai, India',
    image: '/images/about/trajectory-2025.jpg',
    side: 'right',
    content: `Left Surfboard Payments after redesigning their developer portal from the ground up. Spent a year and a half turning a maze of documents into a service experience that developers could actually navigate. Then packed up and moved to Latvia to start over in a new discipline.`,
  },
  {
    year: '2024',
    location: 'Chennai, India',
    image: '/images/about/trajectory-2024.jpg',
    side: 'left',
    content: `Joined Surfboard Payments as a Technical Writer and Developer Relations specialist. First real encounter with designing for a system rather than just writing about one. Realised that documentation is a service layer and that getting information architecture wrong costs people real time and real money.`,
  },
  {
    year: '2023',
    location: 'Chennai, India',
    image: '/images/about/trajectory-2023.jpg',
    side: 'right',
    content: `Freelancing across training, content, and teaching. Designing workshops for corporate professionals and college students, figuring out what actually changes how people think versus what just fills an hour. Also tutoring English communication and ghostwriting for companies across different industries.`,
  },
  {
    year: '2022',
    location: 'Chennai, India',
    image: '/images/about/trajectory-2022.jpg',
    side: 'left',
    content: `Completed an MA in English Literature at the University of Madras. Wrote a thesis on how films shift cultural perspective. Spent two years thinking about how stories shape the way people understand the world — without knowing yet that this would become directly useful in service design.`,
  },
  {
    year: '2019',
    location: 'Chennai, India',
    image: '/images/about/trajectory-2019.jpg',
    side: 'right',
    content: `Graduated with a BSc in Physics from Gurunanak College. Learned how to build entire frameworks from first principles and how to sit with a problem that has no obvious answer. Did not know what to do with that yet.`,
  },
]

export const beyondDesign = [
  {
    label: 'Portraits & Sketching',
    description: `I sketch people. It keeps me observant — noticing the weight someone shifts to when they're uncomfortable, or the way a face changes when they finally understand something. The same attention that goes into a portrait goes into a research session.`,
    link: {
      text: 'See the sketches →',
      href: 'https://www.instagram.com/doodlewithpencils/',
      external: true,
    },
    bg: '#8B99FF',
    textColor: '#FFFFFF',
    titleColor: '#FFD700',
    linkColor: '#FFD700',
    cta: 'Click to explore →',
    galleryType: 'sketches',
  },
  {
    label: 'Travelling',
    description: `New places break my assumptions about how things work. Every airport, transit system, hospital queue, and street-food stall is a service with a logic — or a failure — worth paying attention to.`,
    link: null,
    bg: '#FFAEF2',
    textColor: '#000000',
    titleColor: '#000000',
    linkColor: '#000000',
    cta: 'Click to explore →',
    galleryType: 'travel',
  },
]
