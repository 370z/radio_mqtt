import {
    getServerSession,
    type NextAuthOptions,
  } from "next-auth";
  import Credentials from "next-auth/providers/credentials";
  import { userService } from "./services/userService";
  
  export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt", //(1)
    },
    callbacks: {
      async jwt({
          token,
          user,
          account
      }) {
          if (account && user) {
              return {
                  ...token,
                  accessToken: user.token,
              };
          }

          return token;
      },

      async session({
          session,
          token
      }) {
        console.log(token)
          session.user.accessToken = token.accessToken;
          // session.user.accessTokenExpires = token.accessTokenExpires;
          // session.user.avatar = token.avatar;

          return session;
      },
  },
    pages: {
      signIn: '/login', //(4) custom signin page path
    },
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "username" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const { username, password } = credentials as {
           username: string
           password: string
          };
 
         return userService.authenticate(username, password); //(5) 
       }
      })
    ],
  };
  
  export const getServerAuthSession = () => getServerSession(authOptions); //(6) 