# Blackwell API Reference

- Swagger: Execute the API and open the `/api` route.
- Insomnia: Import the [JSON file](./insomnia-blackwell-requests.json) into Insomnia You will need to update the environment variables.
- HTTP Request: Open the [HTTP file](./http-blackwell-requests.http). You will need to update the environment variables.

## Routes
- [Auth](#auth)
  - [Authenticate a clinician](#authenticate-a-clinician)
  - [Authenticate a patient](#authenticate-a-patient)
- [Clinicians](#clinicians)
  - [Get a clinician by id 🔒](#get-a-clinician-by-id)
  - [Get a clinician by slug 🔒](#get-a-clinician-by-slug)
  - [Create a clinician](#create-a-clinician)
  - [Edit a clinician 🔒](#edit-a-clinician)
  - [Delete a clinician 🔒](#delete-a-clinician)
- [Patients](#patients)
  - [Get a patient by id 🔒](#get-a-patient-by-id)
  - [Get a patient by slug 🔒](#get-a-patient-by-slug)
  - [Create a patient](#create-a-patient)
  - [Edit a patient 🔒](#edit-a-patient)
  - [Delete a patient 🔒](#delete-a-patient)
- [Medical Record](#medical-record)
  - [Get a medical record by id 🔒](#get-a-medical-record-by-id)
  - [Get a medical record by patient id 🔒](#get-a-medical-record-by-patient-id)
  - [Edit a medical record with id 🔒](#edit-a-medical-record-with-id)
  - [Edit a medical record with patient id 🔒](#edit-a-medical-record-with-patient-id)
- [Consultations](#consultations)
  - [Fetch consultations 🔒](#fetch-consultations)
  - [Get consultation by id 🔒](#get-consultation-by-id)
  - [Create a consultation 🔒](#create-a-consultation)
  - [Edit a consultations 🔒](#edit-a-consultation)
  - [Delete a consultation 🔒](#delete-a-consultation)
## Auth
### Authenticate a clinician
#### Route
```js
POST {{host}}/auth/clinician	
```

#### Request example
```json5
// Body
{
  "email": "clinician@email.com",
  "password": "12345"
}
```

#### Response example
```js
201 Created
```
```json
{
  "access_token": "ey...QwErRy"
}
```

#### Possible responses
```js
201 Created
400 Bad request
401 Unauthorized
```

### Authenticate a patient
#### Route
```js
POST {{host}}/auth/patient	
```

#### Request example
```json5
// Body
{
  "email": "patient@email.com",
  "password": "12345"
}
```

#### Response example
```js
201 Created
```
```json
{
  "access_token": "ey...QwErRy"
}
```

#### Possible responses
```js
201 Created
400 Bad request
401 Unauthorized
```

## Clinicians
### Get a clinician by id
#### Route
```js
GET {{host}}/clinicians/by-id/{id}	
```

#### Request example
```json5
// Param
{id}: qwe123-qwe-4qwe-1234-qwe123

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
401 Unauthorized
404 Not Found
```

### Get a clinician by slug
#### Route
```js
GET {{host}}/clinicians/by-slug/{slug}	
```

#### Request example
```json5
// Param
{slug}: john-doe

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
401 Unauthorized
404 Not Found
```

### Create a clinician
#### Route
```js
POST {{host}}/clinicians	
```

#### Request example
```json5
// Body
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

#### Response example
```js
201 Created
```
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

#### Possible responses
```js
201 Created
404 Bad Request 
409 Conflict
```

### Edit a clinician
#### Route
```js
PUT {{host}}/clinicians/{id}
```

#### Request example
```json5
// Param
{id}: qwe123-qwe-4qwe-1234-qwe123

// Auth
Authorization: Bearer ey...QwErRy

// Body
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

#### Response example
```js
200 Created
```
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

#### Possible responses
```js
200 Ok
404 Bad Request 
409 Conflict
```

### Delete a clinician
#### Route
```js
DELETE {{host}}/clinicians/{id}	
```

#### Request example
```json5
// Param
{id}: qwe123-qwe-4qwe-1234-qwe123

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
204 No Content
```

#### Possible responses
```js
204 No Content
401 Unauthorized
404 Not Found
```

## Patients
### Get a patient by id
#### Route
```js
GET {{host}}/patients/by-id/{id}	
```

#### Request example
```json5
// Param
{id}: qwe123-qwe-4qwe-1234-qwe123

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
401 Unauthorized
404 Not Found
```

### Get a patient by slug
#### Route
```js
GET {{host}}/patients/by-slug/{slug}	
```

#### Request example
```json5
// Param
{slug}: jane-doe

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
401 Unauthorized
404 Not Found
```

### Create a patient
#### Route
```js
POST {{host}}/patients	
```

#### Request example
```json5
// Body
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

#### Response example
```js
201 Created
```
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

#### Possible responses
```js
201 Created
404 Bad Request 
409 Conflict
```

### Edit a patient
#### Route
```js
PUT {{host}}/patients/{id}
```

#### Request example
```json5
// Param
{id}: qwe123-qwe-4qwe-1234-qwe123

// Auth
Authorization: Bearer ey...QwErRy

// Body
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

#### Response example
```js
200 Created
```
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

#### Possible responses
```js
200 Ok
404 Bad Request 
409 Conflict
```

### Delete a patient
#### Route
```js
DELETE {{host}}/patients/{id}	
```

#### Request example
```json5
// Param
{id}: qwe123-qwe-4qwe-1234-qwe123

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
204 No Content
```

#### Possible responses
```js
204 No Content
401 Unauthorized
404 Not Found
```

## Medical Record
### Get a medical record by id
#### Route
```js
GET {{host}}/medical-records/{id}	
```

#### Request example
```json5
// Param
{id}: qwe123-qwe-4qwe-1234-qwe123

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
401 Unauthorized
404 Not Found
```

### Get a medical record by patient id
#### Route
```js
GET {{host}}/medical-records/by-patient-id/{patientId}	
```

#### Request example
```json5
// Param
{patientId}: qwe345-qwe-4qwe-3456-qwe345

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
401 Unauthorized
404 Not Found
```

### Edit a medical record with id
#### Route
```js
PUT {{host}}/medical-records/{id}
```

#### Request example
```json5
// Param
{id}: qwe123-qwe-4qwe-1234-qwe123

// Auth
Authorization: Bearer ey...QwErRy

// Body
{
  "diagnosis": "Hepatitis C",
  "comorbidity": "Conjunctivitis"
}
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
401 Unauthorized
404 Bad Request 
```

### Edit a medical record with patient id
#### Route
```js
PUT {{host}}/medical-records/by-patient-id/{patientId}
```

#### Request example
```json5
// Param
{patientId}: qwe345-qwe-4qwe-3456-qwe345

// Auth
Authorization: Bearer ey...QwErRy

// Body
{
  "diagnosis": "Hepatitis C",
  "comorbidity": "Conjunctivitis"
}
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
401 Unauthorized
404 Bad Request 
```

## Consultations
### Fetch consultations
#### Route
```js
GET {{host}}/consultations
```

#### Request example
```json5
// Query
page=3

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
401 Unauthorized
```

### Get consultation by id
#### Route
```js
GET {{host}}/consultations/{id}	
```

#### Request example
```json5
// Param
{id}: zxc123-zxc-4zxc-1234-zxc123

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
401 Unauthorized
404 Not Found
```

### Create a consultation
#### Route
```js
POST {{host}}/consultations/clinician/{clinicianId}/patient/{patientId}
```

#### Request example
```json5
// Params
{patientId}: qwe123-qwe-4qwe-1234-qwe123
{clinicianId}: qwe234-qwe-4qwe-2345-qwe234

// Auth
Authorization: Bearer ey...QwErRy

// Body
{
  "room": 20,
  "appointmentDate": "2024-05-20T00:15:09.006Z"
}
```

#### Response example
```js
201 Created
```
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

#### Possible responses
```js
201 Created
404 Bad Request
```

### Edit a consultation
#### Route
```js
PUT {{host}}/consultations/{id}
```

#### Request example
```json5
// Param
{id}: zxc123-zxc-4zxc-1234-zxc123

// Auth
Authorization: Bearer ey...QwErRy

// Body
{
  "room": 40,
  "appointmentDate": "2024-05-25T00:23:43.507Z"
}
```

#### Response example
```js
200 Ok
```
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

#### Possible responses
```js
200 Ok
404 Bad Request 
```

### Delete a consultation
#### Route
```js
DELETE {{host}}/consultations/{id}	
```

#### Request example
```json5
// Param
{id}: zxc123-zxc-4zxc-1234-zxc123

// Auth
Authorization: Bearer ey...QwErRy
```

#### Response example
```js
204 No Content
```

#### Possible responses
```js
204 No Content
401 Unauthorized
404 Not Found
```
