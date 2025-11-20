// src/data/teamMembers.ts
export interface TeamMember {
  id: number;
  name: string;
  title: string;
  imgSrc: string;
  alt: string;
}

export const teamMembers3: TeamMember[] = [
  {
    id: 17,
    name: "Nilson Laurent",
    title: "Founder & CEO",
    imgSrc: "/assets/images/team/01.jpg",
    alt: "Nilson Laurent",
  },
  {
    id: 18,
    name: "José Gibbons",
    title: "Engineering Manager",
    imgSrc: "/assets/images/team/02.jpg",
    alt: "José Gibbons",
  },
  {
    id: 19,
    name: "John Hewitt",
    title: "Product Manager",
    imgSrc: "/assets/images/team/03.jpg",
    alt: "John Hewitt",
  },
  {
    id: 20,
    name: "Jason Chedjou",
    title: "Frontend Developer",
    imgSrc: "/assets/images/team/04.jpg",
    alt: "Jason Chedjou",
  },
  {
    id: 21,
    name: "Zouhir Christensen",
    title: "Backend Developer",
    imgSrc: "/assets/images/team/05.jpg",
    alt: "Zouhir Christensen",
  },
  {
    id: 22,
    name: "Zaid Schwartz",
    title: "Product Designer",
    imgSrc: "/assets/images/team/06.jpg",
    alt: "Zaid Schwartz",
  },
  {
    id: 23,
    name: "Sarah Mandella",
    title: "UX Researcher",
    imgSrc: "/assets/images/team/07.jpg",
    alt: "Sarah Mandella",
  },
  {
    id: 24,
    name: "Marco Kelly",
    title: "Customer Success",
    imgSrc: "/assets/images/team/08.jpg",
    alt: "Marco Kelly",
  },
];
