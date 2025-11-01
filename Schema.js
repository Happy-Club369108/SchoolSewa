const mongoose = require('mongoose');

// 1. User Management
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  number: { type: String, required: true },
  role: { type: String, enum: ["Student", "Teacher", "Exam", "Academic"], required: true },
  password: { type: String, required: true },
  subjects: [String],
  class: { type: String },
}, { timestamps: true });

// 2. Attendance Management
const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ["Student", "Teacher", "Exam", "Academic"], required: true },
  class: { type: String },
  subject: { type: String },
}, { timestamps: true });

// 3. Exam Management
const examRoutineSchema = new mongoose.Schema({
  class: { type: String, required: true },
  subject: { type: String, required: true },
  examDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
}, { timestamps: true });

const examResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  marksObtained: { type: Number, required: true },
  examDate: { type: Date, required: true },
  class: { type: String, required: true },
}, { timestamps: true });

// 4. Academic Management
const timeTableSchema = new mongoose.Schema({
  class: { type: String, required: true },
  day: { type: String, required: true },
  periods: [
    {
      subject: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
}, { timestamps: true });

const syllabusSchema = new mongoose.Schema({
  class: { type: String, required: true },
  subject: { type: String, required: true },
  topics: [String],
}, { timestamps: true });

const homeworkSchema = new mongoose.Schema({
  class: { type: String, required: true },
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
}, { timestamps: true });

const holidaySchema = new mongoose.Schema({
  holidayName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
}, { timestamps: true });

// 5. Info Management
const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
}, { timestamps: true });

// 6. Account Management
const feesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["Paid", "Unpaid"], required: true },
}, { timestamps: true });

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  method: { type: String, enum: ["Cash", "Card", "Online"], required: true },
}, { timestamps: true });

const salarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  month: { type: String, required: true },
  year: { type: Number, required: true },
}, { timestamps: true });

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  expenseDate: { type: Date, default: Date.now },
  category: { type: String, required: true },
}, { timestamps: true });

// 7. Filter Management (for dropdowns, lists, etc.)
const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  section: { type: String },
}, { timestamps: true });

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  class: { type: String },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const rolesSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const ExamRoutine = mongoose.model('ExamRoutine', examRoutineSchema);
const ExamResult = mongoose.model('ExamResult', examResultSchema);
const TimeTable = mongoose.model('TimeTable', timeTableSchema);
const Syllabus = mongoose.model('Syllabus', syllabusSchema);
const Homework = mongoose.model('Homework', homeworkSchema);
const Holiday = mongoose.model('Holiday', holidaySchema);
const Notice = mongoose.model('Notice', noticeSchema);
const Fees = mongoose.model('Fees', feesSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Salary = mongoose.model('Salary', salarySchema);
const Expense = mongoose.model('Expense', expenseSchema);
const Class = mongoose.model('Class', classSchema);
const Subject = mongoose.model('Subject', subjectSchema);
const Role = mongoose.model('Role', rolesSchema);

module.exports = {
  User,
  Attendance,
  ExamRoutine,
  ExamResult,
  TimeTable,
  Syllabus,
  Homework,
  Holiday,
  Notice,
  Fees,
  Payment,
  Salary,
  Expense,
  Class,
  Subject,
  Role,
};