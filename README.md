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

### API Reference

<details>
<summary><strong>Auth</strong></summary>

### /auth/clinician

| Method |      Route      |         Operation        | Authentication |
|:------:|:---------------:|:------------------------:|:--------------:|
|  POST  | /auth/clinician | Authenticate a clinician |       No       |

#### Request body example
```json
{
  "email": "clinician@email.com",
  "password": "12345"
}
```

#### Response body example
```json
{
  "access_token": "eyQwErRy"
}
```

### /auth/patient

| Method |     Route     |        Operation       | Authentication |
|:------:|:-------------:|:----------------------:|:--------------:|
|  POST  | /auth/patient | Authenticate a patient |       No       |

#### Request body example
```json
{
  "email": "patient@email.com",
  "password": "12345"
}
```

#### Response body example
```json
{
  "access_token": "eyQwErRy"
}
```
</details>

<details>
<summary><strong>Clinician</strong></summary>

### /clinician/by-id/{id}

| Method |         Route        |       Operation       | Authentication |
|:------:|:--------------------:|:---------------------:|:--------------:|
|   GET  | /clinician/by-id/:id | Get a clinician by id |       Yes      |

#### Request param example
```
qwe123-qwe-4qwe-1234-qwe123
```

#### Response body example
```json
{
  "clinician": {
    "id": "qwe123-qwe-4qwe-1234-qwe123",
    "name": "John",
    "surname": "Doe",
    "slug": "john-doe",
    "gender": "male",
    "occupation": "psychologist",
    "phoneNumber": "123456789",
    "email": "jonhdoe@email.com",
    "password": "*********"
  }
}
```


### /clinician/by-slug/{slug}

| Method |           Route          |        Operation        | Authentication |
|:------:|:------------------------:|:-----------------------:|:--------------:|
|   GET  | /clinician/by-slug/:slug | Get a clinician by slug |       Yes      |

#### Request param example
```
john-doe
```

#### Response body example
```json
{
  "clinician": {
    "id": "qwe123-qwe-4qwe-1234-qwe123",
    "name": "John",
    "surname": "Doe",
    "slug": "john-doe",
    "gender": "male",
    "occupation": "psychologist",
    "phoneNumber": "123456789",
    "email": "jonhdoe@email.com",
    "password": "*********"
  }
}
```

### /clinician

| Method |    Route   |      Operation     | Authentication |
|:------:|:----------:|:------------------:|:--------------:|
|  POST  | /clinician | Create a clinician |       No       |

#### Request body example
```json
{
  "name": "john",
  "surname": "doe",
  "gender": "male",
  "occupation": "psychologist",
  "phoneNumber": "123456789",
  "email": "jonhdoe@email.com",
  "password": "123456789"
}
```

#### Response body example
```json
{
  "message": "Clinician created successfully",
  "clinician": {
    "id": "qwe123-qwe-4qwe-1234-qwe123",
    "name": "john",
    "surname": "doe",
    "slug": "john-doe",
    "gender": "male",
    "occupation": "psychologist",
    "phoneNumber": "123456789",
    "email": "jonhdoe@email.com",
    "password": "*********"
  }
}
```

### /clinician/{id}
| Method |      Route      |     Operation    | Authentication |
|:------:|:---------------:|:----------------:|:--------------:|
|   PUT  | /clinician/{id} | Edit a clinician |       Yes      |

#### Request param example
```
qwe123-qwe-4qwe-1234-qwe123
```

#### Request body example
```json
{
  "name": "john",
  "surname": "doe",
  "gender": "male",
  "occupation": "physiotherapist",
  "phoneNumber": "123456789",
  "email": "jonhdoe@email.com",
  "password": "123456789"
}
```

#### Response body example
```json
{
  "message": "Clinician edited successfully",
  "clinician": {
    "id": "qwe123-qwe-4qwe-1234-qwe123",
    "name": "john",
    "surname": "doe",
    "slug": "john-doe",
    "gender": "male",
    "occupation": "physiotherapist",
    "phoneNumber": "123456789",
    "email": "jonhdoe@email.com",
    "password": "*********"
  }
}
```

### /clinician/{id}
| Method |      Route      |      Operation     | Authentication |
|:------:|:---------------:|:------------------:|:--------------:|
| DELETE | /clinician/{id} | Delete a clinician |       Yes      |

#### Request param example
```
qwe123-qwe-4qwe-1234-qwe123
```

#### Response body example
No response body.

</details>

<details>
<summary><strong>Patient</strong></summary>

### /patient/by-id/{id}

| Method |         Route        |       Operation       | Authentication |
|:------:|:--------------------:|:---------------------:|:--------------:|
|   GET  | /patient/by-id/:id | Get a patient by id |       Yes      |

#### Request param example

```
qwe123-qwe-4qwe-1234-qwe123
```

#### Response body example
```json
{
  "patient": {
    "id": "qwe123-qwe-4qwe-1234-qwe123",
    "medicalRecordId": "qwe345-qwe-4qwe-3456-qwe345",
    "name": "Jane",
    "surname": "Doe",
    "slug": "jane-doe",
    "gender": "female",
    "birthDate": "2000-01-01T12:00:00.000Z",
    "phoneNumber": "123456789",
    "email": "janedoe@email.com",
    "password": "*********"
  }
}
```


### /patient/by-slug/{slug}

| Method |           Route          |        Operation        | Authentication |
|:------:|:------------------------:|:-----------------------:|:--------------:|
|   GET  | /patient/by-slug/:slug | Get a patient by slug |       Yes      |

#### Request param example
```
jane-doe
```

#### Response body example
```json
{
  "patient": {
    "id": "qwe123-qwe-4qwe-1234-qwe123",
    "medicalRecordId": "qwe345-qwe-4qwe-3456-qwe345",
    "name": "Jane",
    "surname": "Doe",
    "slug": "jane-doe",
    "gender": "female",
    "birthDate": "2000-01-01T12:00:00.000Z",
    "phoneNumber": "123456789",
    "email": "janedoe@email.com",
    "password": "*********"
  }
}
```

### /patient

| Method |    Route   |      Operation     | Authentication |
|:------:|:----------:|:------------------:|:--------------:|
|  POST  | /patient | Create a patient |       No       |

#### Request body example
```json
{
  "name": "jane",
  "surname": "doe",
  "gender": "female",
  "birthDate": "2000-01-01T12:00:00.000Z",
  "phoneNumber": "123456789",
  "email": "janedoe@email.com",
  "password": "123456789"
}
```

#### Response body example
```json
{
  "message": "Patient created successfully",
  "patient": {
    "id": "qwe123-qwe-4qwe-1234-qwe123",
    "medicalRecordId": "qwe345-qwe-4qwe-3456-qwe345",
    "name": "jane",
    "surname": "doe",
    "slug": "jane-doe",
    "gender": "female",
    "birthDate": "2000-01-01T12:00:00.000Z",
    "phoneNumber": "123456789",
    "email": "janedoe@email.com",
    "password": "*********"
  }
}
```

### /patient/{id}
| Method |      Route      |     Operation    | Authentication |
|:------:|:---------------:|:----------------:|:--------------:|
|   PUT  | /patient/{id} | Edit a patient |       Yes      |

#### Request param example
```
qwe123-qwe-4qwe-1234-qwe123
```

#### Request body example
```json
{
  "name": "jane",
  "surname": "smith",
  "gender": "female",
  "birthDate": "2000-01-01T12:00:00.000Z",
  "phoneNumber": "123456789",
  "email": "janesmith@email.com",
  "password": "123456789"
}
```

#### Response body example
```json
{
  "message": "Patient edited successfully",
  "patient": {
    "id": "qwe123-qwe-4qwe-1234-qwe123",
    "medicalRecordId": "qwe345-qwe-4qwe-3456-qwe345",
    "name": "jane",
    "surname": "smith",
    "slug": "jane-smith",
    "gender": "female",
    "birthDate": "2000-01-01T12:00:00.000Z",
    "phoneNumber": "123456789",
    "email": "janesmith@email.com",
    "password": "*********"
  }
}
```

### /patient/{id}
| Method |      Route      |      Operation     | Authentication |
|:------:|:---------------:|:------------------:|:--------------:|
| DELETE | /patient/{id} | Delete a patient |       Yes      |

#### Request param example
```
qwe123-qwe-4qwe-1234-qwe123
```

#### Response body example
No response body.

</details>

<details>
<summary><strong>Medical Record</strong></summary>

### /medical-record/{id}
| Method |         Route        |         Operation        | Authentication |
|:------:|:--------------------:|:------------------------:|:--------------:|
|   GET  | /medical-record/{id} | Get medical record by id |       Yes      |

#### Request param example
```
qwe123-qwe-4qwe-1234-qwe123
```

#### Response body example
```json
{
  "medicalRecord": {
    "id": "qwe123-qwe-4qwe-1234-qwe123",
    "patientId": "qwe345-qwe-4qwe-3456-qwe345",
    "diagnosis": "Influenza",
    "comorbidity": "Pneumonia",
    "consultationsIds": [
      "asd678-asd-4asd-6789-asd678"
    ]
  }
}
```

### /medical-record/{id}
| Method |         Route        |      Operation      | Authentication |
|:------:|:--------------------:|:-------------------:|:--------------:|
|  POST  | /medical-record/{id} | Edit medical record |       Yes      |

#### Request param example
```
qwe123-qwe-4qwe-1234-qwe123
```

#### Request body example
```json
{
  "diagnosis": "Hepatitis C",
  "comorbidity": "Conjunctivitis"
}
```

#### Response body example
```json
{
  "medicalRecord": {
    "id": "qwe123-qwe-4qwe-1234-qwe123",
    "patientId": "qwe345-qwe-4qwe-3456-qwe345",
    "diagnosis": "Hepatitis C",
    "comorbidity": "Conjunctivitis",
    "consultationsIds": [
      "asd678-asd-4asd-6789-asd678"
    ]
  }
}
```

</details>

<details>
<summary><strong>Consultation</strong></summary>

### /consultations
| Method |     Route     |      Operation      | Authentication |
|:------:|:-------------:|:-------------------:|:--------------:|
|   GET  | /consultations | Fetch consultations |       Yes      |

#### Request query example
```
?page=2
```

#### Response body example
```json
{
  "consultations": [
    {
      "id": "zxc123-zxc-4zxc-1234-zxc123",
      "patientId": "qwe123-qwe-4qwe-1234-qwe123",
      "clinicianId": "qwe234-qwe-4qwe-2345-qwe234",
      "room": 4,
      "appointmentDate": "2024-05-16T18:45:00.423Z"
    },
    {
      "id": "zxc234-zxc-4zxc-2345-zxc234",
      "patientId": "qwe123-qwe-4qwe-1234-qwe123",
      "clinicianId": "qwe234-qwe-4qwe-2345-qwe234",
      "room": 13,
      "appointmentDate": "2024-05-17T18:45:00.423Z"
    },
    {
      "id": "zxc345-zxc-4zxc-3456-zxc345",
      "patientId": "qwe123-qwe-4qwe-1234-qwe123",
      "clinicianId": "qwe234-qwe-4qwe-2345-qwe234",
      "room": 25,
      "appointmentDate": "2024-05-19T01:26:12.048Z"
    }
  ]
}
```

### /consultations/{id}

| Method |        Route        |        Operation        | Authentication |
|:------:|:-------------------:|:-----------------------:|:--------------:|
|   GET  | /consultations/{id} | Get consultations by id |       Yes      |

#### Request param example
```
zxc123-zxc-4zxc-1234-zxc123
```

#### Response body example
```json
{
  "consultations": {
    "id": "zxc123-zxc-4zxc-1234-zxc123",
    "patientId": "qwe123-qwe-4qwe-1234-qwe123",
    "clinicianId": "qwe234-qwe-4qwe-2345-qwe234",
    "room": 4,
    "appointmentDate": "2024-05-16T18:45:00.423Z"
  }
}
```

### /consultations/clinician/{clinicianId}/patient/{patientId}

| Method |                            Route                           |      Operation      | Authentication |
|:------:|:----------------------------------------------------------:|:-------------------:|:--------------:|
|  POST  | /consultations/clinician/{clinicianId}/patient/{patientId} | Create consultation |       Yes      |

#### Request param example
```
patientId = qwe123-qwe-4qwe-1234-qwe123
clinicianId = qwe234-qwe-4qwe-2345-qwe234
```

#### Request body example
```json
{
  "room": 20,
  "appointmentDate": "2024-05-20T00:15:09.006Z"
}
```

#### Response body example
```json
{
  "message": "Consultation created successfully",
  "consultation": {
    "id": "zxc123-zxc-4zxc-1234-zxc123",
    "patientId": "qwe123-qwe-4qwe-1234-qwe123",
    "clinicianId": "qwe234-qwe-4qwe-2345-qwe234",
    "room": 20,
    "appointmentDate": "2024-05-20T00:15:09.006Z"
  }
}
```

### /consultations/{id}
| Method |        Route        |      Operation      | Authentication |
|:------:|:-------------------:|:-------------------:|:--------------:|
|   PUT  | /consultations/{id} | Edit a consultation |       Yes      |

#### Request param example
```
zxc123-zxc-4zxc-1234-zxc123
```

#### Request body example
```json
{
  "room": 40,
  "appointmentDate": "2024-05-25T00:23:43.507Z"
}
```

####
```json
{
  "message": "Consultation edited successfully",
  "consultation": {
    "id": "zxc123-zxc-4zxc-1234-zxc123",
    "patientId": "qwe123-qwe-4qwe-1234-qwe123",
    "clinicianId": "qwe234-qwe-4qwe-2345-qwe234",
    "room": 40,
    "appointmentDate": "2024-05-25T00:23:43.507Z"
  }
}
```

### /consultations/{id}
| Method |        Route        |       Operation       | Authentication |
|:------:|:-------------------:|:---------------------:|:--------------:|
| DELETE | /consultations/{id} | Delete a consultation |       Yes      |

#### Request param example
```
zxc123-zxc-4zxc-1234-zxc123
```

#### Response body example
No response body.

</details>


## Local installation

<details>
<summary><strong>Install manually</strong></summary>


### Prerequisites
- Install [node.js](https://nodejs.org/en).
- Install [postgres]().
- Install [pnpm](https://pnpm.io/pt/installation) (optional).

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

4. Install dependencies:
```bash
# Using npm
npm prisma generate

# Using pnpm
pnpm prisma generate
```

5. Generate JWT - RS256 Keys:
```bash
# Generate private and public key
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem

# Generate base64 versions of the key
openssl base64 -in private_key.pem -out private_key_base64.txt
openssl base64 -in public_key.pem -out public_key_base64.txt
```

6. Create a `.env` file (you can follow the [example](./.env.exemple)):
```bash
DATABASE_URL="postgres://your-user-name:your-password@your-hostname:5432/your-database-name"
JWT_PRIVATE_KEY="your-jwt-private-key-in-base64"
JWT_PUBLIC_KEY="your-jwt-public-key-in-base64"
PORT=8080
```

6. Build the application:
```bash
# Using npm
npm build

# Using pnpm
pnpm build
```

7. Run the application:
```bash
# Using npm
npm start:prod

# Using pnpm
pnpm start:prod
```

8. Access the application in the localhost

</details>

<details>
<summary><strong>Install with docker compose</strong></summary>

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
