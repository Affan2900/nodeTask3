import express from 'express';
import * as userController from '../controllers/userController';
import { validateUserCreate, validateUserUpdate, validateUserById, validateUserIdAndToDoIdParams,checkUsersList, checkToDosListOfUser, checkToDosList } from '../middleware';

// Create a router
const router = express.Router();

// Add routes to the router
router.get('/users', checkUsersList, userController.getAllUsers);
router.get('/users/:id',checkUsersList,validateUserById, userController.getUserById);
router.post('/users', validateUserCreate, userController.addUser);
router.put('/users/:id',checkUsersList,validateUserUpdate, userController.updateUser);
router.patch('/users/:id',checkUsersList,validateUserUpdate, userController.updateUser);
router.delete('/users/:id',checkUsersList,validateUserById, userController.deleteUser);
router.get('/users/:id/todos',validateUserById,checkUsersList,checkToDosList,checkToDosListOfUser, userController.getAllToDosOfUser);
router.get('/users/:userId/todos/:id',validateUserIdAndToDoIdParams, checkUsersList,checkToDosList,checkToDosListOfUser, userController.getToDoByUserIdAndToDoId);  

export default router;