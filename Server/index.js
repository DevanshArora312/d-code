require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');

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

app.post('/pdf-parse', async(req, res)=>{
    if((!req.files) || (!req.files.pdfDocument)){
        return res.status(400).json({
            success: false,
            message: 'no pdf found in request'
        })
    }  

    const {pdfDocument} = req.files;

    pdfParse(pdfDocument)
    .then((result)=>{
        return res.status(200).json({
            success: true,
            messsage: result.text
        })
    })
})

app.listen(port,  () => {
    console.log(`SERVER IS LISTENING AT ${port}`);
})