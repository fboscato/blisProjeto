import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(null, `${Date.now()}${fileExtension}`);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype !== 'application/pdf') {
    return cb(new Error('Apenas arquivos PDF são permitidos.'));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
  fileFilter: fileFilter
});

export { upload };
