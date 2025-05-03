'use client';
import React from "react";
import { ReduxProvider } from "./ReduxProvider";
import AuthGuard from "./AuthGuard";
import UiLayoutProvider from "./uiLayoutProvider";


const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <AuthGuard>
        <UiLayoutProvider>{children}</UiLayoutProvider>
      </AuthGuard>
    </ReduxProvider>
  );
};

export default RootProvider;