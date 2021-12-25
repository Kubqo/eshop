import { Timestamp } from "firebase/firestore";
import { Sizes, Status, Types } from "./enums";

export type Tree = {
  id: string;
  name: string;
  description?: string;
  images: string[];
  price: string;
  time: Timestamp;
  status: State;
  size: Sizes;
  type: Type;
};

export type Size = Sizes.SMALL | Sizes.MEDIUM | Sizes.BIG;
export type Type = Types.TREE | Types.JAWELERY | Types.OTHER;
export type State = Status.AVAILABLE | Status.SOLD;
