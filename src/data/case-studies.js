export const caseStudies = {
  'getlini-eco': {
    slug: 'getlini-eco',
    title: 'Where Objects Find Their Next Story',
    subtitle: 'A circular exchange and repair service for Getliņi EKO\'s environmental education centre.',
    tags: ['Service Design', 'Blueprint', 'Research', 'Circular Economy'],
    accent: '#001EBB',
    year: '2024',

    meta: {
      client: 'Getliņi EKO',
      year: '2024',
      teamSize: '6 designers',
      role: 'Service Designer',
      status: 'Concept delivered',
    },

    challenge: [
      `Latvia needs to cut the amount of waste going to landfill from over 90% to 10% by 2030.`,
      `Getliņi, one of the largest waste management facilities in Latvia, was planning a new education centre to be built in its facility.`,
      `The brief was to design an exchange and repair space that people could actually use on their own, something more functional and accessible than what already exists in Latvia and Europe, where items could come in, get displayed, and go home with someone new without needing a staff member to hold your hand through it.`,
      `But the harder problem was not the space. Getting people to show up in the first place was the real design challenge. There was a gap between caring and doing. That is where most services fall apart.`,
    ],

    opportunity: [
      `Most people who care about sustainability already want to do something. The problem is that nothing makes it easy enough to actually follow through. And the nearest repair point is across the city. People are not sure what items they can even bring. And nothing about the experience feels worth the effort.`,
      `Our research kept confirming the same thing.`,
      `**86% of people would skip an event if travel was inconvenient.**`,
      `**61% held onto objects they no longer used because of the memories attached to them.**`,
      `So we reframed the opportunity: "**How do we not convince people to care, but how do we build a service that fits into the life they already have, and makes doing the right thing feel as easy and natural as doing nothing.**"`,
    ],

    siteVisitImages: [
      '/images/projects/getlini/sitevisit1.jpg',
      '/images/projects/getlini/sitevisit2.png',
      '/images/projects/getlini/sitevisit3.png',
      '/images/projects/getlini/sitevisit4.png',
    ],

    pullQuote: `"Going to a shop that is 5 minutes from your home to fix a broken blender is more convenient than driving 40 minutes across the whole city to maybe fix it."`,
    pullQuoteSource: 'Research participant · Riga',

    diagnosis: {
      problems: [
        {
          title: 'The site is far away',
          body: 'Getting to Getliņi takes effort most people won\'t make. Distance is a hard barrier before any service experience even begins.',
        },
        {
          title: 'No community relationship yet',
          body: 'The centre doesn\'t open until 2029. There is no existing relationship between Getliņi and residents. Trust takes time to build.',
        },
        {
          title: 'Repair feels inconvenient',
          body: 'Most people see repair as harder than replacement. The system makes it easier to throw things away than to fix them.',
        },
        {
          title: 'Sustainability feels abstract',
          body: 'People understand it intellectually but don\'t feel it. Young adults want to do something but don\'t know where to start.',
        },
        {
          title: 'Waste still goes to landfill',
          body: 'Most waste that could be recycled or repaired is still going to landfill because the path of least resistance always wins.',
        },
      ],
      solutions: [
        {
          title: 'Reboot: a hybrid exchange service',
          body: 'A service combining physical and digital touchpoints, bringing repair and exchange into everyday routines.',
        },
        {
          title: 'Mobile collection van',
          body: 'Attached to Getliņi\'s existing Tuesday collection trucks. Assessment and pickup happen at home, using infrastructure that already exists.',
        },
        {
          title: 'Storytelling before donating',
          body: 'The app lets people add a memory or care tip before passing an object on, turning an obligation into something worth doing.',
        },
        {
          title: 'Digital pre-check',
          body: 'Submit a photo, get an eligibility response before travelling anywhere. Remove the uncertainty at the entry point.',
        },
        {
          title: 'Community anchors',
          body: 'University partnerships, neighbourhood exchange boxes and café drop-points bringing the service to where people already are.',
        },
      ],
      collaborativeCredit: 'Developed collaboratively with a team of six designers.',
      contribution: 'My contribution sat in the research that shaped these decisions, the workshop that outlined them, and the blueprint that made them operational.',
    },

    stats: [
      { value: '86%', label: 'would skip events if travel was inconvenient' },
      { value: '61%', label: 'keep objects past usefulness for sentimental reasons' },
      { value: '80%', label: 'of prototype testers said storytelling features would bring them back' },
    ],

    outcomes: {
      stats: [
        {
          value: '80%',
          label: 'of prototype testers said storytelling or community features would make them return',
        },
        {
          value: '9',
          label: 'local participants validated the emotional design direction in prototype testing',
        },
        {
          value: '✓',
          label: 'Getliņi committed to taking initiatives to implement the concept',
        },
      ],
      narrative: [
        `Getliņi received the concept and committed to taking initiatives to implement it. We tested the prototype with residents from Kuldiga and Riga, people who live with this problem every day.`,
        `What stayed with us from that testing wasn't a metric. It was hearing people talk about the objects they keep because of the memories attached to them. That emotional connection to things was something most sustainability services completely overlooked. We designed Reboot around it. Getliņi saw that and responded to it.`,
      ],
    },

    decisions: [
      {
        number: '01',
        title: 'The Digital Pre-check',
        body: `44% of people didn't know which items would be accepted at repair or exchange initiatives. That's a motivation problem disguised as a logistics problem. The app lets someone submit a photo and get an eligibility response before they've made any effort to travel. Remove the uncertainty at the entry point and more people begin the journey.`,
        note: `Down the line, a Mobile Collection Van attached to Getliņi's existing Tuesday trucks could take this further. Objects assessed and collected at home, before anyone travels anywhere.`,
        artifact: 'App prototype: pre-check screen',
        image: '/images/projects/getlini/app-mocks.png',
      },
      {
        number: '02',
        title: 'The Storytelling Framework',
        body: `I tested this in the workshop and 41% kept objects past their usefulness because of emotional attachment. Not because they wanted to. The Reboot app lets people add a short story or care tip before donating an object, turning an obligation into something that felt worth doing. This was the most contested decision in the team. It was also the one Getliņi responded to most strongly.`,
        artifact: 'App prototype: story submission flow',
        image: '/images/projects/getlini/story-sharing.png',
      },
      {
        number: '03',
        title: 'The Object Value System',
        body: `Not everything donated feels equal. A handmade chair carries more than a broken kettle. The credit system we designed reflects that. Donating something scores points weighted by condition, repairability, and the story attached. Those credits unlock access to objects in the exchange. It turns a one-sided transaction into a relationship. People aren't giving things away. They're trading within a community that values what they value.`,
        artifact: 'Object value system',
        image: '/images/projects/getlini/object-value-system.png',
      },
    ],

    challenges: [
      {
        number: '01',
        title: 'Designing for behaviour, not awareness',
        body: 'Every sustainability service we studied focused on education. The assumption was that if people knew more they would act differently. The research showed that wasn\'t the problem. People already cared. The barrier was friction, not knowledge.',
      },
      {
        number: '02',
        title: 'The 2029 problem',
        body: 'The physical centre doesn\'t open until 2029. We were designing a service with no venue, no established user base, and no current relationship between Getliņi and the communities it would serve. The digital layer wasn\'t optional. It was the only way to exist in the interim.',
      },
      {
        number: '03',
        title: 'Getting six designers to commit',
        body: 'In a team of six, every research session produced new directions. The workshop became the moment we had to stop collecting insights and start making decisions together. Not everyone agreed on the storytelling feature. The prototype data settled it.',
      },
      {
        number: '04',
        title: 'Defining what the blueprint needed to contain',
        body: 'A service blueprint for something that doesn\'t exist yet is half design and half persuasion. It needs to show Getliņi what they would need to build, staff, maintain and fund. It also needed to be a document they would actually use in a stakeholder meeting.',
      },
    ],

    challengeReflection: `What I found hardest wasn't designing the service. It was holding confidence in the emotional design direction when it felt unproven. The storytelling feature was the most challenged decision in the room. It felt soft against the logistics and infrastructure concerns. The prototype numbers changed that conversation. 80% of testers said storytelling features would bring them back. That taught me something about when to argue from instinct and when to wait for evidence.`,

    process: [
      {
        number: '01',
        stage: 'Research',
        oneLiner: 'Understanding people, not assumptions',
        detail: 'Twelve qualitative interviews, a behavioural survey with 36 participants, and in-person ethnography in Riga and Ķekava. Every major design decision in the service traces back to something a real person told us.',
        image: '/images/projects/getlini/workshopfindings.jpg',
      },
      {
        number: '02',
        stage: 'Workshop',
        oneLiner: 'Co-creation with staff and community',
        detail: 'I facilitated a session with Getliņi staff and community members. Halfway through we introduced an unplanned emotional mapping exercise: asking people how they feel at each stage of deciding what to do with a broken object. That surfaced the barrier that became the storytelling framework.',
        image: '/images/projects/getlini/workshop-6spresso-01.JPEG',
      },
      {
        number: '03',
        stage: 'Blueprint',
        oneLiner: 'Making the service operational on paper',
        detail: 'The service blueprint mapped every touchpoint across the Reboot ecosystem: mobile van, exchange station, digital pre-check, storytelling flow, and community membership. Built to be used in a Getliņi stakeholder meeting, not just reviewed as a deliverable.',
        image: '/images/projects/getlini/service-blueprint.jpg',
      },
      {
        number: '04',
        stage: 'Testing',
        oneLiner: 'Prototype validation with real residents',
        detail: 'Nine participants, local. We tested the app, the exchange station experience and the storytelling feature. 80% said storytelling would bring them back. That told us we had designed for the right thing.',
        image: '/images/projects/getlini/testing with people.JPG',
      },
    ],
  },
}
