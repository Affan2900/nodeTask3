import express from 'express';
import * as toDoController from '../controllers/toDoController';
import {checkToDosList, validateToDoById,validateTodoCreate, validateTodoUpdate} from '../middleware';

// Create a router
const router = express.Router();

// Add routes to the router
router.get('/todos',checkToDosList, toDoController.getAllToDos);
router.get('/todos/:id',checkToDosList,validateToDoById, toDoController.getToDoById);
router.post('/todos',validateTodoCreate, toDoController.addToDo);
router.put('/todos/:id',checkToDosList,validateTodoUpdate, toDoController.updateToDo);
router.patch('/todos/:id',checkToDosList,validateTodoUpdate, toDoController.updateToDo);
router.delete('/todos/:id',checkToDosList,validateToDoById, toDoController.deleteToDo);

export default router;