import { Request, Response } from 'express';
import { toDo } from '../models/toDoModel';
import * as toDoService from '../services/toDoService';
import * as userService from '../services/userService';

//Method to get all toDos
export const getAllToDos = (req: Request, res: Response): void =>{
  const toDos = toDoService.getAllToDos();
  res.json(toDos);
}

//Method to get toDo by id
export const getToDoById = (req: Request, res: Response): void =>{
  const id = Number(req.params.id); // Convert the id to a number
  const toDo = toDoService.getToDoById(id);
  if(toDo){
    res.json(toDo);
  }else{
    res.status(404).json({ message: 'ToDo not found' })
  }
}

//Method to add toDo
export const addToDo = (req: Request, res: Response): void =>{
  const { title, userId } = req.body;

  // Parse userId to number
  const parsedUserId = Number(userId);

  //find parsedUserId in users
  const user = userService.getUserById(parsedUserId);
  if(user){
    // Create a new ToDo object
    const newToDo: toDo = {
      id : Math.floor(Math.random() * 1000),
      title,
      userId: parsedUserId,
      isCompleted: false,
      createdDate: new Date(),
      updatedDate: new Date(),
    }
    toDoService.addToDo(newToDo);

    // Send response back to client
    res.status(201).json(newToDo);
  }
  else{
    res.status(404).json({ message: 'User not found' })
  }
}

//Method to update toDo
export const updateToDo = (req: Request, res: Response): void =>{
  const id = Number(req.params.id); // Convert the id to a number
  const { title, userId } = req.body;
  // Parse userId to number
  const parsedUserId = Number(userId);

  const toDo = toDoService.getToDoById(id);
  if(toDo){
    // Update the toDo in the database
    const updatedToDo = {
      ...toDo,
      title: title !== undefined ? title : toDo.title,
      userId: userId !== undefined ? parsedUserId : toDo.userId,
      updatedDate: new Date(),
    }
    
    toDoService.updateToDo(id,updatedToDo);

    // Send response back to client
    res.status(200).json(updatedToDo);
  }else{
    res.status(404).json({ message: 'ToDo not found' })
  }
}

//Method to delete toDo
export const deleteToDo = (req: Request, res: Response): void =>{
  const id = Number(req.params.id); // Convert the id to a number
  const toDo = toDoService.getToDoById(id);
  if(toDo){
    // Delete the toDo from the database
    toDoService.deleteToDo(id);

    // Send response back to client
    res.status(200).json({
      message: 'ToDo deleted successfully',
      toDo});
  }else{
    res.status(404).json({ message: 'ToDo not found' })
  } 
}


