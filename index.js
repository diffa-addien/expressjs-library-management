const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Initial project by diffa!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});