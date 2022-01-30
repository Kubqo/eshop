/* eslint-disable react/jsx-no-undef */
import { Box, Grid, Skeleton, Typography } from "@mui/material";
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

const checkImage = (path: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(path);
    img.onerror = () => reject();

    img.src = path;
  });

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
      let images: string[] = [];
      querySnapshot.forEach((doc) => {
        setProducts((prevProducts) => [...prevProducts, doc.data()]);
        doc.data().images.map((image) => images.push(image));
      });
      Promise.all(images.map(checkImage)).then(
        () => setIsLoading(false),
        () => console.error("could not load images")
      );
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        // height: height - 140,
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
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              {Array.from(Array(20).keys()).map((item) => (
                <Grid
                  sx={{ display: "flex" }}
                  justifyContent="center"
                  key={item}
                  item
                >
                  <Skeleton variant="rectangular" width={200} height={266} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
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
