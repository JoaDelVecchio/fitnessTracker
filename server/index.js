const express = require("express");
const app = express();

const mongoose = require("mongoose");
const password = process.argv[2];
const mongoURI = `mongodb+srv://joaquinemilianodelvecchio:${password}@cluster0.jrazic8.mongodb.net/fitnessTracker?retryWrites=true&w=majority&appName=Cluster0`;
const UserModel = require("./models/Users");

const cors = require("cors");

mongoose.connect(mongoURI);

app.use(express.json());
app.use(cors());

app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users from database", error);
    res.status(500).json({ message: "Error getting users from database" });
  }
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);

  try {
    await newUser.save();
    res.status(201).json({ message: "New user created succesfully" });
  } catch (error) {
    console.error("Error creating new user", error);
    res.status(500).json({ message: "Error creating new user" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log("Server running on", PORT));
