"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/model";
import { useStoreModal } from "@/hooks/useStoreModal";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const { onOpen, isOpen } = useStoreModal((state) => state);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div className="p-4">
      <h1>Hello World</h1>

      <SignedIn>
        {/* Mount the UserButton component */}

        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}
