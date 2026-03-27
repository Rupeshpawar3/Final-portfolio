export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  shortDescription?: string[];
  details: string;
  year: string;
  tags: string[];
  category: string;
  hero: string;
  gallery: string[];
  embedPdf?: string;
  youtubeVideoId?: string;
  driveImageIds?: string[];
  illustrationImageIds?: string[];
  links?: {
    demo?: string;
    github?: string;
  };
}

export const projectsData: Record<string, ProjectData> = {
  "human.exe---ai-awareness-project": {
    slug: "human.exe---ai-awareness-project",
    title: "Human.exe - AI Awareness Project",
    category: "XR",
    description: "Interactive VR prototype for Meta Quest 3 exploring how AI recommendations influence human decision-making.",
    shortDescription: [
      "Interactive VR prototypes for Meta Quest 3",
      "Studied AI recommendation influence on human choice",
      "Built with Unity + XR Interaction Toolkit",
    ],
    details: `I designed this project to explore a simple but important question: how much do AI recommendations shape the choices we make without us noticing? I worked through concept design, interactive prototyping, asset creation, and usability testing to turn that idea into a VR experience. The hardest part was balancing the message with the interaction, because the experience had to feel engaging while still making the user reflect. Through repeated testing, I refined the flow, improved clarity, and learned how small interaction changes can strongly affect user confidence and decision-making. Building this for Meta Quest 3 helped me grow deeper in Unity, XR Interaction Toolkit, and immersive experience design.`,
    year: "2025",
    tags: ["VR", "Unity", "XR", "Research", "Meta Quest 3"],
    hero: "/projects/humanexe-cover.avif",
    gallery: [
      "/projects/humanexe-1.avif",
      "/projects/humanexe-2.avif",
      "/projects/humanexe-3.avif",
      "/projects/humanexe-4.avif",
      "/projects/humanexe-5.avif",
    ],
    youtubeVideoId: "cV6PNjBsxCc",
  },
  "digital-art": {
    slug: "digital-art",
    title: "Digital Art & Illustration",
    category: "Design",
    description: "I create character concepts, cultural themes, and environmental artwork using composition, colour, and style variation.",
    shortDescription: [
      "Creative character design and illustrations",
      "Visual storytelling across diverse themes",
      "Environmental art and concept design",
    ],
    details: `This section reflects my habit of exploring different visual languages instead of sticking to one style. I enjoy building characters, cultural themes, and environments that feel expressive and story-driven. What I learned here was not just how to draw, but how to use color, composition, and mood to make an image feel alive. I experimented with multiple illustration styles so I could communicate different emotions and settings more effectively. This kind of work strengthened my visual thinking and helped me become more confident in turning ideas into polished artwork.`,
    year: "2023-2025",
    tags: ["Digital Art", "Illustration", "Character Design", "Concept Art", "Environmental Design"],
    hero: "/projects/digitalart-cover.avif",
    gallery: [
      "/projects/digitalart-1.avif",
      "/projects/digitalart-2.avif",
      "/projects/digitalart-3.avif",
      "/projects/digitalart-4.avif",
      "/projects/digitalart-5.avif",
      "/projects/digitalart-6.avif",
      "/projects/digitalart-7.avif",
      "/projects/digitalart-8.avif",
    ],
    embedPdf: "https://drive.google.com/file/d/18TsXbt7BF3neChq3FeVcRQptmuMaQVqo/preview",
    illustrationImageIds: [
      '1ogBKwsd5jnjkItZdxMElC8Trdc9K6q-3',
      '1j196UEnuu2RdEeXTaFA8LXGVe8uprmeP',
      '1JRCAry7m_EKSvLna1c6Tg-gHt_DQ0aen',
      '1iTn-SKt0iGwZZjjJC_66w7-iRoKfGsNH',
      '14fpLFWkO93hbWUBUOqMMAsrCgmldnDnq',
      '1biWGXIEb085Bc8ghiib3FEef3a3LHhYm',
      '1GuKxm14CjA6bjRPbrkaLkGivRiArAvDe',
      '1xYJSwNy18BVFRQ0tS8whdiw8VIhw7qrv',
      '1E3tjmg5WWpoDW2fGwVgWZuW6u0KD7uvD',
      '1avmT6JkLPvjE-oVVoArWS9vzNzK1pMy5',
      '1t7R34X0qIjTBQ037JC64dMN6XX5fuFOJ',
      '1t_UxVh5hcRqhSYsT6IG7MzX_9T0ONwl6',
      '1HX0uDKsS9Rh3xppityu_VL5iMd28VhMF',
      '1h5ppzKMRooTTR4r6qVUEG763In9H-pNQ'
    ],
  },
  "visual-design": {
    slug: "visual-design",
    title: "UI/UX Design and Development",
    category: "UI/UX",
    description: "I design campaign visuals, digital assets, and immersive branding materials with strong hierarchy and consistency.",
    shortDescription: [
      "AR virtual influencer campaign",
      "Sr Art & Design Lead at That's Awesome Studio",
      "Character design, animation, AR implementation",
    ],
    details: `This project represents a major part of my experience at That’s Awesome Studio, where I worked as Senior Art & Design Lead on an AR virtual influencer campaign. I was responsible for shaping the visual identity, character look, animations, and supporting AR direction so the character felt believable and memorable. The challenge was not just making things look good, but making the entire presence feel consistent across platforms, visuals, and interaction. I learned how to think beyond isolated graphics and build a full visual system around a story and personality. That experience sharpened my ability to lead creative direction, work across design layers, and connect branding with immersive media.`,
    year: "2019-2020",
    tags: ["AR", "Character Design", "3D", "Animation", "Art Direction"],
    hero: "/projects/visualdesign-cover.avif",
    gallery: [
      "/videos/graphic-design-web.mp4",
    ],
  },
  "3d-modeling": {
    slug: "3d-modeling",
    title: "3D Modeling",
    category: "3D",
    description: "I model realistic environments and assets in Blender for VR-ready, immersive, and real-time experiences.",
    shortDescription: [
      "Enterprise VR training modules",
      "Realistic environment modeling in Blender",
      "Multi-user collaboration features",
    ],
    details: `This card reflects my work creating realistic 3D environments for enterprise VR training. I focused on modeling spaces that felt believable, detailed, and usable in real-time VR. One of the biggest difficulties was keeping visual quality high while still making the assets efficient enough for interactive performance. Working in Blender taught me how to think carefully about modeling, lighting, materials, and optimization at the same time. Through this, I learned that good 3D work is not only about realism — it is also about building scenes that perform well and support the user experience.`,
    year: "2024",
    tags: ["VR", "Enterprise", "Blender", "3D Modeling", "Architecture"],
    hero: "/projects/3dmodeling-cover.avif",
    gallery: [
      "/projects/3dmodeling-1.avif",
      "/projects/3dmodeling-2.avif",
      "/projects/3dmodeling-3.avif",
      "/projects/3dmodeling-4.avif",
      "/projects/3dmodeling-5.avif",
    ],
  },
  "graphic-design": {
    slug: "graphic-design",
    title: "Graphic Design",
    category: "Design",
    description: "I create large-scale learning and marketing assets using typography, layout, and Adobe Creative Suite workflows.",
    shortDescription: [
      "2.6 years at BYJU'S creating 3,000+ artworks",
      "Sr Art & Design Lead at That's Awesome Studio",
      "Specialized in brand identity and marketing materials",
    ],
    details: `This section reflects the longest stretch of my design journey, especially my 2.6 years at BYJU’S, where I created 3,000+ artworks across print and digital media. That experience taught me discipline, consistency, and speed at scale. I worked with typography, layout, and Adobe Creative Suite every day, and I learned how to keep quality high even when the production load was heavy. Later, I applied that foundation in campaign and studio work, where visuals had to communicate clearly and quickly. This area shaped my ability to design with structure, adapt to different audiences, and deliver brand-consistent work under pressure.`,
    year: "2020-2024",
    tags: ["Graphic Design", "Typography", "Layout Design", "Adobe Creative Suite", "Brand Identity"],
    hero: "/projects/graphicdesign-cover.avif",
    gallery: [
      "/projects/graphicdesign-1.avif",
      "/projects/graphicdesign-2.avif",
      "/projects/graphicdesign-3.avif",
      "/projects/graphicdesign-4.avif",
    ],
    driveImageIds: [
      '15-4qmDpimAu_DXZf5AFubA08TWUnzdG9',
      '1yx9aDIOerfZEpD1pqtfirM4aDb9C_v-f',
      '1fyC-6tln7PQrBogfWytPg2s2rl9v8hQx',
      '1OCixw1RLDMekP-33QFSlJdWyC3QUmxim',
      '1P0df7ND8twkDCaWA13gewtoxBvHcVlR4',
      '129Yr7dgaBx7dF7wXlXiudGLDhtvXqhx3',
      '13kOyePlAK_JSF3EQt78kF-PaFP-R5Fea',
      '1ceDnSAZ6fAIhZ8JMKqpTpc-t2MZsnqQG',
      '1W29Y2rTNmI0p6fhLjZknbcdjdrHi5Na1',
      '17EI4C4WEcwjofwSu8P2XRany3R6H5Bkn',
      '1JPra-LMHRMsMzc8ajUgQzzRp9zTZreeG',
      '12FH-qv9Ve1iDSEM9SViiUO-x-UuWKBet',
      '1HGMKHEUDKP5Ur7gTrbonmkDlD_PZZ5Ib',
      '1SpOLkrHzzP8LulxcBUtmFA3q2xmiZb3C',
      '1_RIZ-6FEvAu_uP37AHBBvZiRx2rPT7o_',
      '1f4c1YeCMTusazYp9AVcotI3m2GaKuc46',
      '13xjBPrm1n_bvTvtflAi2LMr5Jq_t93_t',
      '1hnIgzA90vfytDt7gzbqzwrQ2ywxcsV63',
      '1GZo1TnwO1Pzy3KXu4blUuTUofyR0YHbS',
    ],
    embedPdf: "https://drive.google.com/file/d/1laVUIk41Y41bO6BINZkhN4IoL0L7WNp8/preview",
  },
  "mental-health-activity": {
    slug: "mental-health-activity",
    title: "Virtual and Augmented Reality",
    category: "Games",
    description: "4-level therapeutic game prototype focused on emotional awareness, UX flow, and interactive engagement.",
    shortDescription: [
      "4-level therapeutic game prototype",
      "Focus on emotional awareness & UX flows",
      "Unity game design with narrative elements",
    ],
    details: `This project came from my interest in making games that do more than entertain. I designed a four-level therapeutic game prototype focused on emotional awareness, coping, and user flow. The challenge was finding the balance between gameplay and sensitivity, because the experience needed to feel supportive rather than overwhelming. I used iterative playtesting to refine the interaction design and make the experience more intuitive for different users. Through this project, I learned how games can be used as a thoughtful medium for reflection, comfort, and guided emotional engagement.`,
    year: "2025",
    tags: ["Game Design", "Unity", "UX", "VR", "Mental Health"],
    hero: "/projects/mentalhealth-cover.avif",
    gallery: [
      "/projects/mentalhealth-1.avif",
      "/projects/mentalhealth-2.avif",
      "/projects/mentalhealth-3.avif",
      "/projects/mentalhealth-4.avif",
      "/projects/mentalhealth-5.avif",
      "/projects/mentalhealth-6.avif",
      "/projects/mentalhealth-7.avif",
      "/projects/mentalhealth-8.avif",
      "/projects/mentalhealth-9.avif",
    ],
  },
};

