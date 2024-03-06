require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const axios = require('axios');

const port = 8080;

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
    console.log(response);
    return res.status(200).json({
        success: true, 
        message: response.data.output[0].target
    })
})

app.listen(port,  () => {
    console.log(`SERVER IS LISTENING AT ${port}`);
})