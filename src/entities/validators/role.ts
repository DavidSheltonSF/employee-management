import { Either, left, right } from "../../shared/either";
import { InvalidRoleError } from "../errors/invalid-role";

enum RoleEnum{
  // Gerente de loja
  STORE_MANAGER = 'storeManager',
  // Assistente administrativo
  ADMINISTRATIVE_ASSISTANT = 'administrativeAssistant',
  // Fiscal de loja
  LOSS_PREVENTION_OFFICER = 'loss_prevention_officer',
  // Operador de caixa
  CASHIER = 'cashier',
  // Empacotador
  PACKER = 'packer',
  // Açougueiro
  BUTCHER = 'butcher',
  // Padeiro
  BACKER = 'backer',
  // Atendente de frios e laticínios
  DELI_WORKER = 'deliWorker',
  // Repositor de mercadorias
  STOCKER = 'stocker',
  // Promotor
  PROMOTER = 'promoter',
  // Faxineiro
  JANITOR = 'janitor'
}

export class Role{
  private readonly role: string;

  private constructor(role: string){
    this.role = role;
  }

  get value (): string{
    return this.role;
  }

  static validate(role: string): boolean{
    const roleList = Object.values(RoleEnum);

    if (!(role.toLocaleLowerCase() in roleList)){
      return false;
    }

    return true;
  }

  static create(role: string): Either<InvalidRoleError, Role>{

    if (!Role.validate(role)){
      return left(new InvalidRoleError(role));
    }

    return right(new Role(role));
  }

}