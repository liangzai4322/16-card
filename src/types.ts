export interface CardData {
  id: number;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  content: string;
  category: 'recruitment' | 'stocks' | 'xiaohongshu' | 'international' | 'ecommerce';
}