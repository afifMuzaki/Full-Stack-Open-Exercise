require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();

morgan.token('request-body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'));
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/info', (req, res, next) => {
  const date = new Date();

  Person.countDocuments({})
    .then((count) => {
      const info = `
          <p>Phonebook has info for ${(count)} people</p>
          <p>${date}</p>
        `;

      res.send(info);
    }).catch(err => next(err));
});

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(savedPersons => {
      res.json(savedPersons);
    }).catch(err => next(err));
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    }).catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    }).catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson);
    }).catch(err => next(err));
});

app.post('/api/persons', (req, res) => {
  if (!req.body.name || !req.body.number) return res.status(400).json({ error: "person's name or number not assigned" });

  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  person.save()
    .then(result => {
      res.json(result);
    }).catch(err => next(err));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
