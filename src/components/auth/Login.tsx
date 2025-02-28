"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Login = () => {
    const { data: session } = useSession();
    return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white p-2"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() =>
            signIn("auth0", { callbackUrl: "http://localhost:3000/" })
          } // ✅ Add callbackUrl
          className="bg-blue-500 text-white p-2"
        >
          Login with Auth0
        </button>
      )}
    </div>
  );
};

export default Login;
