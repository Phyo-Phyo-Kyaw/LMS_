const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getAllCourses);
router.get('/create', courseController.createCourse);
router.post('/store', courseController.storeCourse);
module.exports = router;
