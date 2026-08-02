# Build from repository root:
#   docker build -f docker/Dockerfile -t casper-deployer .
FROM --platform=linux/amd64 node:24-alpine AS build
WORKDIR /app

COPY casper-rust-wasm-sdk ./casper-rust-wasm-sdk
COPY wasm ./wasm
COPY www/package.json www/package-lock.json www/decorate-angular-cli.js ./www/
WORKDIR /app/www
RUN npm ci

COPY www ./
ENV PORT=4242
RUN npm run build

FROM --platform=linux/amd64 node:24-alpine AS production
WORKDIR /app/www

COPY --from=build /app/www/dist ./dist
COPY --from=build /app/www/package.json ./package.json
# file: deps are symlinks in the build stage — copy the real pack contents.
COPY --from=build /app/casper-rust-wasm-sdk/pkg-nodejs ./node_modules/casper-rust-wasm-sdk-nodejs

RUN npm install --omit=dev --no-fund --no-audit \
  @nestjs/common \
  @nestjs/core \
  @nestjs/platform-express \
  express \
  http-proxy-middleware \
  reflect-metadata \
  rxjs \
  tslib

ENV PORT=4242
EXPOSE 4242

# Render / Docker start: cd www && npm run serve
CMD ["npm", "run", "serve"]
