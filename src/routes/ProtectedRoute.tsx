import { User } from "firebase/auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  child: JSX.Element;
  user: User | undefined;
};

const ProtectedRoute = ({ child, user }: Props) => {
  useEffect(() => {
    console.log(user);
  }, [user]);

  if (user === undefined) {
    return <Navigate to="/" />;
  }

  return child;
};

export default ProtectedRoute;
