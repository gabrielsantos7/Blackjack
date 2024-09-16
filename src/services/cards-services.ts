import { Card } from "../models/Card";

const apiUrl: string = "https://www.deckofcardsapi.com/api/deck";


export async function fetchDeckId(): Promise<string> {
  const response = await fetch(`${apiUrl}/new/shuffle/?deck_count=6`);
  const data = await response.json();
  return data.deck_id;
}

export async function drawCard(deckId: string): Promise<Card> {
    const response = await fetch(`${apiUrl}/${deckId}/draw/?count=1`);
    const data = await response.json();
    return data.cards[0];
}
