"use client";
import React from "react";
import { Modal } from "@/components/ui/model";
import { useStoreModal } from "@/hooks/useStoreModal";

const StoreModal = () => {
  const storeModal = useStoreModal();
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create form
    </Modal>
  );
};

export default StoreModal;
