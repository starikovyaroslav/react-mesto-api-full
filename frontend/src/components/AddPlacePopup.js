import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [url, setUrl] = React.useState('')

  function handleName(e) {
    setName(e.target.value)
  }

  function handleUrl(e) {
    setUrl(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name: name,
      link: url,
    })
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="place-name-input"
        className="pop-up__input pop-up__input_place_name form__input"
        placeholder="Название"
        name="placeName"
        minLength="2"
        maxLength="30"
        required
        onChange={handleName}
        value={name}
      />
      <span className="form__input-error place-name-input-error"></span>
      <input
        type="url"
        id="link-input"
        className="pop-up__input pop-up__input_place_link form__input"
        placeholder="Ссылка на картинку"
        name="link"
        required
        onChange={handleUrl}
        value={url}
      />
      <span className="form__input-error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
