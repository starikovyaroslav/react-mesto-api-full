import React from "react";

function InfoTooltip({ isOpen, onClose, title, imgPath }) {
  return (
    <div className={`pop-up ${isOpen ? 'pop-up_opened' : ''}`}>
      <div className="pop-up__container">

        <div className='pop-up__wrapper'>
          <img src={imgPath} alt={imgPath} className='pop-up__tooltip' />

          <h2 className="pop-up__title pop-up__title_tooltip">{title}</h2>
        </div>

        <button
          type="button"
          className="pop-up__close-button"
          onClick={onClose}
        >
        </button>
      </div>
    </div>
  )
}

export default InfoTooltip
