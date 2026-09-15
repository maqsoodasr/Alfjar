export type CategoryId = 'all' | 'handi' | 'bbq' | 'chinese' | 'fastfood' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: 'handi' | 'bbq' | 'chinese' | 'fastfood' | 'desserts';
  categoryLabel: string;
  description: string;
  price: number;
  halfPrice?: number;
  image: string;
  badge?: 'Chef Special' | 'Bestseller' | 'Seasonal' | 'Must Try';
  spiceLevel?: 0 | 1 | 2 | 3; // 0: mild, 1: mild-medium, 2: spicy, 3: extra spicy
  prepTime?: string;
  serves?: string;
  tags: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  portion: 'half' | 'full';
  unitPrice: number;
  specialInstructions?: string;
}

export interface ReservationData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  timeSlot: string;
  seatingPreference: 'rooftop' | 'family-hall' | 'executive-ac' | 'any';
  specialRequests?: string;
  createdAt: string;
}

export interface BuffetDeal {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  priceAdult: number;
  priceChild: number;
  timing: string;
  days: string;
  features: string[];
  bannerImage: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Dishes' | 'Ambiance' | 'BBQ Live' | 'Rooftop';
  image: string;
  description: string;
}
