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
            title='New place'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            button='Create'>
            <div className="popup__input-field">
                <input className="popup__input popup__input_content_place" id="place" name="name" type="text" placeholder="Title" value={placeName} onChange={handlePlaceNameChange} required minLength="2" maxLength="30" />
                <span className="popup__input-error" id="error-place">You missed this field</span>
            </div>
            <div className="popup__input-field">
                <input className="popup__input popup__input_content_link" id="link" name="link" type="url" placeholder="Image link" value={placeLink} onChange={handlePlaceLink} required />
                <span className="popup__input-error" id="error-link">Enter website address</span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup