import { UseCaseError } from "./interface/usecase-error";

export class TooYoungAgeError extends Error implements UseCaseError{
  constructor(birthday: string){
    super(`The "${birthday}" birthday is not valid. An employee must be 18 or older.`);
    this.name = 'TooYoungAgeError';
  }
}