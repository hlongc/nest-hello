import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'uploads'));
    } catch (e) {}

    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const fileFilter: multer.Options['fileFilter'] = (req, file, callback) => {
  file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
  callback(null, true);
};

export { storage, fileFilter };
