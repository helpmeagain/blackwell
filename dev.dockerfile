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

FROM node:20-alpine3.19 AS deploy

WORKDIR /usr/src/app
RUN npm i -g pnpm prisma
COPY --from=build /usr/src/app/. .

EXPOSE 8080

CMD [ "pnpm", "start:dev" ]