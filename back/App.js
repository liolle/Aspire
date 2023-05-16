const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");

// parse application/json
app.use(bodyParser.json());
app.use('/model', require('./route/model'));
app.use('/user', require('./route/user'));
app.use('/modellangage',require('./route/modellangage'))

// Middleware to process request data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Aspire",
  port: 8889
});

db.connect((err) => {
  if (err) throw err;
  console.log("MYSQL2 Connected");

  // Script to insert languages
  const languages = [
    { name: 'English', initiales: 'EN', flag: 'english.png' },
  { name: 'French', initiales: 'FR', flag: 'french.png' },
  { name: 'Spanish', initiales: 'ES', flag: 'spanish.png' },
  { name: 'German', initiales: 'DE', flag: 'german.png' },
  { name: 'Italian', initiales: 'IT', flag: 'italian.png' },
  { name: 'Portuguese', initiales: 'PT', flag: 'portuguese.png' },
  { name: 'Russian', initiales: 'RU', flag: 'russian.png' },
  { name: 'Chinese', initiales: 'ZH', flag: 'chinese.png' },
  { name: 'Japanese', initiales: 'JA', flag: 'japanese.png' },
  { name: 'Korean', initiales: 'KO', flag: 'korean.png' },
  { name: 'Arabic', initiales: 'AR', flag: 'arabic.png' },
  { name: 'Turkish', initiales: 'TR', flag: 'turkish.png' },
  { name: 'Greek', initiales: 'EL', flag: 'greek.png' },
  { name: 'Hindi', initiales: 'HI', flag: 'hindi.png' },
  { name: 'Dutch', initiales: 'NL', flag: 'dutch.png' },
  { name: 'Swedish', initiales: 'SV', flag: 'swedish.png' },
  { name: 'Norwegian', initiales: 'NO', flag: 'norwegian.png' },
  { name: 'Danish', initiales: 'DA', flag: 'danish.png' },
  { name: 'Finnish', initiales: 'FI', flag: 'finnish.png' },
  { name: 'Polish', initiales: 'PL', flag: 'polish.png' },
  { name: 'Czech', initiales: 'CS', flag: 'czech.png' },
  { name: 'Slovak', initiales: 'SK', flag: 'slovak.png' },
  { name: 'Hungarian', initiales: 'HU', flag: 'hungarian.png' },
  { name: 'Bulgarian', initiales: 'BG', flag: 'bulgarian.png' },
  { name: 'Romanian', initiales: 'RO', flag: 'romanian.png' },
  { name: 'Croatian', initiales: 'HR', flag: 'croatian.png' },
  { name: 'Serbian', initiales: 'SR', flag: 'serbian.png' },
];

const checkQuery = 'SELECT COUNT(*) AS count FROM ma_langages';
db.query(checkQuery, (error, results, fields) => {
  if (error) {
    console.error(`Error checking language count: ${error.message}`);
  } else {
    const count = results[0].count;
    if (count === 0) {
      for (const language of languages) {
        const { name, initiales, flag } = language;
        const query = `INSERT INTO ma_langages (name, initiales, flag) VALUES (?, ?, ?)`;
        const values = [name, initiales, flag];

        db.query(query, values, (error, results, fields) => {
          if (error) {
            console.error(`Error inserting language "${name}": ${error.message}`);
          } else {
            console.log(`Language "${name}" successfully inserted.`);
          }
        });
      }
    } else {
      console.log("Languages already exist in the table. Skipping insertion.");
    }
  }
});
});

app.listen(8000, () => {
console.log("Server started on port 8000");
});