import { useState, useEffect, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { PlayingCard } from "./components/playing-card";
import { Button } from "./components/ui/button.tsx";
import { Intro } from "./components/intro";
import { Badge } from "@/components/ui/badge";
import { Card } from "./models/Card";
import { fetchDeckId, drawCard } from "./services/cards-services";
import { calculatePoints } from "./utils";
import confetti from 'canvas-confetti'; // Importa a biblioteca de confetes
import './index.css';

export function App() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const { toast } = useToast();

  const [userHand, setUserHand] = useState<Card[]>([]);
  const [userRoundPoints, setUserRoundPoints] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [userRounds, setUserRounds] = useState(0);

  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [dealerRoundPoints, setDealerRoundPoints] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  // Inicializa o baralho
  const initializeDeck = async () => {
    try {
      const id = await fetchDeckId();
      setDeckId(id);
    } catch (e) {
      setError("Ocorreu um erro ao embaralhar as cartas");
    }
  };

  // Inicia o jogo
  const startGame = async () => {
    setShowIntro(false);
    await resetRound();
  };

  // Reseta a rodada
  const resetRound = useCallback(async () => {
    if (userRounds >= 4) {
      toast({
        title: "Limite de rodadas atingido.",
        description: "As rodadas foram reiniciadas.",
      });
      setUserRounds(0);
      setUserScore(0);
      setDealerScore(0);
    } else {
      const dealerHand = [await drawCard(deckId!)];
      const userHand = [await drawCard(deckId!), await drawCard(deckId!)];

      setUserHand(userHand);
      setDealerHand(dealerHand);

      setUserRoundPoints(calculatePoints(userHand));
      setDealerRoundPoints(calculatePoints(dealerHand));
    }
  }, [deckId, userRounds, toast]);

  // Pede mais uma carta
  const hitMe = async () => {
    const newCard = await drawCard(deckId!);
    const updatedUserHand = [...userHand, newCard];
    setUserHand(updatedUserHand);
    setUserRoundPoints(calculatePoints(updatedUserHand));
  };

  // Stand
  const stand = async () => {
    let currentDealerPoints = dealerRoundPoints;
    let updatedDealerHand = [...dealerHand];

    const dealCardsWithDelay = async () => {
      while (currentDealerPoints < 17) {
        const newCard = await drawCard(deckId!);
        updatedDealerHand = [...updatedDealerHand, newCard];
        currentDealerPoints = calculatePoints(updatedDealerHand);
        
        setDealerHand(updatedDealerHand);
        setDealerRoundPoints(currentDealerPoints);
        
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      if (currentDealerPoints >= userRoundPoints) {
        handleRoundEnd("dealer");
      } else {
        handleRoundEnd("user");
      }
    };

    await dealCardsWithDelay();
  };

  // Gerencia o fim da rodada
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
          showConfetti(); // Chama a função para mostrar confetes
        } else {
          setDealerScore((prevScore) => prevScore + 1);
        }

        setUserHand([]);
        setDealerHand([]);
        setUserRoundPoints(0);
        setDealerRoundPoints(0);

        setUserRounds((prevRounds) => prevRounds + 1);
        await resetRound();
      }, 1000);
    },
    [resetRound, toast]
  );

  // Função para gerar confetes
  const showConfetti = () => {
    const count = 200; // Número de confetes
    const defaults = {
      origin: { y: 0.7 },
    };

    for (let i = 0; i < count; i++) {
      confetti({
        ...defaults,
        angle: Math.random() * 360,
        spread: Math.random() * 360,
        startVelocity: 30,
        decay: 0.9,
        scalar: 1.2,
        ticks: 60,
      });
    }
  };

  // Sair do jogo
  const exitGame = () => {
    setShowIntro(true);
    setUserHand([]);
    setUserRoundPoints(0);
    setDealerHand([]);
    setDealerRoundPoints(0);
    setUserScore(0);
    setDealerScore(0);
    setUserRounds(0);
  };

  // Efeito para inicializar o baralho
  useEffect(() => {
    initializeDeck();
  }, []);

  // Efeito para gerenciar o resultado das rodadas
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

  // Se estiver na tela de introdução, mostra a introdução
  if (showIntro) {
    return <Intro showIntro={showIntro} startGame={startGame} />;
  }

  // Renderiza o jogo
  return (
    <>
      <Toaster />
      {error && <div>{error}</div>}
      <div className="flex h-screen items-center gap-8 flex-col justify-center">
        <div className="flex justify-around w-full">
          <div className="container">
            <Button className="button-sair" onClick={exitGame}>Sair</Button>
            <div>
              <span className="badge1">Você</span>
              <p className="rounds-won">Rodadas ganhas: {userScore}</p>
              <p className="current-points">Pontuação atual: {userRoundPoints}</p>
            </div>
            <p className="rounds-played">Rodadas jogadas: {userRounds} / 4</p>
            <div>
              <span className="badge2">Dealer</span>
              <p className="rounds-won2">Rodadas ganhas: {dealerScore}</p>
              <p className="current-points2">Pontuação atual: {dealerRoundPoints}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col gap-12">
          <div>
            <h2 className="dealer-h2">Dealer:</h2>
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
            <h2 className="voce-h2">Você:</h2>
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
          <Button className="button-stand" onClick={stand}>Stand</Button>
        </div>
      </div>
    </>
  );
}
