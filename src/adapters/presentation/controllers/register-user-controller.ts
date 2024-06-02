import { RegisterUserInterface as RegisterUser } from "../../../usecases/register-user/interface";
import { MissingRequestBodyError } from "./_errors/missing-request-body-error";
import { badRequest, unprocessableEntity } from "./_helpers/http-helper";
import { HttpRequest, HttpResponse } from "./_ports/http";
import { MissingParamError } from "./_errors/missing-param-error";

export class RegisterUserController {
  private readonly registerUser: RegisterUser

  constructor(registerUser: RegisterUser){
    this.registerUser = registerUser
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse>{

    const { body } = httpRequest

    if (body){
      const { name, lastName, email, password, userRole } = body;

      if (!name){
        return badRequest(new MissingParamError('name'));
      }

      if(!lastName){
        return badRequest(new MissingParamError('lastName'));
      }

      if (!email){
        return badRequest(new MissingParamError('email'));
      }

      if(!password){
        return badRequest(new MissingParamError('password'));
      }

      if(!userRole){
        return badRequest(new MissingParamError('userRole'));
      }

      const response = await this.registerUser.register(
        { name, lastName, email, password, userRole }
      );

      if(response.isLeft()){
        return unprocessableEntity(response.value)
      }
    }

    return badRequest(new MissingRequestBodyError())
  }
}