import { createContext, useState } from "react";

const ModalContext = createContext({
  ModalOpen: "",
  updateModalOpen: (identifier) => {},
  checkoutOpen: "",
  updatecheckoutOpen: (i) => {},
  successOpen: "",
  updatesuccessOpen: (s) => {}
});

export function ModalStateContext({ children }) {
  const [ModalOpen, setModalOpen] = useState(false); // for cart
  const [checkoutOpen, setcheckoutOpen] = useState(false); // for opening checkout component in modal from cart using "go to check out" button
  const [successOpen, setsuccessOpen] = useState(false); // for opening success component in modal from checkout using "submit" button
  function updateModalOpen(identifier) {
    setModalOpen(identifier);
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
    <ModalContext.Provider value={{ ModalOpen, updateModalOpen, checkoutOpen, updatecheckoutOpen,successOpen, setsuccessOpen,updatesuccessOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;


{/*wrapping children with {} becasue when we wrap the components with provider function
     whole component with both jsx and js code will be returned. */}