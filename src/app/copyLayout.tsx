"use client"
import AuthProvider from "@/components/SessionProviders/SessionProviders";
import React from "react";

const CopyLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default CopyLayout;
