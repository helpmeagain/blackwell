# Blackwell &middot; [![version](https://img.shields.io/github/package-json/v/helpmeagain/blackwell)](./package.json) [![license](https://img.shields.io/github/license/helpmeagain/blackwell)](./LICENSE.md) [![unit tests](https://img.shields.io/github/actions/workflow/status/helpmeagain/blackwell/run-unit-tests.yml?branch=main&event=push&logo=vitest&logoColor=%23ffffff&label=unit%20tests)](https://github.com/helpmeagain/blackwell/actions/workflows/run-unit-tests.yml) [![e2e tests](https://img.shields.io/github/actions/workflow/status/helpmeagain/blackwell/run-e2e-tests.yml?branch=main&event=push&style=flat&logo=vitest&logoColor=white&label=e2e%20tests)](https://github.com/helpmeagain/blackwell/actions/workflows/run-e2e-tests.yml)

API developed to manage operations in a physiotherapy clinic. This API provides features for creating and managing records, scheduling consultations and handling patient/clinician profiles. For a detailed overview, refer to the documentation, including the API and architecture references.

This application is built on Clean Architecture and Domain-Driven Design principles, ensuring modularity and maintainability. It is develop with unit and end-to-end (E2E) tests, integrated within a CI (Continuous Integration) pipeline, ensuring a secure development. Security features include RS256-based JWT authentication and Role-Based Access Control (RBAC), protecting sensitive data and ensuring appropriate access levels.

The architecture is inspired by [this Rocketseat repository](https://github.com/rocketseat-education/05-nest-clean).

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

<details>
<summary><strong>API Reference</strong></summary>

### How to use the API
You can use the API using the following tools:
- Swagger: Execute the API and open the `/api` route.
- Insomnia: Import the [JSON file](./docs/insomnia-blackwell-requests.json) into Insomnia. You will need to update the environment variables.
- HTTP Request: Open the [HTTP file](./docs/http-blackwell-requests.http). You will need to update the environment variables.
<!-- - Postman: Import the [JSON file](./insomnia-blackwell-requests.json) into Postman. You will need to update the environment variables. -->

### Routes

#### Authentication
| Method | Route           | Operation                | Authentication | Authorization |
|--------|-----------------|--------------------------|----------------|---------------|
| POST   | /auth/clinician | Authenticate a clinician | No             | No            |
| POST   | /auth/patient   | Authenticate a patient   | No             | No            |

#### Clinicians
| **Method** | **Route**                  | **Operation**                    | **Authentication** | **Authorization**         |
|------------|----------------------------|----------------------------------|--------------------|---------------------------|
| GET        | /clinicians                | Fetch clinicians with pagination | Yes                | No                        |
| GET        | /clinicians/by-id/{id}     | Get a clinician by id            | Yes                | No                        |
| GET        | /clinicians/by-slug/{slug} | Get a clinician by slug          | Yes                | No                        |
| POST       | /clinicians                | Create a clinician               | No                 | No                        |
| PUT        | /clinicians/{id}           | Edit a clinician                 | Yes                | Yes (Resource owner only) |
| DELETE     | /clinicians/{id}           | Delete clinician by id           | Yes                | Yes (Resource owner only) |

#### Patients
| **Method** | **Route**                | **Operation**                  | **Authentication** | **Authorization**         |
|------------|--------------------------|--------------------------------|--------------------|---------------------------|
| GET        | /patients                | Fetch patients with pagination | Yes                | No                        |
| GET        | /patients/by-cpf/{cpf}   | Get a patient by CPF           | Yes                | No                        |
| GET        | /patients/by-id/{id}     | Get a patient by id            | Yes                | No                        |
| GET        | /patients/by-slug/{slug} | Get a patient by slug          | Yes                | No                        |
| POST       | /patients                | Create a patient               | No                 | No                        |
| PUT        | /patients/{id}           | Edit a patient                 | Yes                | Yes (Resource owner only) |
| DELETE     | /patients/{id}           | Delete patient by id           | Yes                | Yes (Resource owner only) |

#### Universal Medical Record
| **Method** | **Route**                                           | **Operation**                                 | **Authentication** | **Authorization**            |
|------------|-----------------------------------------------------|-----------------------------------------------|--------------------|------------------------------|
| GET        | /universal-medical-record/{id}                      | Get a universal medical record by id          | Yes                | No                           |
| GET        | /universal-medical-record/by-patient-id/{patientId} | Get a universal medical record by patient id  | Yes                | No                           |
| PUT        | /universal-medical-record/{id}                      | Edit a universal medical record by id         | Yes                | Yes (Only the patient-owner) |
| PUT        | /universal-medical-record/by-patient-id/{patientId} | Edit a universal medical record by patient id | Yes                | Yes (Only the patient-owner) |

  <details>
  <summary><h4>Specific records (Open to view details)</h4></summary>

  #### Cardiorespiratory Record
  | **Method** | **Route**                                                                   | **Operation**                                     | **Authentication** | **Authorization**                                      |
  |------------|-----------------------------------------------------------------------------|---------------------------------------------------|--------------------|--------------------------------------------------------|
  | GET        | /cardiorespiratory-record/by-id/{id}                                        | Get a record by id                                | Yes                | Yes (Only the patient, clinician and authorized users) |
  | GET        | /cardiorespiratory-record/by-patient-id/{patientId}                         | Get a record by patient id                        | Yes                | Yes (Only the patient, clinician and authorized users) |
  | GET        | /cardiorespiratory-record/fetch-ids-by-clinician-id/{clinicianId}           | Fetch records ids by clinician id with pagination | Yes                | Yes (Only clinicians)                                  |
  | POST       | /cardiorespiratory-record/patient-id/{patientId}/clinician-id/{clinicianId} | Create a record                                   | Yes                | Yes (Only clinicians)                                  |
  | PUT        | /cardiorespiratory-record/{id}                                              | Edit a record                                     | Yes                | Yes (Only the clinician-owner)                         |


  #### Neurofunctional Record
  | **Method** | **Route**                                                                 | **Operation**                                     | **Authentication** | **Authorization**                                      |
  |------------|---------------------------------------------------------------------------|---------------------------------------------------|--------------------|--------------------------------------------------------|
  | GET        | /neurofunctional-record/by-id/{id}                                        | Get a record by id                                | Yes                | Yes (Only the patient, clinician and authorized users) |
  | GET        | /neurofunctional-record/by-patient-id/{patientId}                         | Get a record by patient id                        | Yes                | Yes (Only the patient, clinician and authorized users) |
  | GET        | /neurofunctional-record/fetch-ids-by-clinician-id/{clinicianId}           | Fetch records ids by clinician id with pagination | Yes                | Yes (Only clinicians)                                  |
  | POST       | /neurofunctional-record/patient-id/{patientId}/clinician-id/{clinicianId} | Create a record                                   | Yes                | Yes (Only clinicians)                                  |
  | PUT        | /neurofunctional-record/{id}                                              | Edit a record                                     | Yes                | Yes (Only the clinician-owner)                         |

  #### Trauma Orthopedic Record
  | **Method** | **Route**                                                                   | **Operation**                                     | **Authentication** | **Authorization**                                      |
  |------------|-----------------------------------------------------------------------------|---------------------------------------------------|--------------------|--------------------------------------------------------|
  | GET        | /trauma-orthopedic-record/by-id/{id}                                        | Get a record by id                                | Yes                | Yes (Only the patient, clinician and authorized users) |
  | GET        | /trauma-orthopedic-record/by-patient-id/{patientId}                         | Get a record by patient id                        | Yes                | Yes (Only the patient, clinician and authorized users) |
  | GET        | /trauma-orthopedic-record/fetch-ids-by-clinician-id/{clinicianId}           | Fetch records ids by clinician id with pagination | Yes                | Yes (Only clinicians)                                  |
  | POST       | /trauma-orthopedic-record/patient-id/{patientId}/clinician-id/{clinicianId} | Create a record                                   | Yes                | Yes (Only clinicians)                                  |
  | PUT        | /trauma-orthopedic-record/{id}                                              | Edit a record                                     | Yes                | Yes (Only the clinician-owner)                         |
  </details>

  #### Manage record access
  | **Method** | **Route**                                                          | **Operation**                       | **Authentication** | **Authorization**            |
  |------------|--------------------------------------------------------------------|-------------------------------------|--------------------|------------------------------|
  | GET        | /manage-access/authorized-users                                    | Get authorized users                | Yes                | Yes (Only patients)          |
  | GET        | /manage-access/get-records-shared-with-me                          | Get records shared with me          | Yes                | No                           |
  | GET        | /manage-access/pending-authorization                               | Get pending authorization users     | Yes                | Yes (Only patients)          |
  | PATCH      | /manage-access/pending-authorization/authorize-access/{userId}     | Authorize access for record         | Yes                | Yes (Only the patient-owner) |
  | PATCH      | /manage-access/request-access-by-patient-id/{patientId}            | Request authorization by patient id | Yes                | No                           |
  | PATCH      | /manage-access/request-access/record-id/{recordId}/userId/{userId} | Request authorization by record id  | Yes                | No                           |
  | DELETE     | /manage-access/authorized-users/revoke-access/{userId}             | Remove access from user             | Yes                | Yes (Only the patient-owner) |
  | DELETE     | /manage-access/pending-authorization/deny-access/{userId}          | Deny pending authorization users    | Yes                | Yes (Only the patient-owner) |
</details>

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
npm start

# Using pnpm
pnpm start

# Using yarn
yarn start
```

6. Access the application on localhost at port 8080.

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
