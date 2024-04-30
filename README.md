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

## Installation

### Prerequisites
- Install [node.js](https://nodejs.org/en).
- Install [pnpm](https://pnpm.io/pt/installation).
- Install [docker](https://www.docker.com/products/docker-desktop/).
- Install [postgres docker image](https://hub.docker.com/_/postgres).

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
```

4. Generate JWT - RS256 Keys
```bash
# Generate private and public key
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem

# Generate bas64 versions of the key
openssl base64 -in private_key.pem -out private_key_base64.txt
openssl base64 -in public_key.pem -out public_key_base64.txt
```

5. Create a `.ent` file. You can follow the [example](./.env.exemple)
```bash
DATABASE_URL="postgres://your-user-name:your-password@your-hostname:5432/your-database-name"
JWT_PRIVATE_KEY="your-jwt-private-key-in-base64"
JWT_PUBLIC_KEY="your-jwt-public-key-in-base64"
PORT=8080
```

6. Run the application
```bash
# Using npm
npm start

# Using pnpm
pnpm start
```
