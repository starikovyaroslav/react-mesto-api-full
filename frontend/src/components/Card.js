import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((item) => item._id === currentUser._id)
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? '' : 'element__delete-button_hidden'}`
  );
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
  );


  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleCardClick}/>
      <div className="element__container">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-wrapper">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card
