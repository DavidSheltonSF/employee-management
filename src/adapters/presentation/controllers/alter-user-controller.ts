import { AlterUserInterface as AlterUser } from "../../../usecases/alter-user/interface";
import { MissingRequestBodyError } from "./_errors/missing-request-body-error";
import { badRequest, ok, unprocessableEntity, serverError, notFound } from "./_helpers/http-helper";
import { HttpRequest, HttpResponse } from "./_ports/http";
import { MissingParamError } from "./_errors/missing-param-error";
import { AlterUserResponse } from "../../../usecases/alter-user/response";
import { NoResultError } from "../../../usecases/_errors/no-result";
import { InvalidEmailError } from "../../../entities/_errors";

export class AlterUserController {
  private readonly alterUser: AlterUser

  constructor(alterUser: AlterUser){
    this.alterUser = alterUser
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse>{

    try {

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

        const response: AlterUserResponse = await this.alterUser.alter(email,
          { name, lastName, email, password, userRole }
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
