import { FindEmployeeInterface as FindEmployee } from "../../../usecases/find-employee/interface";
import { badRequest, ok, unprocessableEntity, serverError, notFound } from "./_helpers/http-helper";
import { HttpRequest, HttpResponse } from "./_ports/http";
import { MissingParamError } from "./_errors/missing-param-error";
import { FindEmployeeResponse } from "../../../usecases/find-employee/response";
import { InvalidEmailError } from "../../../entities/_errors";
import { NoResultError } from "../../../usecases/_errors/no-result";

export class FindEmployeeController {
  private readonly findEmployee: FindEmployee

  constructor(findEmployee: FindEmployee){
    this.findEmployee = findEmployee
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse>{

    try {

      const { viewArgs } = httpRequest

      if (viewArgs){
        const { email } = viewArgs;

        if (!email){
          return badRequest(new MissingParamError('email'));
        }

        const response: FindEmployeeResponse = await this.findEmployee.byEmail(email);

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

      const response: FindEmployeeResponse = await this.findEmployee.all();
      return ok(response);

    }catch(err){
      console.log(err);
      return serverError('internal');
    }
  }
}
