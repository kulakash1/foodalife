const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
mongoose.connect(
  "mongodb+srv://upsurge007369:9QLqMNJulnJa8WUo@cluster0.ma8ynik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
const FoodItemSchema = new mongoose.Schema({
  dishName: String,
  dishPrice: String,
  type: String,
});
const FoodSchema = new mongoose.Schema({
  restaurantName: String,
  restaurantAddress: String,
  googleAddress: String,
  mobileNumber: String,
  email: String,
  startTime: String,
  endTime: String,
  daysClosed: [String],
  fooDItems: [FoodItemSchema],
});
app.use(bodyParser.json());
app.use(cors());

const Food = mongoose.model("Food", FoodSchema);
app.get("/", async (req, res) => {
  res.send("Hello World");
});
app.post("/", async (req, res) => {
  const food = new Food(req.body);
  console.log(food);
  await food.save();
  res.send("Data saved");
});
