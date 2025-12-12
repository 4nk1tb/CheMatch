export interface WasteItem {
  id: string;
  name: string;
  generator: string;
  purity: number; // Percentage
  price: string;
  location: string;
  compatibilityScore: number;
  description: string;
}

export type SwipeDirection = 'left' | 'right';

export interface StatProps {
  label: string;
  value: string;
  suffix?: string;
  delay?: number;
}

export interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
  isAiGenerated?: boolean;
}

export interface MatchProfile {
  id: string;
  companyName: string;
  wasteName: string;
  avatarUrl?: string;
  lastMessage: string;
  unreadCount: number;
  dealStatus: 'new' | 'negotiating' | 'closed';
  messages: Message[];
}
