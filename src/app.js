const connectDB = require('./database/db');
const app = require('./index');

const PORT = process.env.PORT || 3334
const DB_URL = process.env.DB_URL

connectDB(DB_URL);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})