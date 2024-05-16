import { Either, left, right } from "../../shared/either";
import { InvalidNameError } from "../errors/invalid-name";

export class Name {
  private readonly name: string

  private constructor(name: string){
    this.name = name;
    //Object.freeze(this);
  }

  get value (): string {
    return this.name;
  }

  static validate(name: string): boolean{
    if (!name || name.trim().length < 2 || name.trim().length > 255){
      return false;
    }

    const tester = /^[A-Za-z\s]+$/
    if (!tester.test(name)){
      return false;
    }

    return true;
  }

  static create (name: string): Either<InvalidNameError, Name>{

    if (!Name.validate(name)){
      return left(new InvalidNameError(name))
    }
    return right(new Name(name));
  }

}