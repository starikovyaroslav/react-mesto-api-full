import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/auth';
import success from '../images/success.svg';
import fail from '../images/fail.svg'

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [message, setMessage] = React.useState({ imgPath: '', text: '' })
  const navigate = useNavigate();

/*   React.useEffect(() => {
    api.getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err));
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => setCards(res))
      .catch((err) => console.log(err));
  }, [])
 */
/*   React.useEffect(() => checkToken(), []) */

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
}, [])

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false)
  }

  function onCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleRegistration({ password, email }) {
    auth.register({ password, email })
      .then(() => {
        setMessage({ imgPath: success, text: 'Вы успешно зарегистрировались!' })
      })
      .catch(() => setMessage({ imgPath: fail, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function handleAuthorization({ password, email }) {
    auth.authorize({ password, email })
          .then((res) => {
            localStorage.setItem('token', res.token);
            checkToken();
            setEmail(email);
          })
      .catch((err) => console.log(err))
  }

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      navigate('/');
    }
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  React.useEffect(() => {
    checkToken();
    navigate('/');
    if (loggedIn) {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cardsData]) => {
                setCurrentUser(user);
                setCards(cardsData.reverse());
            })
            .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="App page">

        <Header
          loggedIn={loggedIn}
          email={email}
          onSignOut={onSignOut}
        />

        <Routes>
          <Route
            exact path='/'
            element={
              <ProtectedRoute
                exact path='/'
                loggedIn={loggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={onCardClick}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />

          <Route
            path='/signup'
            element={
              <Register
                onRegister={handleRegistration}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                onLogin={handleAuthorization}
              />
            }
          />

        </Routes>

        <Footer/>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={message.text}
          imgPath={message.imgPath}
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

        <PopupWithForm
          name="del"
          title="Вы уверены?"
          button="Да"
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
