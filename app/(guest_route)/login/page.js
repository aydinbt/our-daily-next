import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "../../components/AuthForm/LoginForm";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/auth/profile");
  return <LoginForm />;
};

export default Login;
