require('dotenv').config();
const express = require('express');
const app = express();
const mongooseConnect = require('./config/dbConfig');
const {
  createUser,
  readUser,
  removeUser,
  updateUser,
  uploadImg,
} = require('./controllers/userController');
const middlewareBlockage = require('./middleware/middleware');

// Multer - ExpressJS
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, file.fieldname + '-' + raw.toString('hex') + '.jpg');
      cb(null, Date.now() + '-' + file.originalname);
    });
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongooseConnect();

app.post('/user/signup', createUser);

app.get('/user/all', middlewareBlockage, readUser);

app.delete('/user/remove/:id', removeUser);

app.post('/user/update/:id', updateUser);

app.post('/user/upload', upload.single('seoul'), uploadImg);

app.listen(8000, () => console.log(`Server is running!`));
