//importing toDo model
import { toDo } from '../models/toDoModel';

//Declaring toDos as an empty array
let toDos: toDo[] = [];

//Method to get all toDos
export const getAllToDos = (): toDo[] => toDos;

//Method to get toDo by id
export const getToDoById = (id: number): toDo | undefined =>{
  return toDos.find( toDo => toDo.id === id)
}


//Method to add toDo
export const addToDo = (toDo: toDo): void =>{
  toDos.push(toDo);
}

//Method to update toDo
export const updateToDo = (id: number, updatedToDo: toDo): toDo | undefined  =>{
  const index = toDos.findIndex(toDo => toDo.id === id);
  if(index !== -1){
    toDos[index] = updatedToDo;
    return toDos[index];
  }
  return undefined;
}

//Method to delete toDo
export const deleteToDo = (id: number): void =>{
  toDos = toDos.filter(toDo => toDo.id !== id);
}

// Method to get todos by user ID
export const getToDosByUserId = (userId: number): toDo[] => {
  return toDos.filter(todo => todo.userId === userId);
};

// Method to get todo by user ID
export const getToDoByUserIdAndToDoId = (userId: number, toDoId: number): toDo | undefined => {
  return toDos.find(todo => todo.userId === userId && todo.id === toDoId);
};