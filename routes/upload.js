const express = require('express');
const auth_middleware = require('./middleware/auth_middleware');
const multerS3 = require('multer-s3');
const multer = require('multer');
const aws = require('aws-sdk');
const uuid = require('uuid').v4;
const path = require('path');

const router = express.Router();

const s3 = new aws.S3({ apiVersion: '2006-03-1' });

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'book-review',
        metadata: (req, file, callback) => {
            callback(null, { fieldName: file.fieldname })
        },
        key: (req, file, callback) => {
            const extension = path.extname(file.originalname);
            callback(null, `${uuid()}${extension}`);
        }
    })
});


router.post('/', auth_middleware, upload.single('image'), function (request, response) {
    return response.status(200).send({
        url: request.file
    });
});


module.exports = router;