# Loja - Fake Store API (React Native + TypeScript + Expo)

## Como rodar

1. Abra um terminal DENTRO desta pasta (a que tem o package.json).
2. Instale as dependências:
   npm install
3. Inicie o projeto:
   npm run start
4. Escaneie o QR code com o app Expo Go no celular
   (celular e computador na mesma rede Wi-Fi).

## Onde está o código

- App.tsx                      -> controla a tela atual e o carrinho (sem biblioteca de navegação)
- src/types.ts                 -> tipos TypeScript
- src/api.ts                   -> chamadas à Fake Store API
- src/screens/StoreScreen.tsx  -> lista de produtos
- src/screens/DetailsScreen.tsx-> detalhes do produto
- src/screens/CartScreen.tsx   -> carrinho
