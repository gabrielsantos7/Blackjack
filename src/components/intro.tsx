import { Button } from "@/components/ui/button";
import "../index.css"
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
        <Button className="Button" onClick={startGame}>Jogar</Button>


        <Dialog>
  <DialogTrigger className="DialogTrigger">Regras</DialogTrigger>
  <DialogContent className="DialogContent">
    <DialogHeader className="DialogHeader">
      <DialogTitle className="DialogTitle">Como Jogar Blackjack</DialogTitle>
      <DialogDescription className="DialogDescription">
        <div className="game-instructions">
          <p>
            O <strong>Blackjack</strong> é um jogo simples, onde o objetivo é atingir <strong>21 pontos</strong>.
          </p>
          <p>Aqui estão os valores das cartas:</p><br></br>
          <ul className="card-values">
            <li><strong>Cartas numéricas:</strong> valem seu valor nominal (ex: 2 vale 2 pontos).</li>
            <li><strong>Figuras (Rei, Rainha, Valete):</strong> cada uma vale <strong>10 pontos</strong>.</li>
            <li><strong>Ás:</strong> pode valer <strong>1</strong> ou <strong>11</strong>, dependendo do que for mais vantajoso.</li>
          </ul>
          <p>Você joga contra o dealer e começa com duas cartas. Durante o jogo, você pode:</p>
          <ul className="game-actions"> <br></br>
            <li><strong1>Pedir:</strong1> solicitar mais cartas.</li>
            <li><strong1>Manter:</strong1> ficar com a mão atual.</li>
          </ul>
          <p>
            O objetivo é somar 21 pontos ou ficar o mais próximo disso, sem ultrapassar esse valor. 
            Se suas cartas ultrapassarem 21, você perde automaticamente ("estourou").
            
          </p>
          <p><br></br>
            O dealer também recebe cartas e segue regras fixas, como "pedir" até atingir 17 ou mais pontos.
          </p>
        </div>

        

      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


      </div>
    </div>
  );
}
