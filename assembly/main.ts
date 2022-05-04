import { Subscriber, subscribers } from './model';
import { datetime } from "near-sdk-as";
import { PlainDateTime } from "assemblyscript-temporal";

export function isSubscriber(currentUserID: string): bool {
  const currentSubscriber = subscribers.get(currentUserID);
  if (currentSubscriber) {
    const date: i64 = parseInt(currentSubscriber.expirationDate) as i64;
    const expDate = PlainDateTime.from(new Date(date).toISOString());
    const currentDate = datetime.block_datetime();
    const isExpired = PlainDateTime.compare(currentDate, expDate);
    return isExpired > 0;
  }
  return false;
}

export function addSubscriber(id: string, expirationDate: string): void {
  const newSubscriber = new Subscriber(expirationDate);
  subscribers.set(id, newSubscriber);
}

export function removeSubscriber(id: string): void {
  subscribers.delete(id);
}
