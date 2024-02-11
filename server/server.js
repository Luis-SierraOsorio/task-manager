const PORT = process.env.PORT ?? 8000

const express = require('express');
const app = express();
const pool = require("./db");


// get all todos in the backend
app.get("/", (req, res)=>{
    res.send("hello")
})

app.get('/todos',async (req, res)=>{
    try {
        const todos= await pool.query('SELECT * FROM todos')
        res.json(todos.rows);
    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})