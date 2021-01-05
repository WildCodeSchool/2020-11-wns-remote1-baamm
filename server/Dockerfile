FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY routes/index.js routes/index.js
COPY data/askTalking.js data/askTalking.js
COPY server.js server.js

CMD node server.js