const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname)));


mongoose.connect("mongodb://127.0.0.1:27017/authDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: String,
    password: String,
});

const User = mongoose.model("User", UserSchema);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, "products.html"));
});

app.post("/signup", async (req, res) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase(); 
    const dob = req.body.dob;
    const password = req.body.password?.trim(); 

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, dob, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
});

app.post("/login", async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();  
    const password = req.body.password?.trim(); 

    const user = await User.findOne({ email, password });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
});


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
