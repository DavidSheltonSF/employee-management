import { FindUserInterface as FindUser } from "../../../usecases/find-user/interface";
import { badRequest, ok, unprocessableEntity, serverError, notFound } from "./_helpers/http-helper";
import { HttpRequest, HttpResponse } from "./_ports/http";
import { MissingParamError } from "./_errors/missing-param-error";
import { FindUserResponse } from "../../../usecases/find-user/response";
import { InvalidEmailError } from "../../../entities/_errors";
import { NoResultError } from "../../../usecases/_errors/no-result";

export class FindUserController {
  private readonly findUser: FindUser

  constructor(findUser: FindUser){
    this.findUser = findUser
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse>{

    try {

      const { viewArgs } = httpRequest

      if (viewArgs){
        const { email } = viewArgs;

        if (!email){
          return badRequest(new MissingParamError('email'));
        }

        const response: FindUserResponse = await this.findUser.byEmail(email);

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

      const response: FindUserResponse = await this.findUser.all();
      return ok(response);

    }catch(err){
      console.log(err);
      return serverError('internal');
    }
  }
}
