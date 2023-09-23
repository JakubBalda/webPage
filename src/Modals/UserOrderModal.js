import { ModalContent, ModalDialog, ModalTitle, Modal } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default function UserOrderModal({isUserOrderModalOpen, setIsUserOrderModalOpen, userOrderData, setUserOrderData}){
    const turnOffModal = () => {
        setUserOrderData({
            orderId: Number,
            name: '',
            surname: '',
            city: '',
            street: '',
            houseNumber: '',
            flatNumber: '',
            postal: '',
            mail: '',
            phoneNumber: '',
            deliveryOption: '',
            paymentOption: '',
            fullOrderPrice: '',
            cart: [],
            status: '',
            orderDate: ''
        })
        setIsUserOrderModalOpen(false)
    }

    return(
       <Modal isOpen={isUserOrderModalOpen} toggle={()=>{setIsUserOrderModalOpen(!isUserOrderModalOpen)}}>
            <ModalDialog>
                <ModalContent className="w-three-quarter">
                    <ModalTitle>Zamówienie nr: {userOrderData.orderId}</ModalTitle>
                    <button className="btn btn-danger" onClick={() => turnOffModal()}><FontAwesomeIcon icon={faCircleLeft}/>Wróć</button>
                </ModalContent>
            </ModalDialog>
       </Modal>
    )
}