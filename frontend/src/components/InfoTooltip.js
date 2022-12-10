import success from "../images/success-registration.svg";
import failed from "../images/failed-registration.svg";

function InfoTooltip({ isSuccess, isOpen, onClose, successTitle, failedTitle }) {
    return (
        <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__content popup__content_type_tooltip`}>
                <button type="button" className="popup__close-button popup__close-button_type_tooltip" onClick={onClose} aria-label="close-popup" ></button>
                <img className="popup__info-image" src={isSuccess ? success : failed} alt={isSuccess ? "галочка" : "крестик"} />
                <h2 className="popup__title popup__title_type_tooltip">{isSuccess ? successTitle : failedTitle}</h2>
            </div>
        </div>

    )
}

export default InfoTooltip