const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const PostgresRepository = require("./repositories/postgresRepository");

const app = express();
app.use(express.json());

const PORT = 3000;
const repository = new PostgresRepository();

// Root endpoint
app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
    });
});

// Health endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

// Get all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await repository.getAll();
    res.json(tasks);
});

// Get one task
app.get("/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    const task = await repository.getById(id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);
});

// Create task
app.post("/tasks", async (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const newTask = await repository.create(title);

    res.status(201).json(newTask);
});

// Update task
app.put("/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, done } = req.body;

    if (title === undefined && done === undefined) {
        return res.status(400).json({
            error: "Request body is empty"
        });
    }

    const updatedTask = await repository.update(id, { title, done });

    if (!updatedTask) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(updatedTask);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    const deleted = await repository.delete(id);

    if (!deleted) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.sendStatus(204);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});