import { connectDB } from "@/app/lib/mongodb";
import Users from "@/models/Users";
import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0"; 

export const authOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB();
      const existingUser = await Users.findOne({ email: user.email });

      if (!existingUser) {
        await Users.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "jobseeker", // Default role
        });
      }
      return true;
    },
    async session({ session }) {
      await connectDB();
      const dbUser = await Users.findOne({ email: session.user?.email });

      if (dbUser) {
        session.user.role = dbUser.role;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
