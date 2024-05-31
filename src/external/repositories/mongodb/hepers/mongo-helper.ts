import { MongoClient, Collection} from "mongodb";

export class MongoHelper {
  
  private client : null | MongoClient = null

  async connect(uri: string){
    this.client = await MongoClient.connect(uri)

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
    if (this.client){
      this.clearCollection(name)
    }
  }
}

