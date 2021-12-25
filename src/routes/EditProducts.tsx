/* eslint-disable react/jsx-no-undef */
import { Box, Grid, Typography } from "@mui/material";
import usePageTitle from "../hooks/usePageTitle";
import { productsCollection } from "../utils/firebase";
import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ProductEdit from "../components/ProductEdit";
import { Tree } from "../common/types";
import { Types } from "../common/enums";
import useWindowDimensions from "../hooks/windowDimensions";
import ProductsFilter from "../components/ProductsFilter";

const EditProducts = () => {
  usePageTitle("Ponuka");

  const { height } = useWindowDimensions();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Tree[]>([]);
  const [filterProducts, setFilterProducts] = useState<Types>(Types.TREE);

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

  return (
    <Box
      sx={{
        height: height - 140,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <ProductsFilter
        filterProducts={filterProducts}
        setFilterProducts={setFilterProducts}
      />
      {isLoading ? (
        <Box
          sx={{
            height: height - 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
        </Box>
      ) : (
        <>
          {products.filter((p) => p.type === filterProducts).length === 0 ? (
            <Box
              sx={{
                height: height - 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography>Žiadne vyhovujúce produkty :(</Typography>
            </Box>
          ) : (
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  {products.map(
                    (item) =>
                      item.type === filterProducts && (
                        <Grid
                          sx={{ display: "flex" }}
                          justifyContent="center"
                          key={item.name}
                          item
                        >
                          <ProductEdit
                            item={item}
                            products={products}
                            setProducts={setProducts}
                          />
                        </Grid>
                      )
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default EditProducts;
