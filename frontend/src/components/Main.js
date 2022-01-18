import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {


  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img src={currentUser.avatar} name="avatar" alt="Аватар" className="profile__avatar"/>
          <div className="profile__avatar-overlay" onClick={props.onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="gallery">
        <ul className="elements">
          {
            props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          )
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main;
