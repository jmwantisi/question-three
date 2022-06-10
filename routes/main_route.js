import dotenv from 'dotenv'
import mainController from '../controllers/main_controller'

const express = require('express')
const router = express.Router();

dotenv.config();

router.get('/generate', mainController.generateAlphaNumericUniqueStringObject);
router.get('/', mainController.allStringObjects);
router
    .route('/:id')
    .patch(mainController.updateStatus)


module.exports = router ;