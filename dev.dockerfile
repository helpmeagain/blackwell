FROM node:24-alpine3.21 AS base

RUN npm i -g pnpm
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

RUN npm i -g pnpm prisma

RUN if [ ! -f private_key.pem ]; then \
      apk update && apk add openssl && \
      openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048 && \
      openssl rsa -pubout -in private_key.pem -out public_key.pem; \
    fi

EXPOSE 8080
CMD pnpm prisma generate && pnpm start:dev