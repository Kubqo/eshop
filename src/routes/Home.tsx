import { Container, Typography } from "@mui/material";

import usePageTitle from "../hooks/usePageTitle";

const HomePage = () => {
  usePageTitle("Domov");

  return (
    <Container sx={{ mt: 10, textAlign: "center" }} maxWidth="lg">
      <Typography sx={{ mt: 5 }} variant="h1">
        Vitajte na stránke
      </Typography>
      <Typography sx={{ mt: 5 }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>
      <Typography sx={{ mt: 5 }} variant="h3">
        Gameplay
      </Typography>
      <Typography sx={{ mt: 5 }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>
    </Container>
  );
};

export default HomePage;
