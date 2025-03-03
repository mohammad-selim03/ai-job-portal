"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Login = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <p>Loading...</p>;
  return (
    <div>
      <div className="p-6">
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
            onClick={() => signIn("auth0")}
            className="bg-blue-500 text-white p-2"
          >
            Login with Auth0
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
