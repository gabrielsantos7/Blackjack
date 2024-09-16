import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IntroProps {
  showIntro: boolean;
  startGame: () => void;
}

export function Intro({ showIntro, startGame }: IntroProps) {
  if (!showIntro) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-black/80 grid place-items-center z-10">
      <div className="rounded-md bg-neutral-100 p-4 flex items-center justify-center gap-2 flex-col">
        <h2 className="text-xl font-semibold">BlackJack</h2>

        <p className="mb-4">Bem-vindo ao nosso jogo de BlackJack!</p>
        <Button onClick={startGame}>Jogar</Button>
        <Dialog>
          <DialogTrigger>Regras</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Como Jogar Blackjack</DialogTitle>
              <DialogDescription>
                O Blackjack é um jogo simples, com o objetivo de atingir 21
                pontos. O valor das cartas numéricas é igual ao número da carta
                já as cartas de figuras (Rei, Rainha, Valete) valem 10 pontos. O
                Ás pode valer 1 ou 11, dependendo do que for mais vantajoso.
                Você joga contra o dealer, começando com duas cartas e pode
                "Pedir" (solicitar mais cartas) ou "Manter" (ficar com a mão
                atual). O objetivo é somar 21 pontos ou ficar o mais próximo
                disso, sem ultrapassar esse valor. Se suas cartas ultrapassarem
                21, você perde automaticamente ("estourou"). O dealer também
                recebe cartas e segue regras fixas, como "pedir" até atingir 17
                ou mais pontos.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
