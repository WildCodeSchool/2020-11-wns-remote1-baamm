FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY routes/index.ts routes/index.ts
COPY data/askTalking.ts data/askTalking.ts
COPY server.ts server.ts

CMD node server.ts