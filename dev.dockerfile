FROM node:20 AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN pnpm prisma generate
RUN pnpm build

FROM node:20-alpine3.19 AS deploy

WORKDIR /usr/src/app
RUN npm i -g pnpm prisma
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=build /usr/src/app/tsconfig.build.json ./tsconfig.build.json
COPY --from=build /usr/src/app/nest-cli.json ./nest-cli.json
COPY --from=build /usr/src/app/test ./test
COPY --from=build /usr/src/app/vitest.config.e2e.mts ./vitest.config.e2e.mts
COPY --from=build /usr/src/app/vitest.config.mts ./vitest.config.mts
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma

RUN apk update && apk add openssl
RUN openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
RUN openssl rsa -pubout -in private_key.pem -out public_key.pem
RUN export JWT_PRIVATE_KEY=$(openssl base64 -in private_key.pem) && echo "JWT_PRIVATE_KEY=$JWT_PRIVATE_KEY" >> .env
RUN export JWT_PUBLIC_KEY=$(openssl base64 -in public_key.pem) && echo "JWT_PUBLIC_KEY=$JWT_PUBLIC_KEY" >> .env
EXPOSE 8080

CMD pnpm prisma migrate deploy && pnpm start:dev