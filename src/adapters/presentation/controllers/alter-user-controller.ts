import { AlterUserInterface as AlterUser } from "../../../usecases/alter-user.ts/interface";
import { MissingRequestBodyError } from "./_errors/missing-request-body-error";
import { badRequest, ok, unprocessableEntity, serverRequest } from "./_helpers/http-helper";
import { HttpRequest, HttpResponse } from "./_ports/http";
import { MissingParamError } from "./_errors/missing-param-error";
import { AlterUserResponse } from "../../../usecases/alter-user.ts/response";

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

        const response: AlterUserResponse = await this.alterUser.alter(
          { name, lastName, email, password, userRole }
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
