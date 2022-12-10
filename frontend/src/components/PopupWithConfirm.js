function PopupWithConfirm () {
    return (
        <div className="popup popup_type_delete">
            <div className="popup__content popup__content_type_delete">
               <form className="popup__form popup__form_type_delete">
                  <button type="button" className="popup__close-button popup__close-button_type_delete" aria-label="close-popup"></button>
                  <h2 className="popup__title popup__title_type_delete">Вы уверены?</h2>
                  <button type="submit" className="popup__submit-button popup__submit-button_active popup__submit-button_type_delete">Да</button>
               </form>
            </div>
         </div>
    )
}

export default PopupWithConfirm