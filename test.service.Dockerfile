FROM node:14-alpine

RUN apk update && apk add bash

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm i nodemon -g

RUN chmod +x ./wait-for-it.sh

CMD ["./wait-for-it.sh", "db-project-test:5432", "--", "npm","run","start-dev"]

EXPOSE 3000