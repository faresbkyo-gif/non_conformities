const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./interfaces/routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
