# Build from repository root:
#   docker build -f docker/Dockerfile -t casper-deployer .
FROM --platform=linux/amd64 node:22-alpine AS build
WORKDIR /app

COPY casper-rust-wasm-sdk ./casper-rust-wasm-sdk
COPY wasm ./wasm
COPY www/package.json www/package-lock.json ./www/
WORKDIR /app/www
RUN npm ci

COPY www ./
ENV PORT=4242
RUN npm run build

FROM --platform=linux/amd64 node:22-alpine AS production
WORKDIR /app

COPY --from=build /app/www/dist /app/www/dist
COPY --from=build /app/www/package.json /app/www/package.json
COPY --from=build /app/www/node_modules/casper-rust-wasm-sdk-nodejs /app/node_modules/casper-rust-wasm-sdk-nodejs

RUN npm install --omit=dev \
  @nestjs/common \
  @nestjs/core \
  @nestjs/platform-express \
  http-proxy-middleware \
  reflect-metadata \
  rxjs \
  tslib

ENV PORT=4242
EXPOSE 4242

WORKDIR /app/www
CMD ["npm", "run", "serve"]
