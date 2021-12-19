import { Grid, Typography } from "@mui/material";
import usePageTitle from "../hooks/usePageTitle";
import { productsCollection } from "../utils/firebase";
import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Product from "../components/Product";
import { Tree } from "../common/types";

const Products = () => {
  usePageTitle("Ponuka");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Tree[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(productsCollection);
      querySnapshot.forEach((doc) => {
        setProducts((prevProducts) => [...prevProducts, doc.data()]);
      });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Typography sx={{ mt: 12, mb: 4 }} variant="h4">
        Aktuálna ponuka:
      </Typography>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {products.map((item) => (
              <Grid
                sx={{ display: "flex" }}
                justifyContent="center"
                key={item.name}
                item
              >
                <Product item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
