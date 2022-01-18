import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleName(e) {
    setName(e.target.value)
  }

  function handleDescription(e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="profile-name-input"
        className="pop-up__input pop-up__input_place_name form__input"
        placeholder="Имя"
        name="name"
        minLength="2"
        maxLength="40"
        value={name || ''}
        required
        onChange={handleName}
      />
      <span className="form__input-error profile-name-input-error"></span>
      <input
        type="text"
        id="about-input"
        className="pop-up__input pop-up__input_place_about form__input"
        placeholder="О себе"
        name="about"
        minLength="2"
        maxLength="200"
        value={description || ''}
        required
        onChange={handleDescription}
      />
      <span className="form__input-error about-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
