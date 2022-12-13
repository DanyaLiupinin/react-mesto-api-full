import React from "react"

import { CurrentUserContext } from "../context/CurrentUserContext"

function Card({ cardItem, onCardClick, onCardLike, onCardDelete }) {    

    
    // подписка на котекст
    const currentUser = React.useContext(CurrentUserContext)

    // проверяем, наша ли карточка
    const isOwn = cardItem.owner === currentUser._id

    // проверяем, лайкнул ли пользователь карточку
    let isLiked = false;

    if (cardItem.likes.length > 0) {
        isLiked = cardItem.likes.some(like => like === currentUser._id)
    }

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

    const cardLikeButtonClassName = (
        `element__like-button  ${isLiked ? 'element__like-button_active' : ' '}`
      );

    return (
        <article className="element">
            { isOwn ? <button onClick={handleCardDelete} type="button" className="element__delete" aria-label="delete-photo" /> : ''}
            <img className="element__photo" src={cardItem.link} alt={cardItem.name} onClick={handleClick} />
            <div className="element__info">
                <h2 className="element__title">{cardItem.name}</h2>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonClassName} aria-label="like-photo" onClick={handleLikeClick}></button>
                    <div className="element__like-amount">{cardItem.likes.length}</div>
                </div>
            </div>
        </article>
    )

}

export default Card 