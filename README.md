# Blackwell &middot; [![version](https://img.shields.io/github/package-json/v/felipecomarques/blackwell)](./package.json) [![license](https://img.shields.io/github/license/felipecomarques/blackwell)](./LICENSE.md) [![unit tests](https://img.shields.io/github/actions/workflow/status/felipecomarques/blackwell/run-unit-tests.yml?branch=main&event=push&logo=vitest&logoColor=%23ffffff&label=unit%20tests)](https://github.com/felipecomarques/blackwell/actions/workflows/run-unit-tests.yml) [![e2e tests](https://img.shields.io/github/actions/workflow/status/felipecomarques/blackwell/run-e2e-tests.yml?branch=main&event=push&style=flat&logo=vitest&logoColor=white&label=e2e%20tests)](https://github.com/felipecomarques/blackwell/actions/workflows/run-e2e-tests.yml)

A medical clinic API for managing medical services.

## Technologies
<!-- [![Technologies](https://skillicons.dev/icons?i=ts,prisma,nestjs,postgres,vitest)](./package.json) -->
![Typescript](https://img.shields.io/badge/Typescript-blue?style=for-the-badge&logo=Typescript&logoColor=white
)
![NestJS](https://img.shields.io/badge/NestJS-%23ff3232?style=for-the-badge&logo=NestJS&logoColor=white
)
![Prisma](https://img.shields.io/badge/Prisma-%2320b2aa?style=for-the-badge&logo=Prisma&logoColor=white
)
![Vitest](https://img.shields.io/badge/Vitest-%259b19?style=for-the-badge&logo=Vitest&logoColor=white
)
![Postgres](https://img.shields.io/badge/Postgres-%23585ce4?style=for-the-badge&logo=PostgreSQL&logoColor=white
)
![Docker](https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=docker&logoColor=white
)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-grey?style=for-the-badge&logo=githubactions&logoColor=white)

## Documentation

- [API Reference](./docs/api-reference.md)

## Local installation

<details>
<summary><strong>Install with docker compose (recommended)</strong></summary>

### Prerequisites

- Install [docker](https://www.docker.com/products/docker-desktop/).

### Docker setup
To run this project locally, follow these steps:
1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd <project-directory>
```

3. Run the docker compose:
```bash
docker-compose up --build -d
```

4. Access the application in the localhost

</details>

<details>
<summary><strong>Install with script</strong></summary>

### Prerequisites
- Install [node.js](https://nodejs.org/en).
- Install [postgres](https://www.postgresql.org/).

### Local setup
    
To run this project locally, follow these steps:
1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd <project-directory>
```

3. Run the script:
```bash
docs/scripts/setup.sh
```

4. Insert the database URL when prompted:
```bash
Enter your PostgreSQL URL: postgres://your-user-name:your-password@your-hostname:5432/your-database-name
```

5. Start the server
```bash
# Using npm
npm start:prod

# Using pnpm
pnpm start:prod

# Using yarn
yarn start:prod
```

6. Access the application in the localhost

</details>

<details>
<summary><strong>Install manually</strong></summary>

### Prerequisites
- Install [node.js](https://nodejs.org/en).
- Install [postgres](https://www.postgresql.org/).

### Local setup
    
To run this project locally, follow these steps:
1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd <project-directory>
```

3. Install dependencies:
```bash
# Using npm
npm install

# Using pnpm
pnpm install

# Using yarn
yarn install
```

4. Open postgres server and copy the URL in a `.env` file (you can follow the [example](./.env.exemple)):

```bash
DATABASE_URL="postgres://your-user-name:your-password@your-hostname:5432/your-database-name"
```

5. Generate files for Prisma data model:
```bash
# Using npm
npx prisma generate

# Using pnpm
pnpm prisma generate
```

6. Generate JWT - RS256 Keys:
```bash
# Generate private and public key
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem

# Generate base64 versions of the key
openssl base64 -in private_key.pem -out private_key_base64.txt
openssl base64 -in public_key.pem -out public_key_base64.txt
```

7. Copy and paste the JWT - RS256 (base64) in the `.env` file (you can follow the [example](./.env.exemple)):
```bash
JWT_PRIVATE_KEY="your-jwt-private-key-in-base64"
JWT_PUBLIC_KEY="your-jwt-public-key-in-base64"
```

8. Build the application:
```bash
# Using npm
npm build

# Using pnpm
pnpm build
```

9. Run the application:
```bash
# Using npm
npm start:prod

# Using pnpm
pnpm start:prod
```

10. Access the application in the localhost

</details>
