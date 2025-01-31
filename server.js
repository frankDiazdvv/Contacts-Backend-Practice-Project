const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');

connectDB();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(`/api/contacts`, require(`./routes/contactRoutes`));
app.use(`/api/users`, require(`./routes/userRoutes`));

app.use(errorHandler);

app.listen(port, () => console.log(`Server Running on port ${port}`));