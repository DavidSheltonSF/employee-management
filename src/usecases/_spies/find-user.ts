import { right } from "../../shared/either";
import { UserRepository } from "../_ports/user-repository";
import { FindUserInterface as FindUser} from "../find-user/interface";
import { FindUserResponse } from "../find-user/response";
import { mock_user } from "./helper/mock_user";


export class FindUserSpy implements FindUser {
  private readonly userRepository: UserRepository
  findByEmailParam: Record<string, string> = {};

  constructor(userRepo: UserRepository){
    this.userRepository = userRepo;
  }

  async all(): Promise<FindUserResponse>{

    const mockedUsers = [];
    for(let i = 0; i < 3; i++){
      mockedUsers.push(mock_user());
    }

    return right(mockedUsers);

  }

  async byEmail(email: string): Promise<FindUserResponse>{

    this.findByEmailParam['email'] = email;

    return right(mock_user());

  }
}