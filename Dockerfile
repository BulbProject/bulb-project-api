FROM node:lts-slim

ARG SERVICE_PROTOCOL
ARG SERVICE_HOST
ARG SERVICE_PORT

ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_NAME

ENV NODE_ENV=production
ENV NODE_PATH=./build/app

WORKDIR /usr/src/bulb-project-api

COPY package.json tsconfig.json yarn.lock ./
COPY src ./src

RUN yarn --production && yarn cache clean --force && yarn build

EXPOSE $SERVICE_PORT

CMD ["node", "build/app/index.js"]
