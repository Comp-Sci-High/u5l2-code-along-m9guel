const express = require("express");
const { type } = require("express/lib/response");

// import mongoose using require
const mongoose = require("mongoose")

// (in the terminal) npm i express mongoose


const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


// create a studentSchema with name, grade, advisory, and fav subject
const studentSchema = new mongoose.Schema({
name:{type: String, required: true},
grade:{type: Number, required: true, default: 9},
advisory:{type: String, required: true},
favSubject:{type: String, default: "No Favorite Subject"},
})
// connect your schema to a model called Student
const Student = mongoose.model("Student", studentSchema, "Students")

app.get("/g12", async (req, res) => {
const students = await Student.find({grade: 12})
res.json(students)
})
// create a route hanlder for /me that returns yourself without using your name
app.get("/me", async (req, res) => {
const students = await Student.findone({Name: "Miguel Sanchez"})
res.json(students)
})
// create a route hanlder for /friend that returns someone at your table using their name

async function startServer() {
  
  // In the SRV string, after the .net/ add myClass (e.g. ...mongodb.net/myClass?appName...)
  await mongoose.connect(
    "mongodb+srv://SE12:CSH2026@cluster12.3ffmh.mongodb.net/myClass?appName=Cluster12"
  );

  // before you run your code, uncomment the following and add your info, then the info of a friend
//   await new Student({
// name:"Miguel Sanchez",
// grade: 12,
// advisory: "The Bulls",
// favSUbject: "AP Literature"
// }).save();

  app.listen(3000, () => {
    console.log(`Server is running!`);
  });
}

startServer();
