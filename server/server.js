const PORT = process.env.PORT ?? 8000

// getting express
const express = require('express');
// getting the pool connection from the db file
const pool = require("./db");
// cors for issues
const cors = require('cors');
// making unique ids
const { v4: uuidv4 } = require('uuid');
// encrypting passwords
const bcrypt = require('bcrypt');
// jwt token for authentication
const jwt = require('jsonwebtoken');

// setting up the express app
const app = express();
// setting up cors
app.use(cors());
// using express.json for parsing incoming data
app.use(express.json())


// get all todos in the backend
app.get("/", (req, res) => {
    res.send("hello")
})

// route to get all tasks based on the email that is received
app.get('/todos/:userEmail', async (req, res) => {
    // destructuring the userEmal from the params
    const { userEmail } = req.params

    try {
        // quering the tasks based on the email
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        // parsing each row
        res.json(todos.rows);
    } catch (error) {
        console.log(error)
    }
})

// route to post a new todo
app.post("/todos", async (req, res) => {
    try {
        // destructuing the email, title, progress and date
        const { user_email, title, progress, date } = req.body
        // creating new id
        const id = uuidv4();
        // inserting the new todo
        const newTodo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2,$3, $4, $5)`, [id, user_email, title, progress, date])
        // console.log(response)
        res.json(newTodo)
    } catch (error) {
        console.log(error)
    }
})

// route for editing a task
app.put('/todos/:id', async (req, res) => {
    // destructuring the id from the params
    const { id } = req.params
    // getting the useremail, title, progress and date from the body
    const { user_email, title, progress, date } = req.body
    try {
        // UPDATING the given the todo
        const editTodo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5', [user_email, title, progress, date, id])
        res.json(editTodo)
    } catch (error) {
        console.log(error)
    }
})

// route for deleting a specific todo task
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        // just deleting the specfic task
        const deleteTodo = await pool.query(`DELETE FROM todos WHERE id=$1`, [id])
        res.json(deleteTodo);
    } catch (error) {
        console.log(error)
    }
})

// route for the signup
app.post('/signup', async (req, res) => {
    // getting the email and password
    const { email, password } = req.body
    // getting a salt for the password
    const salt = bcrypt.genSaltSync(10)
    // hashing the password
    const hashedPassword = bcrypt.hashSync(password, salt)


    try {
        // setting the new user into the db with the hashed password
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, [email, hashedPassword])

        // creating a token for the sign up/login and setting an experiation time
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
        // sending back the email and token
        res.json({ email, token });
    } catch (error) {
        // console.log(error)
        if (error) {
            res.json({ detail: error.detail })
        }
    }
})

// route for the log in
app.post('/login', async (req, res) => {
    // destructuring the email and password
    const { email, password } = req.body
    try {
        // getting everything back from the db based on the email
        const users = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        // if the users does not existthen returned user does not exist detail
        if (!users.rows.length) return res.json({ detail: "User does not exist" });
        // using bcrypt for the comparison of the password and hashed password 
        const success = await bcrypt.compare(password, users.rows[0].hashed_password);
        // creating a token
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
        if (success) {
            // returning the email and token
            res.json({ 'email': users.rows[0].email, token });
        } else {
            res.json({ detail: "Login failed" });
        }
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})