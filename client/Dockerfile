FROM node:14-alpine

WORKDIR /app
COPY ./package.json ./package.json
RUN npm i
COPY tsconfig.json tsconfig.json
COPY ./src ./src
COPY ./public ./public

CMD npm start
