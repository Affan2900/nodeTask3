import { Request, Response } from 'express';
import { User } from '../models/userModel';
import * as userService from '../services/userService';
import * as toDoService from '../services/toDoService';

//Method to get all users
export const getAllUsers = (req: Request, res: Response): void => {
  const users = userService.getAllUsers();
  res.json(users);
}

//Method to get user by id
export const getUserById = (req: Request, res: Response): void => {
  const id = Number(req.params.id); // Convert the id to a number
  const user = userService.getUserById(id);
  if(user){
    res.json(user);
  }else{
    res.status(404).json({ message: 'User not found' })
  }
}

//Method to add user
export const addUser = (req: Request, res: Response): void => {
  const { name, email, password } = req.body;
  // Create a new User object
  const newUser: User = {
    id: Math.floor(Math.random() * 1000), // Example ID generation, use a proper ID generator or UUID in real cases
    name,
    email,
    password,
    isDisabled: false,
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  // Call the service to add the user
  userService.addUser(newUser);

  // Send response back to client
  res.status(201).json(newUser);
}

//Method to update user
export const updateUser = (req: Request, res: Response): void => {
  const id = Number(req.params.id); // Convert the id to a number
  const { name, email, password } = req.body;
  const user = userService.getUserById(id);

  if (user) {
    // Update the user in the database with the spread operator
    const updatedUser = {
      ...user,
      name: name !== undefined ? name : user.name,
      email: email !== undefined ? email : user.email,
      password: password !== undefined ? password : user.password,
      updatedDate: new Date(),
    };

    userService.updateUser(id, updatedUser);

    // Send response back to client
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};


//Method to delete user
export const deleteUser = (req: Request, res: Response): void =>{
  const id = Number(req.params.id); // Convert the id to a number
  const user = userService.getUserById(id);
  if(user){
    // Delete the user from the database
    userService.deleteUser(id);

    // Send response back to client
    res.status(200).json({
      message: 'User deleted successfully',
      user
    });
  }else{
    res.status(404).json({ message: 'User not found' })
  }
}

//Method to get all toDos of user
export const getAllToDosOfUser = (req: Request, res: Response) => {
  const userId = Number(req.params.id); // Convert the id from string to number

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const todos = toDoService.getToDosByUserId(userId);

  if (todos === undefined) {
    return res.status(404).json({ message: 'No todos found for this user' });
  }

  res.json(todos);
}

//Method to get toDo by userId and toDoId
export const getToDoByUserIdAndToDoId = (req: Request, res: Response) => {
    // Get the user ID from the request
    const userId = Number(req.params.userId);
    //Get the toDo Id
    const toDoId = Number(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = userService.getUserById(userId);
    if (user === undefined) {
      return res.status(404).json({ message: 'User not found' });
    }

    const todo = toDoService.getToDoByUserIdAndToDoId(userId, toDoId);
    if (todo === undefined) {
      return res.status(404).json({ message: 'No todo found for this user' });
    }
    res.json(todo);
}