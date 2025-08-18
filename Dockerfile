# Usa uma imagem oficial do Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json (se houver) primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install --production

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que seu app vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
