# Task API

A simple CRUD API built with Node.js and Express. This project demonstrates the basic CRUD operations on an in-memory list of tasks.

## Features
- GET /tasks , GET /tasks/:id , POST /tasks , PUT /tasks/:id , DELETE /tasks/:id all work — full CRUD on an in-memory list (no database, no files).
- Swagger UI at /docs lists every endpoint, and the full CRUD cycle works via "Try it out".
- Correct status codes: 200 reads, 201 create, 204 delete, 400 invalid body, 404 unknown id — each error with a JSON error message.

## Installation
Install the required packages:

```bash
npm install
```

## Run the API
Start the server:

```bash
node server.js
```

The API will be available at:

```
http://localhost:3000
```

Swagger documentation:

```
http://localhost:3000/docs
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Returns API information |
| GET | /health | Returns server status |
| GET | /tasks | Returns all tasks |
| GET | /tasks/:id | Returns one task by ID |
| POST | /tasks | Creates a new task |
| PUT | /tasks/:id | Updates an existing task |
| DELETE | /tasks/:id | Deletes a task |

## Example curl Request

```bash
curl.exe -i http://localhost:3000/tasks
```

Example output:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 0,
    "title": "Learn JavaScript",
    "done": false
  },
  {
    "id": 1,
    "title": "Finish Assignment",
    "done": true
  }
]
```

## Swagger UI

![Swagger UI](images/swagger.png)
