const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory task storage
let tasks = [];
let nextId = 1;

// Root route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
        id: nextId++,
        title,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// GET /tasks/:id - Retrieve a single task
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
});

// PUT /tasks/:id - Update a task
app.put('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, completed } = req.body;
    
    if (title !== undefined) {
        tasks[taskIndex].title = title;
    }
    
    if (completed !== undefined) {
        tasks[taskIndex].completed = completed;
    }

    res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// 404 Handler - Catch all routes that don't match any endpoint
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Not Found',
        message: `The requested route ${req.originalUrl} does not exist`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    
    // Handle specific error types
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Invalid JSON payload'
        });
    }

    // Default error response
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong on our end'
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 