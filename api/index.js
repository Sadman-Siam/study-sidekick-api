require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 5000;
const userRoutes = require("../routes/userRoutes");

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());

//test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//

app.use("/api/user", userRoutes);

//manual deploy
if (require.main === module) {
  const runserver = async function () {
    try {
      await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("MongoDB connected");
      });
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  };
  runserver();
}
//

//vercel deploy
let isConnected = false;
const connectToDatabase = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
//

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};
