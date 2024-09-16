import { useState, useEffect } from "react";
import ReactFlipCard from "reactjs-flip-card";
import { Card } from "@/models/Card";
import BackImage from "/back.png";

interface PlayingCardProps {
  card: Card | null;
  canFlip: boolean;
  isFaceUp: boolean;
  onCardClick?: () => void;
}

export function PlayingCard({
  card,
  canFlip,
  isFaceUp,
  onCardClick,
}: PlayingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Quando a carta é virada para cima (isFaceUp é true), inicia o efeito de flip
    if (card && isFaceUp) {
      setIsFlipped(false); // Inicialmente virada para baixo
      setTimeout(() => setIsFlipped(true), 300); // Faz o efeito de virar após 300ms
    }
  }, [card, isFaceUp]);

  const handleCardClick = () => {
    if (card === null && onCardClick) {
      onCardClick();
    }
  };

  // Renderiza a carta quando for nula (gerar nova carta)
  if (card === null) {
    return (
      <div onClick={handleCardClick}>
        <ReactFlipCard
          frontComponent={
            <img src={BackImage} alt="back" className="max-h-48" />
          }
          frontCss="cursor-pointer hover:scale-105 duration-200"
          backComponent={null}
          flipTrigger="disabled"
        />
      </div>
    );
  }

  // Controla se a carta está virada manualmente com base no estado `isFlipped`
  return (
    <ReactFlipCard
      frontComponent={<img src={BackImage} alt="back" className="max-h-48" />}
      backComponent={
        <img src={card.image} alt={card.code} className="max-h-48" />
      }
      flipTrigger="disabled" // Desabilita o flip por evento e controla via estado
      flipByProp={isFlipped} // Controla o flip manualmente pelo estado
      onClick={canFlip ? () => setIsFlipped((prev) => !prev) : undefined}
    />
  );
}
