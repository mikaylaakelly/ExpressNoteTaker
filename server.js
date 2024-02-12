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



const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'develop', 'public', 'index.html'))
);


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'develop', 'public', 'notes.html'))
);


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', '404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);