const fs = require('fs');
const express = require('express');
const path = require('path');
const util = require('util');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, '/develop/public')));

const notesFilePath = path.join(__dirname, 'develop/public/notes.html')

const readFromFile = util.promisify(fs.readFile);
const appendFile = util.promisify(fs.appendFile);



const readAndAppend = (content, file) => {
  const stringContent = JSON.stringify(content);
  return appendFile(file, stringContent, 'utf8')
    .then(() => console.log('Note Saved YAY'))
    .catch((err) => console.error('ERROR', err));
};


app.get('/api/notes', (req, res) => {
  readFromFile(notesFilePath, 'utf8')
    .then((data) => res.send(data))
    .catch((err) => {
      console.error('Error reading notes:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  readAndAppend(newNote, notesFilePath);
  res.json(newNote);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'develop/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'develop/public/404.html'));
});


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});