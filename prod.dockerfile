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
RUN pnpm prune --prod

FROM node:20-alpine3.19 AS deploy

WORKDIR /usr/src/app
RUN npm i -g pnpm prisma
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/src/presentation/utils/images/logo.png ./src/presentation/utils/images/logo.png

EXPOSE 8080

CMD [ "pnpm", "start:prod" ]