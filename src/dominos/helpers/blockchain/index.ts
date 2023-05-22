import * as utils from '@dcl/ecs-scene-utils'
import * as dclTx from "decentraland-transactions";
import * as eth from "eth-connect";
import { getProvider, Provider } from "@decentraland/web3-provider";
import { getUserAccount } from "@decentraland/EthereumController";
import { createMANAComponent } from "./mana";

export async function createContract(contractAddress:string, abi:any){
  try {
    // Setup steps explained in the section above
    const provider = await getProvider()
    const requestManager = new eth.RequestManager(provider)
    const factory = new eth.ContractFactory(requestManager, abi)
    const contract = (await factory.at(contractAddress)) as any
    return contract
  } catch (error:any) {
    log(error.toString())
  }
}

export async function createComponents() {
  const provider = await getProvider();
  const requestManager: any = new eth.RequestManager(provider);
  const metaProvider: any = new eth.WebSocketProvider("wss://rpc-mainnet.matic.quiknode.pro");
  const fromAddress = await getUserAccount();
  const metaRequestManager: any = new eth.RequestManager(metaProvider);
  const providers = {
    provider,
    requestManager,
    metaProvider,
    metaRequestManager,
    fromAddress,
  };

  const mana = await createMANAComponent(providers);
  return { mana };
}

export type Providers = {
  provider: Provider;
  requestManager: eth.RequestManager;
  metaProvider: Provider;
  metaRequestManager: eth.RequestManager;
  fromAddress: string;
};

export function delay(ms: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const ent = new Entity();
    engine.addEntity(ent);
    ent.addComponent(
      new utils.Delay(ms, () => {
        resolve();
        if (ent.isAddedToEngine()) engine.removeEntity(ent);
      })
    );
  });
}
