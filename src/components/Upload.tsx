import { getDownloadURL, ref } from "@firebase/storage";
import { uploadBytes } from "firebase/storage";
import { FormEvent, useEffect, useState } from "react";
import { productsCollection, storage } from "../utils/firebase";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import useField from "../hooks/useField";
import { addDoc, Timestamp } from "@firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const [upload, setUpload] = useState<boolean>(false);

  const onChange = (e: any) => {
    setFiles((files) => [...files, e.target.files[0]]);
  };

  const onSubmit = async () => {
    files.map((file) => {
      const imageRef = ref(storage, file!.name);

      uploadBytes(imageRef, file!).then((snapshot) => {
        getDownloadURL(imageRef).then((downloadURL) => {
          setImagesUrls((images) => [...images, downloadURL]);
        });
      });
    });
    setUpload(true);
  };

  useEffect(() => {
    if (upload === true && imagesUrls.length === files.length) {
      try {
        addDoc(productsCollection, {
          name: name,
          description: description,
          images: imagesUrls,
          price: price,
          time: Timestamp.now(),
        });
      } catch (err) {
        setSubmitError(
          (err as { message?: string })?.message ?? "Unknown error occurred"
        );
      }
    }
    setUpload(false);
    // eslint-disable-next-line
  }, [files, imagesUrls, upload]);

  const [name, nameProps] = useField("name", true);
  const [description, descriptionProps] = useField("description", false);
  const [price, priceProps] = useField("price", true);
  const [submitError, setSubmitError] = useState<string>();

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
            sx={{ width: 300, mt: 5 }}
            label="Popis"
            {...descriptionProps}
          />
          <TextField sx={{ width: 300, mt: 5 }} label="Cena" {...priceProps} />

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
            // border: "1px dashed black",
            // maxHeight: "90vh",
            // overflow: "auto",
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
