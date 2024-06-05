import { AlterEmployeeInterface as AlterEmployee } from "../../../usecases/alter-employee/interface";
import { MissingRequestBodyError } from "./_errors/missing-request-body-error";
import { badRequest, ok, unprocessableEntity, serverError, notFound } from "./_helpers/http-helper";
import { HttpRequest, HttpResponse } from "./_ports/http";
import { MissingParamError } from "./_errors/missing-param-error";
import { AlterEmployeeResponse } from "../../../usecases/alter-employee/response";
import { NoResultError } from "../../../usecases/_errors/no-result";
import { InvalidEmailError } from "../../../entities/errors";

export class AlterEmployeeController {
  private readonly alterEmployee: AlterEmployee

  constructor(alterEmployee: AlterEmployee){
    this.alterEmployee = alterEmployee
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

        const response: AlterEmployeeResponse = await this.alterEmployee.alter(
          { name, lastName, email, birthday, gender, role, department }
        );

        if(response.isLeft()){

          if(response.value instanceof InvalidEmailError){
            return unprocessableEntity(response.value);
          }

          if(response.value instanceof NoResultError){
            return notFound(response.value);
          }
          
        }

        return ok(response);
      }

    return badRequest(new MissingRequestBodyError())

    }catch(err){
      console.log(err);
      return serverError('internal');
    }
  }
}
