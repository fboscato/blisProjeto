import { Router } from "express";
import { register } from "./controller/register";
import { authenticate } from "./controller/authenticate";
import { profile } from "./controller/profile";
import { verifyJWT } from "./controller/middlewares/verify-jwt";
import multer from 'multer';
import { createUserDocument } from "../model/userDocuments";

import {  createUserAbility, deleteUserAbility, getUserAbilities } from "./controller/usersAbilitiesController";

import { updateAbility } from "./controller/abilidadeUpdate";
import { createAbility } from "./controller/abilidadeCreate";
import { weatherRoutes } from "./weatherRoutes";

const upload = multer({
  dest: 'uploads/',  // Pasta para armazenar os arquivos
  limits: { fileSize: 10 * 1024 * 1024 },  // Limite de 10MB
  fileFilter: (req, file, cb) => {
    const fileExt = file.originalname.split('.').pop()?.toLowerCase();
    if (fileExt !== 'pdf') {
      return cb(new Error('Somente arquivos PDF são permitidos.'));
    }
    cb(null, true);
  },
});
export const routes = Router();

routes.post("/users", register);
routes.post("/session", authenticate);
routes.use('/api', weatherRoutes);
routes.get("/login",verifyJWT ,profile);
routes.post('/abilities',verifyJWT, createAbility);
routes.put('/abilities/:id',verifyJWT, updateAbility);
routes.post('/users/abilities', verifyJWT, createUserAbility);
routes.delete('/users/abilities', verifyJWT, deleteUserAbility);
routes.get('/users/abilities', verifyJWT, getUserAbilities);
routes.post('/users/documents',verifyJWT, upload.single('document'), createUserDocument);
