const express = require('express');
const morgan = require('morgan');
const app = express();

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

morgan.token('request-body', (req) => (Object.keys(req.body).length > 0) ? JSON.stringify(req.body) : ' ');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'));
app.use(express.json());

app.get('/info', (req, res) => {
    const date = new Date();
    const info = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    `;

    res.send(info);
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === Number(id));
    if (!person) res.status(404).end();
    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const newPersons = persons.filter(person => person.id !== Number(id));
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const newPerson = {...req.body};
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id)) 
    : 0;

    if (!newPerson.name || !newPerson.number) return res.status(400).json({ error: "person's name or number not assigned" });

    const isExist = persons.find(person => person.name === newPerson.name);
    if (isExist) return res.status(409).json({ error: 'name must be unique' });

    newPerson.id = maxId + 1;
    persons = persons.concat(newPerson);

    res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});