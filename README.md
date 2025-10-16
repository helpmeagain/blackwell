# Blackwell &middot; [![version](https://img.shields.io/github/package-json/v/helpmeagain/blackwell)](./package.json) [![license](https://img.shields.io/github/license/helpmeagain/blackwell)](./LICENSE.md) [![unit tests](https://img.shields.io/github/actions/workflow/status/helpmeagain/blackwell/run-unit-tests.yml?branch=main&event=push&logo=vitest&logoColor=%23ffffff&label=unit%20tests)](https://github.com/helpmeagain/blackwell/actions/workflows/run-unit-tests.yml) [![e2e tests](https://img.shields.io/github/actions/workflow/status/helpmeagain/blackwell/run-e2e-tests.yml?branch=main&event=push&style=flat&logo=vitest&logoColor=white&label=e2e%20tests)](https://github.com/helpmeagain/blackwell/actions/workflows/run-e2e-tests.yml)

![Typescript](https://img.shields.io/badge/Typescript-blue?style=for-the-badge&logo=Typescript&logoColor=white
)
![NestJS](https://img.shields.io/badge/NestJS-%23ff3232?style=for-the-badge&logo=NestJS&logoColor=white
)
![Prisma](https://img.shields.io/badge/Prisma-%2320b2aa?style=for-the-badge&logo=Prisma&logoColor=white
)
![Vitest](https://img.shields.io/badge/Vitest-%259b19?style=for-the-badge&logo=Vitest&logoColor=white
)
![Postgres](https://img.shields.io/badge/Postgres-%23585ce4?style=for-the-badge&logo=PostgreSQL&logoColor=white
) ![Redis](https://img.shields.io/badge/Redis-%23FF6600?style=for-the-badge&logo=Redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=docker&logoColor=white
)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-grey?style=for-the-badge&logo=githubactions&logoColor=white)

API developed to manage operations in a physiotherapy clinic. This API features managing and creating records, scheduling consultations and handling patient/clinician profiles. For a detailed overview, refer to the documentation, including the API and architecture references.

This application is built on Clean Architecture and Domain-Driven Design principles for modularity and maintainability. It’s developed with unit and end-to-end tests integrated with a Continuous Integration pipeline, ensuring a secure development. Security features include RS256-based JWT authentication and RBAC, protecting sensitive data and appropriate access control.

The architecture is inspired by [this Rocketseat repository](https://github.com/rocketseat-education/05-nest-clean).

## Documentation

### API Reference

You can use the API Docs with Swagger by Execute the API and open the `/api` route. You can also see in [this link](). Also with Insomnia, import the [JSON file](./docs/insomnia-blackwell-requests.json) into Insomnia. You will need to update the environment variables.

### Architecture Reference

This API follows the principles of Clean Architecture, structured into distinct layers, each with well-defined responsibilities. The layers are organized as follows:
- Presentation Layer: Manages communication with the outside world. It’s responsible for handling input and output, such as displaying data or receiving commands.
- Infrastructure Layer: Handles communication with external systems and resources like databases, APIs, or third-party services. It provides the concrete implementation of the interfaces defined by other layers.
- Application Layer: Contains the use cases and business logic that orchestrates the system’s operations. It coordinates the flow of data between the Domain and the Infrastructure layers,
- Domain Layer: Represents the core business concepts and rules of the system. It is independent of any specific technology or framework and contains the fundamental logic and data models that define the problem domain.

### Architectural diagram

```mermaid
stateDiagram-v2
    classDef pres fill:#A8D8FC,color:white, font-size:20px, font-weight:bold
    classDef infra fill:#A2FDBA,color:white, font-size:20px, font-weight:bold
    classDef app fill:#FFA09C,color:white, font-size:20px, font-weight:bold
    classDef dom fill:#FCFDB9,color:white, font-size:20px, font-weight:bold

    Presentation:::pres
    Infrastructure:::infra
    Application:::app
    Domain:::dom

    Presentation --> Infrastructure
    Infrastructure --> Application
    Application --> Domain

    state Infrastructure{
        Adapters
        Events
        --
        Database/ORM
        --
        Authentication
        Cryptography
    }
    state Presentation{
        NestJS
        Swagger
        --
        Controllers
        Presenters
        Validations
    }
    state Application{
        UseCases
        --
        ErrorHandler
        Repositories
    }

    state Domain{
        Entities
        ValueObjects
        --
        AggregateRoot
        WatchedList
    }
```

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
docker compose up
```

4. Access the application on localhost at port 8080.

</details>

<details>
<summary><strong>Install with script</strong></summary>

### Prerequisites
- Install [node.js](https://nodejs.org/en).
- Install and run [postgres](https://www.postgresql.org/).
- Install and run [redis](https://redis.io/).

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

3. Run the script **from the project root**:
```bash
# Bash
scripts/setup.sh

# Powershell
scripts/setup.ps1
```

4. Insert the database URL when prompted:
```bash
Enter your PostgreSQL URL: postgres://your-user-name:your-password@your-hostname:5432/your-database-name
```

5. Insert the Redis URL when prompted:
```bash
Enter your Redis host: localhost

Enter your Redis port: 6379

Enter your Redis DB: 0
```

6. Start the server
```bash
# Using npm
npm start

# Using pnpm
pnpm start

# Using yarn
yarn start
```

7. Access the application on localhost at port 8080.

</details>

<details>
<summary><strong>Install manually</strong></summary>

### Prerequisites
- Install [node.js](https://nodejs.org/en).
- Install and run [postgres](https://www.postgresql.org/).

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

# Using yarn
yarn prisma generate
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

# Using yarn
yarn build
```

9. Run the application:
```bash
# Using npm
npm start

# Using pnpm
pnpm start

# Using yarn
yarn start
```

10. Access the application in the localhost

</details>

## License
Code released under the [Apache-2.0 license](./LICENSE.txt).