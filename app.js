// app.js
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const chatRouter = require("./routes/chat");

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.use("/api", chatRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
