const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;

const tasks = [
    {
        id: 0,
        title: "Learn JavaScript",
        done: false
    },
    {
        id: 1,
        title: "Finish Assignment",
        done: true
    },
    {
        id: 2,
        title: "Check Emails",
        done: false
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

app.post("/tasks", (req, res) => {
    const { title, done } = req.body;
    if (!title || title.trim() === "") {
    return res.status(400).json({
        error: "Title is required"
    });
}

    const id = tasks.length;
    const newTask = {
    id,
    title,
    done: false
};
    tasks.push(newTask);
    res.status(201).json(newTask);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});