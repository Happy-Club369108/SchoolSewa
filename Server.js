require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const {User, Attendance,ExamRoutine,ExamResult,TimeTable,Syllabus,Homework,Holiday,Notice,Fees,Payment,Salary,Expense,Class,Subject,Role} = require('./Schema');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const {authRoutes, crudeRoutes } = require('./APIFactory');

app.use('./auth' , authRoutes(User));

app.use('/users', crudeRoutes(User));
app.use('/attendance', crudeRoutes(Attendance));

app.use('/examroutines', crudeRoutes(ExamRoutine));
app.use('/examresults', crudeRoutes(ExamResult));

app.use('/timetables', crudeRoutes(TimeTable));
app.use('/syllabus', crudeRoutes(Syllabus));
app.use('/homework', crudeRoutes(Homework));
app.use('/holidays', crudeRoutes(Holiday));
app.use('/notices', crudeRoutes(Notice));

app.use('/fees', crudeRoutes(Fees));
app.use('/payments', crudeRoutes(Payment));
app.use('/salary', crudeRoutes(Salary));
app.use('/expenses', crudeRoutes(Expense));

app.use('/classes', crudeRoutes(Class));
app.use('/subjects', crudeRoutes(Subject));
app.use('/roles', crudeRoutes(Role));


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));