import { createContext, FC, useContext, useMemo, useState } from "react";
import { Tree } from "../common/types";

export interface CartCtxType {
  cart: Tree[];
  setCart: React.Dispatch<React.SetStateAction<Tree[]>>;
}

export const CartContext = createContext<CartCtxType>(undefined as never);

export function useCartCtx() {
  // Rating and currentSample order
  const [cart, setCart] = useState<Tree[]>([]);

  const ctx = useMemo(
    () => ({
      cart,
      setCart,
    }),
    [cart, setCart]
  );
  return ctx;
}

// Wrapped context provider
export const CartProvider: FC = ({ children }) => {
  // We can improve this by saving and loading the initial state from local storage
  const ctx = useCartCtx();
  return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>;
};

// Only used by language switch
export const useCart = () => useContext(CartContext);
