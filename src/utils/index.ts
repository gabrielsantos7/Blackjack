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
      total += parseInt(card.value); // Adiciona o valor das cartas numéricas
    }
  });

  // Ajusta o total para os Aces
  while (total + aces * 11 > 21 && aces > 0) {
    total -= 10; // Considera um Ás como 1 em vez de 11
    aces--;
  }

  return total + aces; // Adiciona os Aces contados como 1
}

export function determineWinner(playerScore: number, dealerScore: number): string {
  if (playerScore > 21) {
    return "Dealer wins! Player busted.";
  } else if (dealerScore > 21) {
    return "Player wins! Dealer busted.";
  } else if (playerScore === dealerScore) {
    return "It's a tie!";
  } else if (playerScore > dealerScore) {
    return "Player wins!";
  } else {
    return "Dealer wins!";
  }
}

