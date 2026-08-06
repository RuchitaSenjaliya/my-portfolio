import { Mail, Linkedin, Github, MapPin, Instagram } from "lucide-react";

export const ownerInfo = {
  name: "Ruchita Senjaliya",
  role: "Frontend Developer",
  email: "senjaliyaruchita@gmail.com",
  location: "Gujarat, India",
  locationMapLink: "https://maps.app.goo.gl/yzdquiGJaWyzgoKJA",
  siteUrl: "https://ruchita.dev",
  twitterHandle: "@ruchita_senjaliya",
  experience: "2+ years",
  git: {
    username: "RuchitaSenjaliya",
    link: "https://github.com/RuchitaSenjaliya",
  },
  linkedin: {
    username: "ruchita-senjaliya-385453228",
    displayUsername: "ruchita-senjaliya",
    link: "https://www.linkedin.com/in/ruchita-senjaliya-385453228/",
  },
  instagram: {
    username: "ruchita_senjaliya",
    link: "https://instagram.com/ruchita_senjaliya",
  },
};

export const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: ownerInfo.email,
    href: `mailto:${ownerInfo.email}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: ownerInfo.linkedin.displayUsername,
    href: ownerInfo.linkedin.link,
  },
  {
    icon: Github,
    label: "GitHub",
    value: ownerInfo.git.username,
    href: ownerInfo.git.link,
  },
  {
    icon: MapPin,
    label: "Location",
    value: ownerInfo.location,
    href: ownerInfo.locationMapLink,
  },
];

export const socialLinks = [
  { Icon: Github, href: ownerInfo.git.link, label: "GitHub" },
  { Icon: Linkedin, href: ownerInfo.linkedin.link, label: "LinkedIn" },
  // { Icon: Instagram, href: ownerInfo.instagram.link, label: "Instagram" },
  { Icon: Mail, href: `mailto:${ownerInfo.email}`, label: "Email" },
];
