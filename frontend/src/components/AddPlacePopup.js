import React from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {

    const [placeName, setPlaceName] = React.useState('')
    const [placeLink, setPlaceLink] = React.useState('')

    function handlePlaceNameChange(e) {
        setPlaceName(e.target.value)
    }

    function handlePlaceLink(e) {
        setPlaceLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        props.onAddPlace({
            name: placeName,
            link: placeLink
        })

        props.onClose()
    }

    React.useEffect(() => {
        setPlaceName('')
        setPlaceLink('')
    }, [props.isOpen])

    return (

        <PopupWithForm
            name='add'
            title='Новое место'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            button='Создать'>
            <div className="popup__input-field">
                <input className="popup__input popup__input_content_place" id="place" name="name" type="text" placeholder="Название" value={placeName} onChange={handlePlaceNameChange} required minLength="2" maxLength="30" />
                <span className="popup__input-error" id="error-place">Вы пропустили это поле</span>
            </div>
            <div className="popup__input-field">
                <input className="popup__input popup__input_content_link" id="link" name="link" type="url" placeholder="Ссылка на картинку" value={placeLink} onChange={handlePlaceLink} required />
                <span className="popup__input-error" id="error-link">Введите адрес сайта</span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup