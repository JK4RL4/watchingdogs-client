import functions from './functions'

function Modal(props) {  
    const closeModal = (event) => {
        if (!document.querySelector('.modal-blocked') && event.target === document.querySelector('.modal-background')) {
            props.setModalContent('');
            props.setModalActive(false);
        }
    }

    functions.useEventListener('mousedown', closeModal);

    return (
        <div className='modal-background'>
            <div className={props.modalClasses}>
                {props.modalContent}
            </div>
        </div>
    )

}

export default Modal;