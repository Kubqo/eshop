import {
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import usePageTitle from "../hooks/usePageTitle";
import { productsCollection, Tree } from "../utils/firebase";
import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

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
      <Typography sx={{ mt: 5 }} variant="h4">
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
                <ImageListItem sx={{ width: 200 }} key={item.name}>
                  <img
                    src={item.images[0]}
                    alt={`${item.name}`}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.name}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${item.name}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
