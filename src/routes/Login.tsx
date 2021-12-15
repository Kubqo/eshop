import useLoggedInUser from "../hooks/useLoggedInUser";
import Login from "../components/Login";
import Upload from "../components/Upload";

const LoginPage = () => {
  const user = useLoggedInUser();

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <>
          <Upload />
        </>
      )}
    </>
  );
};

export default LoginPage;
