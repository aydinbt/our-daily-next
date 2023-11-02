import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import RegisterForm from "../../components/AuthForm/RegisterForm";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";

const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/auth/profile");
  return <RegisterForm />;
};

export default Register;