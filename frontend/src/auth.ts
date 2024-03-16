import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
const request = new Request("http://localhost:3001/api/auth/login")
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        // Add logic here to look up the user from the credentials supplied
        const response = await fetch("http://localhost:3001/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const user = await response.json();
        console.log(user);

        if (user) {
          // Authentication successful
          return Promise.resolve(user);
        } else {
          // Authentication failed
          return Promise.resolve(null); 
        }
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      // Store additional data in the session if needed
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
});
