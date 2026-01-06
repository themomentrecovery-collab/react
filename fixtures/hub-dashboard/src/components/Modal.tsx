import { ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'default' | 'large';
}

const Modal = ({ title, onClose, children, footer, size = 'default' }: ModalProps) => {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className={`modal-panel ${size === 'large' ? 'large' : ''}`}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer ? <div className="modal-footer">{footer}</div> : null}
      </div>
    </div>
  );
};

export default Modal;
