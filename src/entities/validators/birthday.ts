import { Either, left, right } from "../../shared/either";
import { InvalidBirthdayError } from "../errors/invalid-birthday";

export class Birthday{
  private readonly birthday: string;

  private constructor(birthday: string){
    this.birthday = birthday;
    Object.freeze(this);
  }

  get value (): string{
    return this.birthday;
  }

  static validate(birthday: string){

    try {

      if (!birthday){
        return false;
      }

      const birthdayDate = new Date(birthday);

      if (birthdayDate.toDateString().toLowerCase() === 'invalid date'){
        return false;
      }

      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  static create(birthday: string): Either<InvalidBirthdayError, Birthday>{
    if (!Birthday.validate(birthday)){
      return left(new InvalidBirthdayError(birthday));
    }

    return right(new Birthday(birthday));
  }
}