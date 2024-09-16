import { useState, useEffect, useCallback } from "react";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { PlayingCard } from "./components/playing-card";
import { Button } from "./components/ui/button";
import { Intro } from "./components/intro";
import { Badge } from "@/components/ui/badge";

import { Card } from "./models/Card";
import { fetchDeckId, drawCard } from "./services/cards-services";
import { calculatePoints } from "./utils";

export function App() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const { toast } = useToast();

  const [userHand, setUserHand] = useState<Card[]>([]);
  const [userRoundPoints, setUserRoundPoints] = useState(0);
  const [userScore, setUserScore] = useState(0); // Pontuação do usuário

  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [dealerRoundPoints, setDealerRoundPoints] = useState(0);
  const [dealerScore, setDealerScore] = useState(0); // Pontuação do dealer

  const initializeDeck = async () => {
    try {
      const id = await fetchDeckId();
      setDeckId(id);
    } catch (e) {
      setError("Ocorreu um erro ao embaralhar as cartas");
    }
  };

  const startGame = async () => {
    setShowIntro(false);
    await resetRound();
  };

  const resetRound = useCallback(async () => {
    const dealerHand = [await drawCard(deckId!)];
    const userHand = [await drawCard(deckId!), await drawCard(deckId!)];

    setUserHand(userHand);
    setDealerHand(dealerHand);

    setUserRoundPoints(calculatePoints(userHand));
    setDealerRoundPoints(calculatePoints(dealerHand));
  }, [deckId]);

  const hitMe = async () => {
    const newCard = await drawCard(deckId!);
    const updatedUserHand = [...userHand, newCard];
    setUserHand(updatedUserHand);
    setUserRoundPoints(calculatePoints(updatedUserHand));
  };

  const stand = async () => {
    let currentDealerPoints = dealerRoundPoints;
    let updatedDealerHand = [...dealerHand];

    while (currentDealerPoints < 17) {
      const newCard = await drawCard(deckId!);
      updatedDealerHand = [...updatedDealerHand, newCard];
      currentDealerPoints = calculatePoints(updatedDealerHand);
    }

    setDealerHand(updatedDealerHand);
    setDealerRoundPoints(currentDealerPoints);

    if (currentDealerPoints >= userRoundPoints) {
      handleRoundEnd("dealer");
    } else {
      handleRoundEnd("user");
    }
  };

  const handleRoundEnd = useCallback(
    async (winner: "user" | "dealer") => {
      setTimeout(async () => {
        toast({
          title: "A rodada terminou.",
          description:
            winner === "user" ? "Parabéns, você venceu!" : "Não foi dessa vez...",
        });
        if (winner === "user") {
          setUserScore((prevScore) => prevScore + 1);
        } else {
          setDealerScore((prevScore) => prevScore + 1);
        }

        setUserHand([]);
      setDealerHand([]);
      setUserRoundPoints(0);
      setDealerRoundPoints(0);

      // Reiniciar o deck e distribuir novas cartas
      await initializeDeck(); // Obter um novo deck
      await resetRound(); // Distribuir novas cartas
      }, 1000)
      
    },
    [resetRound, toast]
  );

  const exitGame = () => {
    setShowIntro(true);
    setUserHand([]);
    setUserRoundPoints(0);
    setDealerHand([]);
    setDealerRoundPoints(0);
    setUserScore(0);
    setDealerScore(0);
  };

  useEffect(() => {
    initializeDeck();
  }, []);

  useEffect(() => {
    if (userRoundPoints > 21) {
      handleRoundEnd("dealer");
    } else if (dealerRoundPoints > 21) {
      handleRoundEnd("user");
    } else if (userRoundPoints === 21) {
      handleRoundEnd("user");
    } else if (dealerRoundPoints >= 17 && dealerRoundPoints > userRoundPoints) {
      handleRoundEnd("dealer");
    }
  }, [userRoundPoints, dealerRoundPoints, handleRoundEnd]);

  if (showIntro) {
    return <Intro showIntro={showIntro} startGame={startGame} />;
  }

  return (
    <>
      <Toaster />
      {error && <div>{error}</div>}
      <div className="flex h-screen items-center gap-8 flex-col justify-center">
        <div className="flex justify-around  w-full">
          <div className="flex items-center gap-4">
            <div>
              <Badge>Você</Badge>
              <p>Rodadas ganhas: {userScore}</p>
              <p>Pontuação atual: {userRoundPoints}</p>
            </div>
            <div>
              <Badge>Dealer</Badge>
              <p>Rodadas ganhas: {dealerScore}</p>
              <p>Pontuação atual: {dealerRoundPoints}</p>
            </div>
          </div>
          <Button onClick={exitGame}>Sair</Button>
        </div>

        <div className="flex items-center justify-center flex-col gap-12">
          <div>
            <h2 className="font-bold text-2xl pb-2 text-neutral-900 text-center">
              Dealer:
            </h2>
            <div className="flex gap-4">
              {dealerHand.map((card, index) => (
                <PlayingCard
                  key={index}
                  card={card}
                  canFlip={false}
                  isFaceUp={true}
                />
              ))}
              <PlayingCard card={null} canFlip={false} isFaceUp={false} />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-2xl pb-2 text-neutral-900 text-center">
              Você:
            </h2>
            <div className="flex gap-4">
              {userHand.map((card, index) => (
                <PlayingCard
                  key={index}
                  card={card}
                  canFlip={false}
                  isFaceUp={true}
                />
              ))}
              <PlayingCard
                card={null}
                canFlip={true}
                isFaceUp={false}
                onCardClick={hitMe}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-8 gap-4">
          <Button onClick={stand}>Stand</Button>
        </div>
      </div>
    </>
  );
}
