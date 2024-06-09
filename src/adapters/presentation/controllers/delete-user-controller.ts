import { DeleteUserInterface as DeleteUser } from "../../../usecases/delete-user/interface";
import { MissingRequestBodyError } from "./_errors/missing-request-body-error";
import { badRequest, ok, unprocessableEntity, serverError, notFound } from "./_helpers/http-helper";
import { HttpRequest, HttpResponse } from "./_ports/http";
import { MissingParamError } from "./_errors/missing-param-error";
import { DeleteUserResponse } from "../../../usecases/delete-user/response";
import { InvalidEmailError } from "../../../entities/_errors";
import { NoResultError } from "../../../usecases/_errors/no-result";

export class DeleteUserController {
  private readonly deleteUser: DeleteUser

  constructor(deleteUser: DeleteUser){
    this.deleteUser = deleteUser
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse>{

    try {

      const { body } = httpRequest

      if (body){
        const { email} = body;

        if (!email){
          return badRequest(new MissingParamError('email'));
        }

        const response: DeleteUserResponse = await this.deleteUser.delete(email);

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
