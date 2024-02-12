// const express = require('express');
// const path = require('path');
// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');

// const PORT = process.env.PORT || 3001;

// const app = express();

// // Import custom middleware, "cLog"
// app.use(clog);

// // Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

// app.use(express.static('public'));

// // GET Route for homepage
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// // GET Route for feedback page
// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
// );

// // Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );

// app.listen(PORT, () =>
//   console.log(`App listening at http://localhost:${PORT}`)
// );
// MINI PROJECT EXAPMLE


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


// // Promise version of fs.readFile
// const readFromFile = util.promisify(fs.readFile);
// /**
//  *  Function to write data to the JSON file given a destination and some content
//  *  @param {string} destination The file you want to write to.
//  *  @param {object} content The content you want to write to the file.
//  *  @returns {void} Nothing
//  */
// const writeToFile = (destination, content) =>
//   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//     err ? console.error(err) : console.info(`\nData written to ${destination}`)
//   );
// /**
//  *  Function to read data from a given a file and append some content
//  *  @param {object} content The content you want to append to the file.
//  *  @param {string} file The path to the file you want to save to.
//  *  @returns {void} Nothing
//  */
// const readAndAppend = (content, file) => {
//   fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedData = JSON.parse(data);
//       parsedData.push(content);
//       writeToFile(file, parsedData);
//     }
//   });
// };

// module.exports = { readFromFile, writeToFile, readAndAppend };
// MINI PROJECT UTILS NOTES////

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