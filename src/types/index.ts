export interface MenuItem {
  id: string;
  label: string;
  href: string;
}

export interface Navigation {
  logo: string;
  menuItems: MenuItem[];
}

export interface Hero {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  period: string;
  description: string;
  gradient: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  description: string;
}

export interface Achievement {
  id: number;
  title: string;
  organization: string;
  icon: string;
  gradient: string;
}

export interface Certification {
  id: number;
  name: string;
  provider: string;
  year: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  gradient: string;
  icon?: string;
  photo?: string;
  photos?: string[];
  detailDescription: string;
  specifications: string[];
  contributions: string[];
  results: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Footer {
  title: string;
  subtitle: string;
  copyright: string;
  socialLinks: SocialLink[];
}

export interface ContentData {
  navigation: Navigation;
  hero: Hero;
  experiences: Experience[];
  education: Education;
  achievements: Achievement[];
  certifications: Certification[];
  portfolio: PortfolioItem[];
  footer: Footer;
}

export interface SEOData {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  siteUrl: string;
  author: {
    name: string;
    email: string;
    image: string;
  };
  openGraph: {
    type: string;
    locale: string;
    siteName: string;
  };
  twitter: {
    card: string;
    creator: string;
  };
}
