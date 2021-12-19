import { Timestamp } from "firebase/firestore";
import { Sizes } from "./enums";

export type Tree = {
  id: string;
  name: string;
  description?: string;
  images: string[];
  price: string;
  time: Timestamp;
  status: "sold" | "available";
  size: Sizes;
};

export type Size = Sizes.SMALL | Sizes.MEDIUM | Sizes.BIG;
