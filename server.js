const fs = require('fs');
const express = require('express');
const https = require('https');


const app = express();

const PORT = 443;

// pase JSON
app.use(express.json());

// parse URL encoded data
app.use(express.urlencoded({extended: true}));

const users = [];

const key = fs.readFileSync('./aspectofjerry_dev/aspectofjerry_dev.txt');
const cert = fs.readFileSync('./aspectofjerry_dev/aspectofjerry_dev.crt');

// Creating the server
https.createServer({
    key: key,
    cert: cert,
}, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// Routes
// POST
app.post("/create", (req, res) => {
    console.log("Incoming POST request at '/create'");
    // Create a user
    // Check if request body is empty
    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "400: Request body cannot be empty",
        });
    }
    // Use object destructuring to get name and age
    const {name, age} = req.body;
    if(!name || !age) {
        res.status(400).json({
            message: "400: Ensure you sent both name and age",
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
            message: "201: Successfully created a new user",
        });
    } catch(err) {
        res.status(500).json({
            message: "500: Failed to create user",
        });
    }
});

// GET
app.get("/users", (req, res) => {
    console.log("Incoming GET request at '/users'");
    // Retrieves all users
    try {
        res.status(200).json({
            users
        });
    } catch(err) {
        res.status(500).json({
            message: "500: Failed to retrieve all users",
        });
    }
});

// GET
app.get("/users/:userID", (req, res) => {
    console.log("Incoming GET request at '/users/:userID'");
    // Returns a user by ID
    const id = parseInt(req.params.userID);
    console.log(id);
    try {
        let user = users.find((user) => user.id === id);
        if(!user) {
            return res.status(404).json({
                message: "404: User not found",
            });
        }
        res.status(200).json({
            user,
        });
    } catch(err) {
        res.status(500).json({
            message: "500: Failed to retrieve user",
        });
    }
});

// PUT
app.put("/users/:userID", (req, res) => {
    console.log("Incoming PUT request at '/users/:userID'");
    // Update a user by ID
    try {
        const id = parseInt(req.params.userID);
        let user = users.find((user) => user.id === id);
        if(!user) {
            return res.status(404).json({
                message: "404: User not found",
            });
        }
        const userIDX = users.indexOf(user);
        users[userIDX].name = req.body.name || users[userIDX].name;
        users[userIDX].age = req.body.age || users[userIDX].age;
        res.status(200).json({
            message: "200: Successfully updated user",
            user,
        });
    } catch(err) {
        res.status(500).json({
            message: "500: Failed to retrieve user",
        });
    }
});

// DELETE
app.delete('/delete/:userID', (req, res) => {
    console.log("Incoming DELETE request at '/delete/:userID'");
    // Delete a user by ID
    try {
        const id = req.params.userID;
        let userIDX = users.findIndex((user) => user.id === id);
        if(!userIDX) {
            res.status(404).json({
                message: "404: User not found",
            });
        }
        users.splice(userIDX, 1);
        res.status(200).json({
            message: "200: Successfully deleted user",
            users,
        });
    } catch(err) {
        res.status(500).json({
            message: "500: Failed to delete user",
        });
    }
});

// DELETE
app.delete('/deleteall', (req, res) => {
    console.log("Incoming request at '/deleteall'");
    // Delete all users
    try {
        users.splice(0, users.length);
        res.status(200).json({
            message: "200: Successfully deleted all users",
            users,
        });
    } catch(err) {
        res.status(500).json({
            message: "500: Failed to delete users",
            x,
        });
    }
});