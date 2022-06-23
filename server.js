const express = require('express');

const app = express();

const PORT = 8080;

// pase JSON
app.use(express.json());

// parse URL encoded data
app.use(express.urlencoded({extended: true}));

// creating the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

//

const users = [{
    id: 1,
    name: 'Jane Doe',
    age: 22,
},
{
    id: 2,
    name: "John Doe",
    age: 31,
}]


// Routes
app.post("/create", (req, res) => {
    // Check if request body is empty
    if(!Object.keys(req.body).length) {
        return res.status(400).json({
            message: "Request body cannot be empty",
        });
    }
    // Use object destructuring to get name and age
    const {name, age} = req.body;
    if(!name || !age) {
        res.status(400).json({
            message: "Ensure you sent both name and age",
        });
    }
    const newUser = {
        id: users.length + 1,
        name,
        age,
    };
    try {
        users.push(newUser);
        res.status(201).json({
            message: "Successfully created a new user",
        });
    } catch(error) {
        res.status(500).json({
            message: "Failed to create user",
        });
    }
});

app.get("/users", (req, res) => {
    try {
        res.status(200).json({
            users
        });
    } catch(error) {
        res.status(500).json({
            message: "Failed to retrieve all users",
        });
    }
});

app.get('/user/:userID', (req, res) => {
    // Returns a user by ID
});

app.put('/user/:userID', (req, res) => {
    // Update a user by ID
});

app.delete('/delete/:userID', (req, res) => {
    // Delete a user by ID
});

app.delete('/users', (req, res) => {
    // Delete all users
});