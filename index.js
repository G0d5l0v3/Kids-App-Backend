const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");




const app = express();

// allow cross origin requests from any domain, for testing purposes only!
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// routes
app.use("/api/v1/auth/", userRouter)


// load env variables
dotenv.config();
// environment variables
const port = process.env.PORT || 8000;
const connection_string = process.env.CONNECTION_STRING;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
mongoose
  .connect(connection_string)
  .then(() => console.log(`Database connection successful`))
  .catch((error) => console.log(`Database connection failed`, error));
