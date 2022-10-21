# syntax=docker/dockerfile:1

FROM node:18.7.0-alpine3.16
RUN apk update && apk add unzip
WORKDIR /app
ENV PORT=4200
ENV API_URL=http://localhost
ARG USER=1000
ARG FILE="master.zip"
ARG TMP="./tmp"
ARG CSPR="casper-deployer-hackathon-oct-2022-master"
ARG WWW="www"

RUN npm install -g npm@8.19.2

ADD https://github.com/gRoussac/casper-deployer-hackathon-oct-2022/archive/refs/heads/${FILE} .
RUN unzip ${FILE} -d ${TMP}
RUN ls -al ${TMP}
RUN mv ${TMP}/*/${WWW}/* ./
RUN npm install --loglevel=error
RUN npm run build --loglevel=error && npm run serve

# # USER ${USER}