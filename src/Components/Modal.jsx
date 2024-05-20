//According to my understanding how custom made modal works is use state we will change values.
// when we want to close model we will set state value to false and it the values is false this component will return null
// means nothing will shown which ultimately means its closed. if the state value is true the modal will be open. means returns the tags instead of null.

import { useRef, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import ModalContext from "../ModalStateContext";

function Modal({ open, children, childtype }) {
  const contextObject = useContext(ModalContext);
  const dialog = useRef();
  function oprnCheckout(){
    contextObject.updatecheckoutOpen(true);
  }
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
// portal will help u to render child component in the DOM body element which is out of the childs parent hirerchy
  return createPortal(
    <div>
      <dialog className="modal" ref={dialog}>
        {children}
        <br/>
        <div className='modal-actions'>
          {childtype === "cart" && (
            <>
           
              <button onClick={() =>  oprnCheckout()} className='button'>Go to Checkout</button>
              <button onClick={() => contextObject.updateModalOpen(false)} className='text-button'>Close</button>
            </>
          )}

          {childtype === "checkout" && (
            <>
              <button onClick={() => contextObject.updatecheckoutOpen(false)} className='text-button'>Close</button>
            </>
          )}
          {childtype === "success" && (
            <>
              <button onClick={() => contextObject.updatesuccessOpen(false)} className='okayButton'>Okay</button>
            </>
          )}
        </div>
      </dialog>
    </div>,
    document.getElementById('modal')
  );
}

export default Modal;
