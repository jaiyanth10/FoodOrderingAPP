import { createContext, useState } from "react";

const ModalContext = createContext({
  ModalOpen: false,
  updateModalOpen: (identifier) => {},
  checkoutOpen: false,
  updatecheckoutOpen: (i) => {},
  successOpen: false,
  updatesuccessOpen: (s) => {},
  updateordersOpen: (x) => {},
});

export function ModalStateContext({ children }) {
  const [ModalOpen, setModalOpen] = useState(false);
  const [checkoutOpen, setcheckoutOpen] = useState(false);
  const [successOpen, setsuccessOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  function updateModalOpen(identifier) {
    setModalOpen(identifier);
  }

  function updateordersOpen(x) {
    console.log("inside");
    setOrdersOpen(x);
  }

  function updatecheckoutOpen(i) {
    setModalOpen(false);
    setcheckoutOpen(i);
  }

  function updatesuccessOpen(s) {
    setcheckoutOpen(false);
    setsuccessOpen(s);
  }

  return (
    <ModalContext.Provider
      value={{
        ModalOpen,
        updateModalOpen,
        checkoutOpen,
        updatecheckoutOpen,
        successOpen,
        updatesuccessOpen,
        updateordersOpen,
        ordersOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
