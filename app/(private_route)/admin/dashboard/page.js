import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import HomeDash from "@/app/components/Dashboard/HomeDash";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  // if (session?.user && session?.user?.role !== "admin") redirect("/");
  return <HomeDash />;
};

export default Dashboard;
