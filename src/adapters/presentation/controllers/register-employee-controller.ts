import { RegisterEmployeeInterface as RegisterEmployee } from "../../../usecases/register-employee/interface";
import { MissingRequestBodyError } from "./_errors/missing-request-body-error";
import { badRequest, ok, unprocessableEntity, serverRequest } from "./_helpers/http-helper";
import { HttpRequest, HttpResponse } from "./_ports/http";
import { MissingParamError } from "./_errors/missing-param-error";
import { RegisterEmployeeResponse } from "../../../usecases/register-employee/response";

export class RegisterEmployeeController {
  private readonly registerEmployee: RegisterEmployee

  constructor(registerEmployee: RegisterEmployee){
    this.registerEmployee = registerEmployee
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse>{

    try {

      const { body } = httpRequest

      if (body){
        const { name, lastName, email, birthday, gender, role, department } = body;

        if (!name){
          return badRequest(new MissingParamError('name'));
        }

        if(!lastName){
          return badRequest(new MissingParamError('lastName'));
        }

        if (!email){
          return badRequest(new MissingParamError('email'));
        }

        if(!birthday){
          return badRequest(new MissingParamError('birthday'));
        }

        if(!gender){
          return badRequest(new MissingParamError('gender'));
        }

        if(!role){
          return badRequest(new MissingParamError('role'));
        }

        if(!department){
          return badRequest(new MissingParamError('department'));
        }

        const response: RegisterEmployeeResponse = await this.registerEmployee.register(
          { name, lastName, email, birthday, gender, role, department }
        );

        if(response.isLeft()){
          return unprocessableEntity(response.value)
        }

        return ok(response);
      }

    return badRequest(new MissingRequestBodyError())

    }catch(err){
      console.log(err);
      return serverRequest('internal');
    }
  }
}
