# Etapa 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia apenas package.json para cachear dependências
COPY package*.json ./
RUN npm install

# Copia o resto do código (agora node_modules está ignorado)
COPY . .

RUN npm run build --no-lint

# Etapa 2: imagem final
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
