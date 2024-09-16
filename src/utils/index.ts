import { Card } from "@/models/Card";

export function calculatePoints(hand: Card[]): number {
  let total = 0;
  let aces = 0;

  hand.forEach((card) => {
    if (card.value === "ACE") {
      aces++;
    } else if (
      card.value === "JACK" ||
      card.value === "QUEEN" ||
      card.value === "KING"
    ) {
      total += 10;
    } else {
      total += parseInt(card.value);
    }
  });

  while (total + aces * 11 > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total + aces * 11;
}
