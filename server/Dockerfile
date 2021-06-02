FROM node:12.16.1-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .

# CMD node server.ts