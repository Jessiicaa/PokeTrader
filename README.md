# Projeto: Poke Trader

## Descrição do Projeto

Projeto desenvolvido para calcular se uma troca entre pokemons é justa ou não. Para estabelecer se a troca era justa ou não, foi considerado o módulo da diferença entre a soma do base_experience dos pokemons que iriam ser trocados. Se a diferença fosse menor que 10% da maior soma de base_experience, é considerada uma troca justa.

## Subir o Back End

### Local

```bash
# Clone este repositório
$ git clone <https://github.com/Jessiicaa/PokeTrader/>

# Acesse a pasta do projeto no terminal/cmd
$ cd PokeTrader

# Abra o projeto no VSCode
$ code .

# Instale as dependências
$ yarn

# Execute o Docker
$ docker-compose up -d

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# O servidor inciará na porta:3333
```

### Produção

Foi realizado o deploy da aplicação no Heroku.
- Link: <https://poke-trader-jessica.herokuapp.com/>

## Endpoints

- [POST] - Criar uma troca
  - ```https://poke-trader-jessica.herokuapp.com/```
  - Calcula se uma troca é justa ou não e se for, salva no banco
  - Corpo da requisição:

``` json
{
	"pokemonsPlayerOne": ["weedle", "eevee"],
	"pokemonsPlayerTwo": ["caterpie", "charmander"]
}
```
- Resposta:
```json
{
  "pokemonsPlayerOne": [
    {
      "name": "weedle",
      "baseExperience": 39
    },
    {
      "name": "eevee",
      "baseExperience": 65
    }
  ],
  "pokemonsPlayerTwo": [
    {
      "name": "caterpie",
      "baseExperience": 39
    },
    {
      "name": "charmander",
      "baseExperience": 62
    }
  ],
  "fairTrade": "This trade is fair"
}
 ```
- [GET] - Lista as trocas realizadas
  - Retorna uma lista com as trocas realizadas
  - ```https://poke-trader-jessica.herokuapp.com/trades```
  - Resposta
```json
[
  {
    "first_player_pokemons": [
      {
        "name": "weedle",
        "baseExperience": 39
      },
      {
        "name": "eevee",
        "baseExperience": 65
      }
    ],
    "second_player_pokemons": [
      {
        "name": "caterpie",
        "baseExperience": 39
      },
      {
        "name": "charmander",
        "baseExperience": 62
      }
    ],
    "_id": "60f77c1b3cc31ab7c776c66a",
    "first_player_id": "MXkPy",
    "second_player_id": "6cmcd",
    "createdAt": "2021-07-21T01:44:59.734Z",
    "updatedAt": "2021-07-21T01:44:59.734Z"
  }
]
```
