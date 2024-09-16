import { useState, useEffect } from "react";
import { fetchDeckId, drawCard } from "./services/cards-services";
import { Intro } from "./components/intro";

export function App() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const initializeDeck = async () => {
      try {
        const id = await fetchDeckId();
        setDeckId(id);
      } catch (e) {
        setError("Ocorreu um erro ao embaralhar as cartas");
      } finally {
        setLoading(false);
      }
    };

    initializeDeck();
  }, []);

  return (
    <>
      {loading && <div>Carregando...</div>}
      {error && <div>{error}</div>}
      <Intro showIntro={showIntro} setShowIntro={setShowIntro} />
      <div className="bg-[url('/wallpaper.jpg')] bg-center bg-no-repeat h-screen w-full flex items-center justify-center">
        <div className="bg-neutral-100 rounded-lg max-w-xl flex items-center justify-center">
          <h2>Dealer:</h2>
          <h2>You:</h2>
        </div>
      </div>
    </>
  );
}
