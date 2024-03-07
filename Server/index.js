require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const fs= require("fs");
const pdf = require("pdf-creator-node");
const port = 8080;
const path = require('path');

const options = {
    formate: 'A3',
    orientation: 'portrait',
    border: '2mm',

}

const app = express();
var tempData=""

app.use(
    cors({
        origin: '*',
        method:["PUT", "GET", "POST", "PATCH", "DELETE"],
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
    if(!(req.files && req.files.pdfDocument)){
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
            message: result.text
        })
    })
})


app.post('/translate', async(req, res)=>{
    const {languageFrom, languageTo, text} = req.body;
    console.log(languageFrom, languageTo, text);
    if(!languageFrom || !languageTo || !text){
        return res.status(400).json({
            success: false,
            message: 'all fields are required'
        })
    }
    const data = {
        config: {
            language: {
                sourceLanguage: languageFrom,
                targetLanguage: languageTo,
                targetScriptCode: null,
                sourceScriptCode: null
            },
            serviceId: ''
        },
        controlConfig: {
            dataTracking: true
        },
        input: text
    }
    const axiosInstance = axios.create({});
    const response = await axiosInstance({
        method: 'POST',
        url: 'https://demo-api.models.ai4bharat.org/inference/translation/v2',
        data,
        headers: null,
        params: null
    })
    tempData= response.data.output[0].target;
    return res.status(200).json({
        success: true, 
        message: response.data.output[0].target
    })
})


app.post("/pdfconvert",(req, res)=>{
    const {text} = req.body;
    const html = fs.readFileSync(path.join(__dirname, '/views/template.html'), 'utf-8');
    const filename = Math.random() + '_doc' + '.pdf'
    const document = {
        html: html,
        data: {
            text
        },
        path: './docs/' + filename
    }
    pdf.create(document, options)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.error(err);
    })
    const filepath = 'http://localhost:8080/docs/' + filename;
    console.log(filepath);
    return res.status(200).json({
        success: true,
        file: filepath
    })
})

app.listen(port,  () => {
    console.log(`SERVER IS LISTENING AT ${port}`);
})