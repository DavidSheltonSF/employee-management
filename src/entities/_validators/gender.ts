import { Either, left, right } from "../../shared/either";
import { InvalidGenderError } from "../_errors/invalid-gender";

enum GenderEnum{
  M = 'male',
  F = 'female'
}

export class Gender {
  private readonly gender: string;

  private constructor (gender: string){
    this.gender = gender;
    Object.freeze(this);
  }

  get value (): string{
    return this.gender;
  }

  static validate(gender: string): boolean {

    const genderLower = gender.toLocaleLowerCase()

    if(genderLower === GenderEnum.M || genderLower == GenderEnum.F){
      return true;
    }
    return false

  }

  static create(gender: string): Either<InvalidGenderError, Gender> {
    
    if (!Gender.validate(gender)){
      return left(new InvalidGenderError(gender))
    }

    return right(new Gender(gender));
  }
}