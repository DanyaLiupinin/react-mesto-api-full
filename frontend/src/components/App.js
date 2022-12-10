import '../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer';
import React, { useEffect, useState } from 'react';
import ImagePopup from './ImagePopup'
import api from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register'
import ProtectedRoute from './ProtectedRoute';
import * as mestoAuth from '../utils/mestoAuth';
import { useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip'

function App() {

   // попапы

   const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
   const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
   const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
   const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false)
   const [selectedCard, setSelectedCard] = useState({})
   const [currentUser, setCurrentUser] = useState({})
   const [loggedIn, setLoggedIn] = useState(false)
   const [userEmail, setUserEmail] = useState('')
   const [isSuccess, setIsSuccess] = useState(false)
   const history = useHistory()

   // проверяет jwt пользователя при возвращении на сайт 

   useEffect(() => {
      const token = localStorage.getItem('jwt')
      if (token) {
         mestoAuth.checkToken(token)
            .then((userData) => {
               if (userData) {
                  setLoggedIn(true)
                  setIsSuccess(true)
                  setUserEmail(userData.data.email)
                  history.push('/')
               }
            })
            .catch((err) => {
               setLoggedIn(false)
               apiError(err)
            })
      }
   }, [loggedIn])

   useEffect(() => {
      if (!loggedIn) {
         return
      } else {
         api.getUserInfo()
            .then((data) => {
               setCurrentUser(data)
            })
            .catch((err) => {
               apiError(err)
            })
      }
   }, [loggedIn])

   // стейт карточек и обращение к api за начальным массивом 

   const [cards, setCards] = useState([])

   useEffect(() => {
      if (!loggedIn) {
         return
      } else {
         api.getInitialCards()
            .then(cards => {
               setCards(cards)
            })
            .catch((err) => {
               apiError(err)
            })
      }
   }, [currentUser, loggedIn])

   function handleCardLike(card) {

      const isLiked = card.likes.some(like => like._id === currentUser._id)

      if (!isLiked) {

         // отправляем запрос на постановку лайка
         // далее в стэйт отправляем функцию колбэк
         // функция колбэк принимает старое значение (массив карточек) как параметр
         // пробегаем по старому массива и сравнвиаем id всех карточек с id карточки из запроса на лайк
         // если карточка не та, возвращаем её
         // если карточка та, создаём новую, уже с лайком

         api.putLike(card._id)
            .then((newCard) => {
               setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
               apiError(err)
            })

      } else {
         api.deleteLike(card._id)
            .then((newCard) => {
               setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch((err) => {
               apiError(err)
            })
      }
   }

   function handleCardDelete(card) {

      api.deleteCard(card._id)
         .then(() => {
            setCards((state) => state.filter((element) => element._id !== card._id))
         })
         .catch((err) => {
            apiError(err)
         })
   }

   function handleEditAvatarClick() {
      setEditAvatarPopupOpen(true)
   }

   function handleEditProfileClick() {
      setEditProfilePopupOpen(true)
   }

   function handleAddPlaceClick() {
      setAddPlacePopupOpen(true)
   }

   function handleInfoTooltip() {
      setInfoTooltipOpen(true)
   }

   function closeAllPopups() {
      setEditAvatarPopupOpen(false)
      setEditProfilePopupOpen(false)
      setAddPlacePopupOpen(false)
      setSelectedCard({})
      setInfoTooltipOpen(false)
   }

   function handleCardClick(card) {
      setSelectedCard(card)
   }

   function handleUpdateUser(data) {
      api.editUserInfo(data)
         .then((data) => {
            setCurrentUser(data)
         })
         .catch((err) => {
            apiError(err)
         })
   }

   function handleUpdateAvatar({ avatar }) {
      api.updateAvatar({ avatar })
         .then((data) => {
            setCurrentUser(data)
         })
         .catch((err) => {
            apiError(err)
         })
   }

   function handleAddPlaceSubmit(data) {
      api.addCard(data)
         .then((newCard) => {
            setCards([newCard, ...cards])
         })
         .catch((err) => {
            apiError(err)
         })
   }

   function apiError(err) {
      alert(`Ошибка. ${err}`)
   }

   function handleRegister(password, email) {
      mestoAuth.register(password, email)
         .then((data) => {
            setIsSuccess(true)
            history.push('/signin')
         })
         .catch((err) => {
            setIsSuccess(false)
            console.log(err)
         })
         .finally(() => {
            handleInfoTooltip()
         })
   }

   function handleLogin(password, email) {
      mestoAuth.authorize(password, email)
         .then((data) => {
            if (data.token) {
               localStorage.setItem('jwt', data.token);
               setLoggedIn(true)
               setIsSuccess(true)
               history.push('/')
            }
         })
         .catch((err) => {
            setIsSuccess(false)
            handleInfoTooltip()
            console.log(err)
         })
   }

   function handleSignOut() {
      localStorage.removeItem("jwt");
      history.push("/signin");
      setLoggedIn(false);
   }

   return (
      <div className="page__container">
         <CurrentUserContext.Provider value={currentUser}>
            <Header
               email={userEmail}
               onClick={handleSignOut}
            />
            <Switch>
               <ProtectedRoute
                  exact path="/"
                  loggedIn={loggedIn}
                  component={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
               />


               <Route path='/signup'>
                  <Register
                     onSubmit={handleRegister}
                  />
               </Route>
               <Route path='/signin'>
                  <Login
                     onSubmit={handleLogin}
                  />
               </Route>
            </Switch>

            {loggedIn ? <Footer /> : ''}

            <EditAvatarPopup
               isOpen={isEditAvatarPopupOpen}
               onClose={closeAllPopups}
               onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup
               isOpen={isEditProfilePopupOpen}
               onClose={closeAllPopups}
               onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
               isOpen={isAddPlacePopupOpen}
               onClose={closeAllPopups}
               onAddPlace={handleAddPlaceSubmit}
            />

            <ImagePopup
               card={selectedCard}
               onClose={closeAllPopups}
            />

            <InfoTooltip
               isSuccess={isSuccess}
               isOpen={isInfoTooltipOpen}
               onClose={closeAllPopups}
               successTitle='Вы успешно зарегистрировались!'
               failedTitle='Что-то пошло не так! Попробуйте ещё раз.'
            />
         </CurrentUserContext.Provider>
      </div>


   );
}

export default App;

// можно улучшить

// добавить isLoadin и состояния кнопок во время загрузки

// подключить валидацию

