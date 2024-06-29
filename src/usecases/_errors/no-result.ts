import { UseCaseError } from "./interface/usecase-error";

export class NoResultError extends Error implements UseCaseError {
  constructor(value: string){
    super(`"${value}" was not found`);
    this.name = 'NoResultError';
  }
}