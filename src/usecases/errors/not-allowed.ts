import { UseCaseError } from "./interface/usecase-error";

export class NotAllowedError extends Error implements UseCaseError {
  constructor(){
    super(`You are not allowed to execute this action`);
    this.name = 'notAllowedError';
  }
}