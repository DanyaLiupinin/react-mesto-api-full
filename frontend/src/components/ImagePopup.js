function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_photo ${card.link ? 'popup_opened' : {}}`}>
            <div className="popup__content popup__content_type_photo">
                <img className="popup__photo" src={card.link} alt="" />
                <button type="button" className="popup__close-button popup__close-button_type_photo" aria-label="close-popup" onClick={onClose}></button>
                <p className="popup__description">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup