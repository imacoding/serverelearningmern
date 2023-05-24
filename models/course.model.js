const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  resource_url: String
});
const Lesson = mongoose.model('Lesson', LessonSchema);
const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  image: {
     data: String,   
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: 'Category is required'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  instructor: { type: mongoose.Schema.ObjectId, ref: 'User' },
  published: {
    type: Boolean,
    default: false
  },
  lessons: [LessonSchema]
});

module.exports = mongoose.model('Course', CourseSchema);
