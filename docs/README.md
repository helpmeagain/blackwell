# Design dirigido à domínio

Precisamos entender o problema que o cliente coloca
DDD não tem correlação direta com a implementação no código, tampouco com camadas. Para a parte do código, temos que pensar em como fazer de forma limpa, ou seja, sem pensar em banco da dados, bibliotecas e frameworks.

## Domínio

- Domain Experts: são as pessoas que tem todo o conhecimento sobre as necessidades do negócio, apoiando a modelagem do software. Assim, a **conversa** é extremamente necessária.
- Linguagem ubíqua: conjunto de termos que devem ser plenamente entendidos tanto por especialistas no domínio  como por desenvolvedores.

## Conceitos

- Agregados
- Value Objects
- Eventos de domínio
- Subdomínios (Bounded Contexts)
- Entidades
- Casos de uso

# Entidades e casos de usos
Tudo que é factível na aplicação. Geralmente será descoberto na conversa com o Domain Expert.

"Eu tenho que responder os alunos e eu me perco em quais dúvidas já foram respondidas"

- Partes que vão se transformar em entidades: eu, alunos
- Partes que vão se transformar em casos de uso: responder