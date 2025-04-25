// Our starter list of books
const initialBooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald"
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee"
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell"
    }
];

// Keep track of what ID to use next
let nextId = 4;

module.exports = {
    initialBooks,
    nextId
}; 