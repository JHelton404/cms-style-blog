const expresss = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = expresss();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on ${PORT}!`)
  })
})