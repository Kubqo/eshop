import {
  Box,
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Link,
  Modal,
  TextField,
} from "@mui/material";
import { productsDocument, storage } from "../utils/firebase";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteDoc, setDoc } from "firebase/firestore";
import { State, Tree } from "../common/types";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImageIcon from "@mui/icons-material/Image";
import Product from "./Product";
import { Sizes, Types } from "../common/enums";
import useField from "../hooks/useField";
import SizesSelect from "./SizesSelect";
import TypesSelect from "./TypesSelect";
import StatusSelect from "./StatusSelect";
import theme from "../utils/theme";

type Props = {
  item: Tree;
  products: Tree[];
  setProducts: React.Dispatch<React.SetStateAction<Tree[]>>;
};

const ProductEdit = ({ item, products, setProducts }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [imagesList, setImagesList] = useState<string[]>([]);

  const [name, nameProps] = useField("name", true, item.name);
  const [description, descriptionProps] = useField(
    "description",
    false,
    item.description
  );
  const [price, priceProps] = useField("price", true, item.price);
  const [size, setSize] = useState<Sizes>(item.size);
  const [type, setType] = useState<Types>(item.type);
  const [status, setStatus] = useState<State>(item.status);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  useEffect(() => {
    setImagesList(item.images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      imagesList,
      result.source.index,
      result.destination.index
    );

    setImagesList(items);
  };

  const handleSaveChanges = () => {
    const updateItem = setDoc(productsDocument(item.id), {
      id: item.id,
      name: name,
      description: description,
      images: imagesList,
      price: price,
      time: item.time,
      status: status,
      size: size,
      type: type,
    });

    toast.promise(updateItem, {
      pending: "Upravujem Produkt...",
      success: "Produkt bol upraven?? ????",
      error: "Produkt sa nepodarilo upravi?? ????",
    });

    setOpen(false);
  };

  const handleRemoveProduct = () => {
    setProducts(products.filter((product) => product.id !== item.id));

    for (const image of item.images) {
      const httpsReference = ref(storage, image);
      const deleteStatus = deleteObject(httpsReference);

      toast.promise(deleteStatus, {
        pending: "Vymaz??vam obr??zok...",
        success: "Obr??zok bol vymazan?? ????",
        error: "Obr??zok sa nepodarilo vymaza?? ????",
      });
    }

    const deleteStatus = deleteDoc(productsDocument(item.id));
    toast.promise(deleteStatus, {
      pending: "Vymaz??vam produkt...",
      success: "Produkt bol vymazan?? ????",
      error: "Produkt sa nepodarilo vymaza?? ????",
    });
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
            width: "100vw",
            height: "100vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            maxWidth: "100vw",
            maxHeight: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "#3b474e",
              border: "1px solid red",
            }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      padding: 8,
                      height: "100%",
                      overflowY: "scroll",
                    }}
                  >
                    {imagesList.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                p: 2,
                                m: 2,
                                backgroundColor: snapshot.isDragging
                                  ? "lightgreen"
                                  : theme.palette.secondary.main,
                              }}
                            >
                              {item
                                .replace(/[a-z0-9\-.:/]+\/o\//, "")
                                .replace(/\?(.*)/, "")}
                              <Link sx={{ mx: 1 }} href={item}>
                                <ImageIcon />
                              </Link>
                            </Box>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
              textAlign: "center",
              p: 1,
              border: "1px solid blue",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100%",
                border: "1px solid green",
              }}
            >
              <Product
                item={{
                  id: item.id,
                  name: name,
                  description: description,
                  images: imagesList,
                  price: price,
                  time: item.time,
                  status: status,
                  size: size,
                  type: type,
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                overflowY: "scroll",
                // overflowX: "hidden",
                border: "1px solid green",
              }}
            >
              <TextField
                sx={{ width: 300, mt: 5, mx: 10 }}
                label="N??zov"
                {...nameProps}
              />
              <TextField
                multiline
                sx={{ width: 300, mt: 5, mx: 10 }}
                label="Popis"
                {...descriptionProps}
              />
              <TextField
                sx={{ width: 300, mt: 5, mx: 10 }}
                label="Cena"
                {...priceProps}
              />
              <SizesSelect size={size} setSize={setSize} />
              <TypesSelect type={type} setType={setType} />
              <StatusSelect status={status} setStatus={setStatus} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{ m: 2 }}
                  variant="contained"
                  color="error"
                  onClick={handleClose}
                >
                  Zavrie??
                </Button>
                <Button
                  sx={{ m: 2 }}
                  variant="contained"
                  color="success"
                  onClick={handleSaveChanges}
                >
                  Ulo??i??
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>

      <ImageListItem sx={{ width: 200 }} key={item.name}>
        <img src={item.images[0]} alt={`${item.name}`} loading="lazy" />
        <ImageListItemBar
          title={item.name}
          actionIcon={
            <Box sx={{ display: "flex" }}>
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.name}`}
                onClick={handleOpen}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.name}`}
                onClick={handleRemoveProduct}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        />
      </ImageListItem>
    </>
  );
};

export default ProductEdit;
