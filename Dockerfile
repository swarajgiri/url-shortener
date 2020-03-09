FROM node:12-alpine

WORKDIR /home/node/app
ADD src ./

RUN apk add yarn && yarn

USER node