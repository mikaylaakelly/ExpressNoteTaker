const fs = require('fs');
const express = require('express');
const path = require('path');
const util = require('util');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/develop/public')));

const notesFilePath = '/develop/public/notes.html';

const readFromFile = util.promisify(fs.readFile);



const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};
app.get('/api/notes', (req, res) => {
  readFromFile(notesFilePath)
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => console.error(err));
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