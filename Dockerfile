# Usa uma imagem leve do Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json primeiro
COPY package*.json ./

# Instala todas as dependências (dev e prod, para poder gerar o Prisma Client)
RUN npm install

# Copia o restante do código
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Expõe a porta que o app vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
