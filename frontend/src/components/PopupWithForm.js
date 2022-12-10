
function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__content popup__content_type_${props.name}`}>
                <button type="button" className={`popup__close-button popup__close-button_type_${props.name}`} aria-label="close-popup" onClick={props.onClose}></button>
                <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
                <form className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit} name="edit-profile" action="#" method="post" /* noValidate*/ >
                    {props.children}
                    <button type="submit" className="popup__submit-button popup__submit-button_active">{props.button}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm

// <button type="submit" className="popup__submit-button popup__submit-button_active" disabled>{props.button}</button>