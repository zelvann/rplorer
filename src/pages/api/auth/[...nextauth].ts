import db from "@/config/init";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if(!credentials?.username || !credentials?.password) {
          return null;
        }

        const data = await fetch(`http://localhost:3000/api/signIn`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          })
        })

        const result = await data.json();
        if(result.status !==  202) {
          console.log(result.message);
          return null;
        } 
        console.log(result);
        return {
          id: credentials?.username
        }
      }
    })
  ]
}

export default NextAuth(authOptions);