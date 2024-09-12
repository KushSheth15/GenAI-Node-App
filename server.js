require('dotenv').config();
const { OpenAI } = require('openai');
const express = require('express');

// Configure OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

// Define generate function
const generate = async (prompt) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Specify the model you want to use
            messages: [{ role: "user", content: prompt }],
        });
        return response.data.choices[0].message.content; // Adjust according to the actual response structure
    } catch (error) {
        console.error('Error generating content:', error.message);
        throw error; // Rethrow to handle in the route
    }
};

// Define API route
app.get('/api/content', async (req, res) => {
    try {
        const data = req.query.question; // Use query params if you are sending question in URL params
        const result = await generate(data);
        res.status(200).json({ "Result": result });
        console.log(result);
    } catch (error) {
        console.error('Error in /api/content route:', error);
        res.status(500).json({ "Error": error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
