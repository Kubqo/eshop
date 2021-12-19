import { getDownloadURL, ref } from "@firebase/storage";
import { uploadBytes } from "firebase/storage";
import { FormEvent, useEffect, useState } from "react";
import { generateId, productsDocument, storage } from "../utils/firebase";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import useField from "../hooks/useField";
import { setDoc, Timestamp } from "@firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Sizes } from "../common/enums";
import SizesSelect from "../components/SizesSelect";

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);

  //form
  const [name, setName, nameProps] = useField("name", true);
  const [description, setDescription, descriptionProps] = useField(
    "description",
    false
  );
  const [price, setPrice, priceProps] = useField("price", true);
  const [submitError, setSubmitError] = useState<string>();
  const [size, setSize] = useState<Sizes>(Sizes.SMALL);

  const onChange = (e: any) => {
    setFiles((files) => [...files, e.target.files[0]]);
  };

  const onSubmit = async () => {
    files.map((file) => {
      const imageRef = ref(storage, file!.name);
      console.log(imageRef);

      const uploadImageToast = uploadBytes(imageRef, file!).then((snapshot) => {
        getDownloadURL(imageRef).then((downloadURL) => {
          setImagesUrls((images) => [...images, downloadURL]);
        });
      });

      toast.promise(uploadImageToast, {
        pending: `Nahrávam fotku ${file!.name}`,
        success: "Fotka nahraná 👌",
        error: `Fotku ${file!.name} sa nepodarilo nahrať 🤯`,
      });
    });
  };

  useEffect(() => {
    if (files.length > 0 && imagesUrls.length === files.length) {
      try {
        const newId = generateId();
        const addProduct = setDoc(productsDocument(newId), {
          id: newId,
          name: name,
          description: description,
          images: imagesUrls,
          price: price,
          time: Timestamp.now(),
          status: "available",
          size: size,
        });

        toast.promise(addProduct, {
          pending: "Nahrávam produkt",
          success: "Produkt nahraný 👌",
          error: "Produkt sa nepodarilo nahrať 🤯",
        });
      } catch (err) {
        setSubmitError(
          (err as { message?: string })?.message ?? "Unknown error occurred"
        );
      }
      setFiles([]);
      setImagesUrls([]);
      setName("");
      setDescription("");
      setPrice("");
    }
    // eslint-disable-next-line
  }, [files, imagesUrls]);

  return (
    <>
      <Grid
        component="form"
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          try {
            await onSubmit();
          } catch (err) {
            setSubmitError(
              (err as { message?: string })?.message ?? "Unknown error occurred"
            );
          }
        }}
        container
        spacing={2}
      >
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          item
          xs={6}
        >
          <TextField sx={{ width: 300, mt: 5 }} label="Názov" {...nameProps} />
          <TextField
            multiline
            sx={{ width: 300, mt: 5 }}
            label="Popis"
            {...descriptionProps}
          />
          <TextField sx={{ width: 300, mt: 5 }} label="Cena" {...priceProps} />
          <SizesSelect size={size} setSize={setSize} />

          <Button
            sx={{ mt: 5 }}
            type="submit"
            color="success"
            variant="contained"
          >
            Nahrať
          </Button>
          {submitError}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          item
          xs={6}
        >
          {Array.from(Array(files.length + 1).keys()).map((num) =>
            num < files.length ? (
              <>
                <img
                  key={num}
                  style={{ width: 250 }}
                  src={URL.createObjectURL(files[num])}
                  alt={files[num].name}
                />
                <IconButton
                  onClick={() =>
                    setFiles(
                      files.filter((file) => file.name !== files[num].name)
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <TextField
                key={num}
                style={{ marginTop: 10 }}
                type="file"
                onChange={onChange}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Upload;
