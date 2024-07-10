import { Request, Response, NextFunction } from 'express';
import { body,param, validationResult } from 'express-validator';
import {getAllUsers} from './services/userService'; // Import your user service 
import {getAllToDos, getToDosByUserId} from './services/toDoService'; // Import your todo service 

// Middleware to check if users list is empty
export function checkUsersList(req: Request, res: Response, next: NextFunction) {
  const users = getAllUsers(); // Get all users from your user service

  if (users.length === 0) {
    return res.status(200).json({ message: "There are no current users" });
  }
  next();
}

// Middleware to validate 'GET' request for a user by ID
export const validateUserById = [
  param('id').isInt().withMessage('User ID must be an integer'),
  handleValidationErrors
];

// Middleware to validate user creation
export const validateUserCreate = [
  body('name').isString().notEmpty().withMessage('Name is required and must be a string'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

// Middleware to validate user update
export const validateUserUpdate = [
  body('name').optional().isString().notEmpty().withMessage('Name must be a non-empty string'),
  body('email').optional().isEmail().withMessage('Valid email format required'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

// Middleware to validate 'GET' request for a specific to-do of a user
export const validateUserIdAndToDoIdParams = [
  param('userId').isInt().withMessage('User ID must be an integer'),
  param('id').isInt().withMessage('To-do ID must be an integer'),
  handleValidationErrors
];

// Middleware to check if users list is empty
export function checkToDosList(req: Request, res: Response, next: NextFunction) {
  const toDos = getAllToDos(); // Get all toDos from your todo service

  if (toDos.length === 0) {
    return res.status(200).json({ message: "There are no current toDos" });
  }
  next();
}

// Middleware to check if users list is empty of a specific user
export function checkToDosListOfUser(req: Request, res: Response, next: NextFunction) {
  const userId = Number(req.params.userId); // Convert the id from string to number
  const toDos = getToDosByUserId(userId); // Get all toDos of a specific user from your todo service

  if (toDos.length === 0) {
    return res.status(200).json({ message: "There are no current toDos of this user" });
  }
  next();
}

// Middleware to validate 'GET' request for a to-do by ID
export const validateToDoById = [
  param('id').isInt().withMessage('To-do ID must be an integer'),
  handleValidationErrors
];

// Middleware to validate todo creation
export const validateTodoCreate = [
  body('title').isString().notEmpty().withMessage('Title is required and must be a string'),
  body('userId').isInt().withMessage('Valid userId is required'),
  handleValidationErrors
];

// Middleware to validate todo update
export const validateTodoUpdate = [
  body('title').optional().isString().notEmpty().withMessage('Title must be a non-empty string'),
  body('isCompleted').optional().isBoolean().withMessage('isCompleted must be a boolean'),
  handleValidationErrors
];

// Middleware to handle validation errors produced by express-validator
function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
