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

<details>
<summary><strong>Architecture Reference</strong></summary>
  
### Explanation

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

</details>


<details>
<summary><strong>Database reference</strong></summary>

### Explanation

The API uses PostgreSQL as the relational database, using features such as table relationships, data integrity, and advanced querying capabilities. Prisma is employed as the ORM (Object-Relational Mapping) tool to simplify database interactions.

### Entity relationship diagram

```mermaid
erDiagram
    NOTIFICATION {
        string id PK
        string recipient_id
        string title
        string content
        DateTime read_at "Optional"
        UserRole recipientType "ADMIN | EMPLOYEE | CLIENT"
        DateTime created_at "Default as 'now()'"
    }

    CLINICIAN {
        string id PK
        string name
        string surname
        string slug
        Gender gender "male | female | nonbinary | other"
        string occupation
        string phone_number
        string email "Unique field"
        string password
        UserRole role "Default as 'EMPLOYEE'"
        DateTime created_at "Default as 'now()'"
        DateTime updated_at
    }

    PATIENT {
        string id PK
        string name
        string surname
        string slug
        Gender gender "male | female | nonbinary | other"
        DateTime birth_date
        string cpf "Unique field"
        string phone_number
        string address
        string state
        string city
        string email "Unique field"
        string password
        UserRole role "Default as 'CLIENT'"
        DateTime created_at "Default as 'now()'"
        DateTime updated_at
        string universal_medical_record_id FK "Unique field" 
    }

    UNIVERSAL_MEDICAL_RECORD {
        string id PK
        string profession "Optional"
        string emergency_contact_email "Optional"
        string emergency_contact_number "Optional"
        string marital_status "Optional"
        float height "Optional"
        float weight "Optional"
        string[] allergies "Optional"
        string[] diagnosis "Optional"
        string[] medications_in_use "Optional"
        DateTime created_at "Default as 'now()'"
        DateTime updated_at
        string patient_id FK "Unique field" 
    }

    TRAUMA_ORTHOPEDIC_RECORD{
        string id PK
        string medical_diagnosis
        string anamnesis
        string physical_examination
        PhysiotherapyDepartment physiotherapy_department "Default as 'Orthopedic'"
        Triage triage "orange | yellow | green | blue"
        string[] authorized_users
        string[] pending_authorization_users
        string palpation
        boolean edema
        boolean pitting_test
        boolean finger_pressure_test
        float right_arm
        float left_arm
        float upper_right_thigh
        float upper_left_thigh
        float lower_right_thigh
        float lower_left_thigh
        float right_knee
        float left_knee
        float intensity
        string location
        string characteristic
        string special_orthopedic_test
        DateTime created_at "Default as 'now()'"
        DateTime updated_at
        string clinician_id FK
        string patient_id FK "Unique field" 
        string universal_medical_record_id FK "Unique field"
    }

    NEUROFUNCTIONAL_RECORD {
        string id PK
        string medical_diagnosis
        string anamnesis
        string physical_examination
        PhysiotherapyDepartment physiotherapy_department "Default as 'Orthopedic'"
        Triage triage "orange | yellow | green | blue"
        string[] authorized_users
        string[] pending_authorization_users
        boolean alcohol_consumption
        boolean smoker
        boolean obesity
        boolean diabetes
        boolean drug_user
        boolean physical_activity
        float blood_pressure
        float heart_rate
        float respiratory_rate
        float oxygen_saturation
        float body_temperature
        boolean independent_mobility
        boolean uses_crutches
        boolean uses_walker
        boolean wheelchair_user
        boolean has_scar
        boolean has_bedsore
        boolean cooperative
        boolean non_cooperative
        boolean hydrated
        boolean has_hematoma
        boolean has_edema
        boolean has_deformity
        SuperficialSensation superficial "Tactile | Thermal | Painful"
        DeepSensation deep "PositionSense | MovementSense"
        boolean graphesthesia
        boolean barognosis
        boolean stereognosis
        float three_meter_walk_time_in_seconds
        boolean has_fall_risk
        MobilityStatus bridge "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus semi_roll_right "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus semi_roll_left "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus full_roll "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus drag  "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus prone_to_forearm_support "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus forearm_support_to_all_fours "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus all_fours "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus all_fours_to_kneeling "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus kneeling_to_half_kneeling_right "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus kneeling_to_half_kneeling_left "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus half_kneeling_right_to_standing "Independent | PartiallyDependent | Dependent | CannotPerform"
        MobilityStatus half_kneeling_left_to_standing "Independent | PartiallyDependent | Dependent | CannotPerform"
        string diagnosis
        string treatment_goals
        string physiotherapeutic_conduct
        DateTime created_at "Default as 'now()'"
        DateTime updated_at
        string clinician_id FK
        string patient_id FK "Unique field" 
        string universal_medical_record_id FK "Unique field"
    }

    CARDIORESPIRATORY_RECORD {
        string id PK
        string medical_diagnosis
        string anamnesis
        string physical_examination
        PhysiotherapyDepartment physiotherapy_department "Default as 'Orthopedic'"
        Triage triage "orange | yellow | green | blue"
        string[] authorized_users
        string[] pending_authorization_users
        boolean alcohol_consumption
        boolean smoker
        boolean obesity
        boolean diabetes
        boolean drug_user
        boolean physical_activity
        boolean isFaceSinusPalpationHurtful
        NasalSecretionType type "purulent | mucopurulent | mucoid | piohematic | hematic | rosacea | greenish | yellowish"
        boolean is_fetid
        NasalSecretionQuantity quantity "large | moderate | small | absent"
        PhysicalInspectionNasalItching nasal_itching "intermittent | persistent | absent"
        PhysicalInspectionNasalItching sneezing "intermittent | persistent | absent"
        PhysicalInspectionChestType chest_type "kyphotic | scoliotic | kyphoscoliotic | barrel | hourglass | pectusExcavatum | pectusCarinatum | normal | charpyAngle"
        PhysicalInspectionRespiratoryOrCardiacSigns respiratory_or_cardiac_signs "accessory | retractions | hooverSign | digitalClubbing | jugularVenousDistension | normal"
        float heart_rate
        float respiratory_rate
        float systolic
        float diastolic
        float temperature
        float oxygen_saturation
        float first_measurement
        float second_measurement
        float third_measurement
        float pemax_first_measurement
        float pemax_second_measurement
        float pemax_third_measurement
        float pimax_first_measurement
        float pimax_second_measurement
        float pimax_third_measurement
        float bmi
        float abdominal_perimeter
        float waist_hip_ratio
        float body_fat
        float visceral_fat
        float muscle_mass_percentage
        float bicipital
        float tricipital
        float subscapular
        float abdominal
        DateTime created_at "Default as 'now()'"
        DateTime updated_at
        string clinician_id FK
        string patient_id FK "Unique field" 
        string universal_medical_record_id FK "Unique field"
    }


    PATIENT ||--|| UNIVERSAL_MEDICAL_RECORD : has
    PATIENT ||--|| TRAUMA_ORTHOPEDIC_RECORD : has
    PATIENT ||--|| NEUROFUNCTIONAL_RECORD : has
    PATIENT ||--|| CARDIORESPIRATORY_RECORD : has
    CLINICIAN ||--o{ TRAUMA_ORTHOPEDIC_RECORD : creates
    CLINICIAN ||--o{ NEUROFUNCTIONAL_RECORD : creates
    CLINICIAN ||--o{ CARDIORESPIRATORY_RECORD : creates
```
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
# Bash
scripts/setup.sh

# Powershell
scripts/setup.ps1
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

## License
Code released under the [Apache-2.0 license](./LICENSE.txt).