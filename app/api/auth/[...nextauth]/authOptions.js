import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";
import { connectMongoDB } from "@/app/util/dbConnect";
import User from "@/app/models/User";
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        phoneNumber: { label: "Phone Number", type: "number" },
      },
      async authorize(credentials, req) {
        await connectMongoDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCor = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCor) return user;
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        };
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user) session.user.role = token.role;
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          fullName: token.fullName,
          phoneNumber: token.phoneNumber,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
  },
  database: process.env.MONGODB_URI,
  secret: process.env.NEXTAUTH_SECRET,
};
