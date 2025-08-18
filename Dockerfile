# Usa Node.js oficial baseado em Debian (não Alpine)
FROM node:20

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Expõe a porta que o app vai rodar
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]
