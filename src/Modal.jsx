import './Modal.css';

const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={()=>setIsOpen(!isOpen)}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
