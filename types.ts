
export interface NavItem {
  label: string;
  path: string;
}

export interface Product {
  id: string;
  title: string;
  category: 'Digital' | 'Físico';
  description: string;
  price: string;
  rating: number;
  imageUrl: string;
  affiliateUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
}

export enum ThemeColors {
  PRIMARY = 'orange-500',
  SECONDARY = 'blue-600',
  ACCENT = 'green-500',
  DARK = 'gray-900'
}
