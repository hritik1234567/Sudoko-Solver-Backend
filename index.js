const express = require('express');
const cors=require('cors');
const sudoko=require('./routes/sudokoRoute')
const app = express();

app.use(cors());
app.use(express.json());
app.use('/sudoko',sudoko)
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Sudoko App</h1>");
});
const PORT = 8000; // Provide a default port if PORT is not specified in the environment
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
