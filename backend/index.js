const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerModel = require('./models/Customer');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

mongoose.connect("mongodb://127.0.0.1:27017/curdmern", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB Connection Error:", err));

app.post("/", (req, res) => {
  CustomerModel.create(req.body)
    .then((user) => res.json({ message: "Success", user }))
    .catch((err) => res.status(500).json({ message: err.message }));
});

app.get("/users", async (req, res)=>{
    try{
        const users = await CustomerModel.find();
        res.json(users)
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
})

app.put("/users/:id", async (req, res) => {
    try {
      const updatedUser = await CustomerModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  app.delete("/users/:id", async (req, res) => {
    try {
      await CustomerModel.findByIdAndDelete(req.params.id);
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
