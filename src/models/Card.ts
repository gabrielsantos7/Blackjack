export interface Card {
  value: string;
  suit: string;
  image: string;
}

export interface ShuffleCardResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export interface DrawCardResponse {
  success: boolean;
  deck_id: string;
  cards: Card[];
  remaining: number;
}
