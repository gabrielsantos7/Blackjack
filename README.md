Resumo das Atualizações do Jogo de Cartas
Funcionalidades Implementadas
Inicialização do Jogo: O jogo agora começa com um deck de cartas embaralhadas, fornecendo uma nova experiência a cada partida.

Mecânica de Jogo:

O jogador pode "Pedir" cartas (Hit) e "Parar" (Stand).
A pontuação do jogador e do dealer é calculada com base nas cartas recebidas.


Virar Cartas do Dealer:

Ao escolher "Stand", as cartas do dealer são viradas uma a uma, com um atraso de 1 segundo entre cada uma, melhorando a visualização e a tensão do jogo.


Condições de Vitória:

O jogo verifica se o jogador ou o dealer venceu, estourou (mais de 21 pontos) ou atingiu 21 pontos.
Se o jogador vencer, seu contador de vitórias é incrementado.


Rodadas Limitadas:

O jogador pode jogar até 4 rodadas. Ao final desse limite, o jogo reinicia automaticamente.
Interface do Usuário:

As mãos do jogador e do dealer são exibidas de forma clara.
Informações sobre a pontuação e o número de rodadas jogadas são apresentadas de forma acessível.



Sistema de Saída:

O jogador pode sair do jogo a qualquer momento, reiniciando todas as pontuações e cartas.



Estrutura do Código


O código é modularizado, facilitando a manutenção e futuras adições de funcionalidades.
A lógica do jogo é separada em funções para melhorar a legibilidade e a organização.