const express = require('express');

const app = express();

const PORT = 8081;

// pase JSON
app.use(express.json());

// parse URL encoded data
app.use(express.urlencoded({extended: true}));


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


// Creating the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



// Routes
// POST
app.post("/create", (req, res) => {
    // Create a user
    // Check if request body is empty
    if(Object.keys(req.body).length === 0) {
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
    } catch(err) {
        res.status(500).json({
            message: "Failed to create user",
        });
    }
});

// GET
app.get("/users", (req, res) => {
    // Retrieves all users
    try {
        res.status(200).json({
            users
        });
    } catch(err) {
        res.status(500).json({
            message: "Failed to retrieve all users",
        });
    }
});

// GET
app.get("/users/:userID", (req, res) => {
    // Returns a user by ID
    const id = parseInt(req.params.userID);
    console.log(id);
    try {
        let user = users.find((user) => user.id === id);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            user,
        });
    } catch(err) {
        res.status(500).json({
            message: "Failed to retrieve user",
        });
    }
});

// PUT
app.put("/users/:userID", (req, res) => {
    // Update a user by ID
    try {
        const id = parseInt(req.params.userID);
        let user = users.find((user) => user.id === id);
        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const userIDX = users.indexOf(user);
        users[userIDX].name = req.body.name || users[userIDX].name;
        users[userIDX].age = req.body.age || users[userIDX].age;
        res.status(200).json({
            message: "Successfully updated user",
            user,
        });
    } catch(err) {
        res.status(500).json({
            message: "Failed to retrieve user",
        });
    }
});

// DELETE
app.delete('/delete/:userID', (req, res) => {
    // Delete a user by ID
    try {
        const id = req.params.userID;
        let userIDX = users.findIndex((user) => user.id === id);
        if(!userIDX) {
            res.status(404).json({
                message: "User not found",
            });
        }
        users.splice(userIDX, 1);
        res.status(200).json({
            message: "Successfully deleted user",
            users,
        });
    } catch(err) {
        res.status(500).json({
            message: "Failed to delete user",
        });
    }
});

// DELETE
app.delete('/users', (req, res) => {
    // Delete all users
    try {
        users.splice(0, users.length);
        res.status(200).json({
            message: "Successfully deleted all users",
            users,
        });
    } catch(err) {
        res.status(500).json({
            message: "Failed to delete users",
            x,
        });
    }
});