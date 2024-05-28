import { UseCaseError } from "./interface/usecase-error";

export class TooYoungAgeError extends Error implements UseCaseError{
  constructor(age: number){
    super(`The "${age}" age is not valid. An employee must be 18 or older.`);
    this.name = 'TooYoungAgeError';
  }
}