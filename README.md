# Home Assignment – Full Stack (Java & AngularJS)

This is a **Task Management** application built as part of a home assignment. The goal of this project is to demonstrate clean architecture, well-reasoned technical decisions, and production-minded practices, rather than feature quantity.

The application provides full task lifecycle management: creating, viewing, updating, deleting tasks, and client-side search functionality.

---

## 🚀 Running the Application
Backend
- Java 17+
- Maven
- cd backend
- mvn clean install
- mvn spring-boot:run
- http://localhost:8080.

Frontend (AngularJS 1.x)
- Node.js
- npm
- cd frontend
- npm install
- npm start
- http://localhost:4200

  
## 🧰 Technology Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Backend    | Java + Spring Boot          |
| Frontend   | AngularJS 1.x   |
| Database   | H2 (in-memory)              |
| Build Tool | Maven                        |
| UI         | HTML, CSS, JavaScript       |

---

## 📝 Task Entity

| Field       | Type       | Description                          |
|------------ |----------- |-------------------------------------|
| id          | Long       | Unique identifier                     |
| title       | String     | Required task title                   |
| description | String     | Optional task description             |
| status      | Enum       | Task status: `OPEN` / `DONE`         |

---

## ⚙️ Backend (Spring Boot)

### Architecture

- Layered architecture: **Controller → Service → Repository**
- DTOs for request/response objects
- Bean validation on incoming DTOs
- Global exception handling using `@ControllerAdvice`
- Proper use of HTTP status codes for API responses
- CORS configured to allow frontend communication

### REST API Endpoints

| Method | Endpoint            | Description                   |
|--------|------------------- |-------------------------------|
| GET    | `/tasks`            | List all tasks                |
| GET    | `/tasks/{id}`       | Retrieve task by ID           |
| POST   | `/tasks`            | Create a new task             |
| PUT    | `/tasks/{id}`       | Update a task fully           |
| PATCH  | `/tasks/{id}`       | Partial update (e.g., status)|
| DELETE | `/tasks/{id}`       | Delete a task                 |

### Error Handling

- Validation errors → `400 Bad Request`
- Resource not found → `404 Not Found`
- Generic server errors → `500 Internal Server Error`

### Task Status Update Design Choice

For updating the task status (e.g., from `OPEN` to `DONE`), there were two main approaches:

1. **PATCH /tasks/{id}** – Partial update of the task, sending only the fields that changed.
2. **Dedicated action endpoint** – For example, `POST /tasks/{id}/complete` to mark a task as done.

**Chosen Approach:** **PUT /tasks/{id}**

**Reasoning:**

- The `PUT` endpoint updates the full task, including title, description, and status.
- Keeps the API simple by **using a single endpoint** for all updates, without creating extra action-specific endpoints.
- Ensures consistency: the client sends the full updated task, and the server replaces the existing one with it.
- Easier to handle in the frontend: a single form can update any task attribute, including status.


All errors return a **structured JSON response**:

```json
{
  "timestamp": "2026-02-27T12:00:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Task with ID 5 not found",
  "path": "/tasks/5"
}```


