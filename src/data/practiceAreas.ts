export interface PracticeArea {
  id: string;
  name: string;
  description: string;
  icon: 'users' | 'shield' | 'heart-pulse' | 'briefcase' | 'home' | 'scroll' | 'building' | 'globe';
  subCategories: string[];
}

export const practiceAreas: PracticeArea[] = [
  {
    id: 'family-law',
    name: 'Family Law',
    description: 'Legal matters involving family relationships',
    icon: 'users',
    subCategories: ['Divorce', 'Child Custody', 'Adoption', 'Spousal Support', 'Domestic Violence', 'Prenuptial Agreements']
  },
  {
    id: 'criminal-defense',
    name: 'Criminal Defense',
    description: 'Defense against criminal charges',
    icon: 'shield',
    subCategories: ['DUI Defense', 'Federal Crimes', 'Drug Offenses', 'White Collar Crimes', 'Appeals', 'Juvenile Law']
  },
  {
    id: 'personal-injury',
    name: 'Personal Injury',
    description: 'Representation for injury victims',
    icon: 'heart-pulse',
    subCategories: ['Car Accidents', 'Medical Malpractice', 'Workplace Injuries', 'Slip and Fall', 'Product Liability']
  },
  {
    id: 'business-law',
    name: 'Business Law',
    description: 'Legal services for businesses',
    icon: 'briefcase',
    subCategories: ['Business Formation', 'Contracts', 'Corporate Law', 'Mergers & Acquisitions', 'Business Litigation']
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property law matters',
    icon: 'home',
    subCategories: ['Property Transactions', 'Landlord-Tenant', 'Construction Law', 'Land Use', 'Property Disputes']
  },
  {
    id: 'estate-planning',
    name: 'Estate Planning',
    description: 'Future planning and asset protection',
    icon: 'scroll',
    subCategories: ['Wills', 'Trusts', 'Probate', 'Elder Law', 'Asset Protection']
  },
  {
    id: 'employment-law',
    name: 'Employment Law',
    description: 'Workplace legal matters',
    icon: 'building',
    subCategories: ['Discrimination', 'Wrongful Termination', 'Workplace Harassment', 'Employment Contracts', 'Wage Disputes']
  },
  {
    id: 'immigration',
    name: 'Immigration',
    description: 'Immigration and naturalization services',
    icon: 'globe',
    subCategories: ['Visas', 'Green Cards', 'Citizenship', 'Deportation Defense', 'Business Immigration']
  }
];