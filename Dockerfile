FROM node:lts-slim

ARG SERVICE_URL
ARG SERVICE_PORT

ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_NAME

ARG MANAGE_USERNAME
ARG MANAGE_PASSWORD

ARG SC_RUN_INTERVAL_DAYS
ARG SC_DELETE_THRESHOLD_DAYS

ENV NODE_ENV=production
ENV NODE_PATH=./dist/src

WORKDIR /usr/src/bulb-project-api

COPY package.json tsconfig.json tsconfig.build.json yarn.lock ./
COPY src ./src

RUN yarn --production && yarn cache clean --force && yarn build

EXPOSE $SERVICE_PORT

CMD ["node", "dist/src/main.js"]
