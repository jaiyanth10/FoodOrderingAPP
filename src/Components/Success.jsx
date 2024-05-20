import ModalContext from "../ModalStateContext";
import { useContext } from "react";
import Modal from "./Modal";
export default function success(){
    const contextObject = useContext(ModalContext);
return(
    <Modal open={contextObject.successOpen} childtype={"success"}>
        <div id="success">
            <h3>Order Placed Successfully!</h3>
        </div>
    </Modal>
);
}