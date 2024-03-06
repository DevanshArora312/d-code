require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 4000;

const app = express();

app.use(
    cors({
        origin: '*',
        credentials: true
    })
)

app.use(fileUpload());

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'server is up and running'
    })
})

app.listen(port,  () => {
    console.log(`SERVER IS LISTENING AT ${port}`);
})