const express = require("express");
const app = express();
const PORT = 3000;

const tasks = [
    {
        id: 0,
        title: "Learn JavaScript",
        completed: false
    },
    {
        id: 1,
        title: "Finish Assignment",
        completed: true
    },
    {
        id: 2,
        title: "Check Emails",
        completed: false
    }
];

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

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            "error": `Task ${id} not found`
        });
    }

    res.json(task);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});