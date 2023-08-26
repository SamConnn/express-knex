import express from 'express';
import userController from '../controller/userController';

const r = express.Router();

r.get('/', (userController.getUser));

export default r;