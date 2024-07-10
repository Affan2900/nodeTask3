//importing User model
import { User } from '../models/userModel';

//Declaring users as an empty array
let users: User[] = [];

//Method to get all users
export const getAllUsers = (): User[] => users;

//Method to get user by id
export const getUserById = (id: number): User | undefined =>{
  return users.find( user => user.id === id)
}

//Method to add user
export const addUser = (user: User): void =>{
  users.push(user);
}

//Method to update user
export const updateUser = (id: number, updatedUser: User): User | undefined  =>{
  const index = users.findIndex(user => user.id === id);
  if(index !== -1){
    users[index] = updatedUser;
    return users[index];
  }
  return undefined;
}

//Method to delete user
export const deleteUser = (id:number): void =>{
  users = users.filter(user => user.id !== id);
}


