//According to my understanding how custom made modal works is use state we will change values.
// when we want to close model we will set state value to false and it the values is false this component will return null
// means nothing will shown which ultimately means its closed. if the state value is true the modal will be open. means returns the tags instead of null.

import { useRef, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import ModalContext from "../ModalStateContext";
import CartItemsContext from "../cartitemsContext";

function Modal({ open, children, childtype }) {
  const contextObject = useContext(ModalContext);
  const contextObject1 = useContext(CartItemsContext);
  const dialog = useRef();

  function openCheckout() {
    contextObject.updatecheckoutOpen(true);
  }

  function success() {
    contextObject.updatesuccessOpen(false);
    contextObject1.setItems([]);
  }

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  // Portal will help to render the child component in the DOM body element
  return createPortal(
    <div>
      <dialog className="modal" ref={dialog}>
        {children}
        <br />
        <div className="modal-actions">
          {childtype === "cart" && (
            <>
              <button onClick={openCheckout} className="button">
                Go to Checkout
              </button>
              <button
                onClick={() => contextObject.updateModalOpen(false)}
                className="text-button"
              >
                Close
              </button>
            </>
          )}
          {childtype === "checkout" && (
            <>
              <button
                onClick={() => contextObject.updatecheckoutOpen(false)}
                className="text-button"
              >
                Close
              </button>
            </>
          )}
          {childtype === "success" && (
            <>
              <button onClick={success} className="okayButton">
                Okay
              </button>
            </>
          )}
          {childtype === "orders" && (
            <>
              <button
                onClick={() => contextObject.updateordersOpen(false)}
                className="text-button"
              >
                Close
              </button>
            </>
          )}
        </div>
      </dialog>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
