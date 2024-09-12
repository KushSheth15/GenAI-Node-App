require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const app = express();

PORT = process.env.PORT;
app.use(express.json());

const generate = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text(); 
    } catch (error) {
        console.log(error.message);
    }
}

// generate();

app.get('/api/content',async (req,res)=>{
    try {
        const data = req.body.question;
        const result = await generate(data);
        res.status(200).json({"Result":result});
        console.log(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": error.message});
    }
})

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
})