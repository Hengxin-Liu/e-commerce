import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

// Multer is a node.js middleware for handling multipart/form-data,
 //which is primarily used for uploading files.

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination : (req, file ,cb) => {
      cb(null,'uploads/');
  },
  filename: (req, file ,cb) => {
      cb(null, `${Date.now()}.jpg`)
  }
});

const upload = multer({storage: storage});

uploadRouter.post('/', 
  isAuth, 
//Accept a single file with the name fieldname. The single file will be stored in req.file.
  upload.single('image'),
  (req, res) => {
   res.send(`/${req.file.path}`);
});


export default uploadRouter;