import { MongoClient, Collection, ServerApiVersion } from "mongodb";


export class MongoHelper {
  
  private client : null | MongoClient = null

  getClient(){
    return this.client
  }

  async connect(uri: string){
    this.client = new MongoClient(uri);
    await this.client.connect()
  }

  async disconnect(): Promise<void>{

    if (this.client){
      this.client.close()
    }
  }

  getCollection(name: string): Collection | null {
    if (this.client){
      return this.client.db().collection(name);
    }
    
    return null;
  }

  clearCollection(name: string): void{
    this.client?.db().collection(name).deleteMany({})
  }
}

export const mongoHelper = new MongoHelper()

