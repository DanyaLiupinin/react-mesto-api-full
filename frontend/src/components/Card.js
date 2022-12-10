import React from "react"

import { CurrentUserContext } from "../context/CurrentUserContext"

function Card({ cardItem, onCardClick, onCardLike, onCardDelete }) {

    // подписка на котекст
    const currentUser = React.useContext(CurrentUserContext)

    // проверяем, наша ли карточка
    const isOwn = cardItem.owner._id === currentUser._id

    // проверяем, лайкнул ли пользователь карточку
    const isLiked = cardItem.likes.some(like => like._id === currentUser._id)

    // обработчик клика на карточку 

    function handleClick() {
        onCardClick(cardItem)
    }

    // обработчик лайка

    function handleLikeClick() {
        onCardLike(cardItem)
    }

    // удаление карточки

    function handleCardDelete() {
        onCardDelete(cardItem)
    }

    return (
        <article className="element">
            { isOwn ? <button onClick={handleCardDelete} type="button" className="element__delete" aria-label="delete-photo" /> : ''}
            <img className="element__photo" src={cardItem.link} alt={cardItem.name} onClick={handleClick} />
            <div className="element__info">
                <h2 className="element__title">{cardItem.name}</h2>
                <div className="element__like-container">
                    <button type="button" className={`element__like-button ${isLiked ? 'element__like-button_active' : ''} `} aria-label="like-photo" onClick={handleLikeClick}></button>
                    <div className="element__like-amount">{cardItem.likes.length}</div>
                </div>
            </div>
        </article>
    )

}

export default Card 