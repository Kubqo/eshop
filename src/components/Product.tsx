import {
  Box,
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { Tree } from "../common/types";
import theme from "../utils/theme";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

type Props = {
  item: Tree;
};

const Product = ({ item }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activePhoto, setActivePhoto] = useState<number>(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const increaseActivePhoto = () => {
    if (activePhoto === item.images.length - 1) {
      setActivePhoto(0);
    } else {
      setActivePhoto(activePhoto + 1);
    }
  };

  const decreaseActivePhoto = () => {
    if (activePhoto === 0) {
      setActivePhoto(item.images.length - 1);
    } else {
      setActivePhoto(activePhoto - 1);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vw",
            height: "70vh",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.palette.primary.main,
              width: "60%",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                opacity: 0.5,
                backgroundColor: "white",
                bottom: "50%",
                left: "2%",
                color: "black",
                "&:hover": {
                  opacity: 0.3,
                  backgroundColor: "white",
                },
              }}
              color="secondary"
              aria-label="upload picture"
              component="span"
              onClick={decreaseActivePhoto}
            >
              <ChevronLeftIcon />
            </IconButton>
            <img
              style={{
                backgroundSize: "cover",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              src={item.images[activePhoto]}
              alt={`${item.name}`}
              loading="lazy"
            />
            <IconButton
              sx={{
                position: "absolute",
                opacity: 0.5,
                backgroundColor: "white",
                bottom: "50%",
                right: "42%",
                color: "black",
                "&:hover": {
                  opacity: 0.3,
                  backgroundColor: "white",
                },
              }}
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={increaseActivePhoto}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              width: "40%",
              textAlign: "center",
              p: 1,
            }}
          >
            <Typography variant="h3">{item.name}</Typography>
            <Typography variant="body1">{item.description}</Typography>
            <Typography variant="body1">Cena: {item.price} €</Typography>
            <Button
              sx={{
                display: "flex",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
              }}
              variant="contained"
              endIcon={<AddShoppingCartIcon />}
            >
              Pridať do košíka
            </Button>
          </Box>
        </Box>
      </Modal>

      <ImageListItem sx={{ width: 200 }} key={item.name}>
        <img
          src={item.images[0]}
          alt={`${item.name}`}
          style={{ cursor: "pointer" }}
          loading="eager"
          onClick={handleOpen}
        />
        <ImageListItemBar
          title={item.name}
          actionIcon={
            <IconButton
              sx={{ color: theme.palette.primary.light }}
              aria-label={`info about ${item.name}`}
              onClick={() => console.log("f")}
            >
              <AddShoppingCartIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    </>
  );
};

export default Product;
