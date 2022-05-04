import { context, PersistentMap } from "near-sdk-as";

@nearBindgen
export class Subscriber {
  accountID: string;
  expirationDate: string;
  constructor(public date: string) {
    this.accountID = context.sender;
    this.expirationDate = date;
  }
}

export const subscribers = new PersistentMap<string, Subscriber>("m");

