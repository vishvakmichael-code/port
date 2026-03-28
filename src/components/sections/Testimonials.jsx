import { TestimonialSection } from '../ui/testimonial'

const testimonialsData = [
  {
    quote: "It's been a privilege to collaborate with Vishvak. He brings an invaluable combination of proactivity and pedagogical skill to the team. His gift for demystifying intricate technical information is remarkable. Beyond his technical prowess, Vishvak is an outstanding team member with stellar communication abilities. Any team would be lucky to have him.",
    name: 'Praveen Joshua',
    role: 'Senior Software Engineer · Angular Architect',
    avatarSrc: null,
    avatarFallback: 'PJ',
  },
  {
    quote: "Working with Vishvak has been a truly enriching experience. He played a critical role in enhancing developer resources with clear, concise documentation. What truly sets him apart is his initiative in streamlining workflows and his thoughtful, user-centered approach to every project. He is not only technically proficient but also a dependable and innovative team player.",
    name: 'Kamatchi Nandhini Govindarajan',
    role: 'Technical Writer · Williams Lea',
    avatarSrc: null,
    avatarFallback: 'KN',
  },
  {
    quote: "I've had the chance to work with Vishvak on a few different teams, and it's always been a great experience. What really stands out is how he can take something complex and explain it in a way that's clear, engaging, and actually interesting. He's just a thoughtful person who really takes the time to understand problems and find smart, creative solutions.",
    name: 'Aravindh V',
    role: 'DevOps Engineer · GCP · Kubernetes',
    avatarSrc: null,
    avatarFallback: 'AV',
  },
]

export default function Testimonials() {
  return (
    <TestimonialSection
      title="What people say"
      testimonials={testimonialsData}
    />
  )
}
