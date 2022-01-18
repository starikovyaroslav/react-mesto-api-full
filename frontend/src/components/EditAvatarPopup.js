import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar-input"
        className="pop-up__input pop-up__input_place_avatar form__input"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
