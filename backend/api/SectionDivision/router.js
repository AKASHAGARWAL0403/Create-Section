const express = require('express');
import section from './repository';
const router = express.Router();

router.post("/view-all-section" , section.viewAllSection);
router.post("/view-section" , section.viewSection);
router.get("/section-count" , section.getSectionCount);
router.get("/student-count" , section.getStudentCount);
router.get("/check-section-created" , section.isSectionCreated);
router.get("/delete-section-creation" , section.deleteSectionCreation);
router.post("/divide-section" , section.divideSection);
module.exports = router;