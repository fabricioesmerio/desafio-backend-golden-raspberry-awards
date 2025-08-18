# Desafio Backend Golden Raspberry Awards API

Uma API em Node.js que fornece informações sobre os vencedores do Golden Raspberry Awards, incluindo o produtor com o maior intervalo entre dois prêmios consecutivos e aquele que obteve dois prêmios mais rápido.

A API possui **uma rota principal**:

## Rota

- **GET** `/api/intervals`

  Retorna um JSON com:
  - `max`: produtor com maior intervalo entre dois prêmios consecutivos.
  - `min`: produtor que obteve dois prêmios consecutivos mais rapidamente. **Exemplo de resposta:**
  ```json
  {
    "max": {
      "producer": "Producer Name",
      "interval": 10,
      "previousWin": 2000,
      "followingWin": 2010
    },
    "min": {
      "producer": "Producer Name",
      "interval": 1,
      "previousWin": 2005,
      "followingWin": 2006
    }
  }
  ```

> **Observação:** O arquivo CSV com os dados deve ser colocado dentro da pasta `data` e ter o nome como movielist para que a API funcione corretamente.

---

## Requisitos

- **Node.js** v18 ou superior
- **npm** v9 ou superior
- Pacotes utilizados:
  - `express` ^5.1.0
  - `csv-parse` ^6.1.0
  - `sql.js` ^1.13.0

---

## Instalação e execução

Siga os passos abaixo para rodar a API localmente:

1. **Clone o repositório**

```bash
git clone https://github.com/fabricioesmerio/desafio-backend-golden-raspberry-awards.git
cd desafio-backend-golden-raspberry-awards
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute a API**

```bash
npm start
```

Por padrão, a API estará disponível em [http://localhost:3000](http://localhost:3000).


3. **Execute os testes**

```bash
npm run test
```
---

## Estrutura do projeto

- `src/routes` – define as rotas da API.
- `src/repositories` – lógica de manipulação dos dados salvo em memória.
- `src/services` – serviços de leitura de CSV e cálculo de intervalos.
- `data` – arquivos de dados CSV usados pela API.

---

## Funcionalidades principais

- Retorna produtor com **maior intervalo** entre prêmios consecutivos.
- Retorna produtor com **menor intervalo** (dois prêmios mais rápidos).
- Consome dados de CSV e processa via **sql.js**.
- Estrutura modular e organizada para facilitar manutenção.

---

## Contato / Autor

- **Autor:** Fabricio Esmerio
- **Email:** [fabricio1esmerio@gmail.com](mailto\:fabricio1esmerio@gmail.com)
- **GitHub:** [github.com/fabricioesmerio](https://github.com/fabricioesmerio)

