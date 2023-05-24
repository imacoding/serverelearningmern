const express = require('express');
const enrollmentCtrl = require('../controllers/enrollment.controller');
const courseCtrl = require('../controllers/course.controller');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.get('/api/enrollment/enrolled', authCtrl.requireSignin, enrollmentCtrl.listEnrolled);

router.post('/api/enrollment/new/:courseId', authCtrl.requireSignin, enrollmentCtrl.findEnrollment, enrollmentCtrl.create);

router.get('/api/enrollment/stats/:courseId', enrollmentCtrl.enrollmentStats);

router.put('/api/enrollment/complete/:enrollmentId', authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.complete);

router.route('/api/enrollment/:enrollmentId')
  .get(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.read)
  .delete(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.remove);

router.param('courseId', courseCtrl.courseByID);
router.param('enrollmentId', enrollmentCtrl.enrollmentByID);

module.exports = router;
