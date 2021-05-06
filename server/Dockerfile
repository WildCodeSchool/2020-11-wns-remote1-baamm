FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .

# CMD node server.ts