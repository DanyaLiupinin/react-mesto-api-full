import React from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props) {

    const avatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateAvatar({ avatar: avatarRef.current.value })
        props.onClose()
    }

    React.useEffect(() => {
        avatarRef.current.value = ''
    }, [props.isOpen])

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар?'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            button='Сохранить'>
            <div>
                <input className="popup__input popup__input_content_avatar" id="avatar" name="avatar" type="url" placeholder="Ссылка на аватар" required ref={avatarRef} />
                <span className="popup__input-error" id="error-avatar">Введите адрес картинки</span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup