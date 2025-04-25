const express = require('express');
const app = express();
const { initialBooks, nextId } = require('./data/books');

// Request Logger Middleware
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
};

// Basic Authentication Middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const expectedKey = 'yoursecretkey';

    if (!authHeader || authHeader !== expectedKey) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Missing or invalid authorization key'
        });
    }

    next();
};

// Enhanced JSON Body Parser Middleware
app.use(express.json({
    limit: '10kb', 
    strict: true, 
    type: 'application/json' 
}));

// Apply middleware
app.use(requestLogger);

// Book data
let books = [...initialBooks];
let currentNextId = nextId;

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Book List API');
});

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /books/:id 
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
});

// POST /books - Create a new book (protected)
app.post('/books', authenticate, (req, res) => {
    const { title, author } = req.body;
    
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }

    const newBook = {
        id: currentNextId++,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id 
app.put('/books/:id', authenticate, (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const { title, author } = req.body;
    
    if (title !== undefined) {
        books[bookIndex].title = title;
    }
    
    if (author !== undefined) {
        books[bookIndex].author = author;
    }

    res.json(books[bookIndex]);
});

// DELETE /books/:id 
app.delete('/books/:id', authenticate, (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted successfully' });
});

// 404 Handler - Must be after all routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `The requested route ${req.originalUrl} does not exist`
    });
});

// Central Error Handler - Must be after all routes and middleware
app.use((err, req, res, next) => {
    // Log error details to console
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method
    });

    // Send generic error response to client
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 