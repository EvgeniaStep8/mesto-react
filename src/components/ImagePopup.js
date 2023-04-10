import React from 'react';

export default function ImagePopup() {
	return (
    <div className='popup popup_overlay_dark' id='popup-open-image'>
      <div className='popup__image-container'>
        <figure className='popup__figure'>
          <img alt='' src='#' className='popup__image'/>
          <figcaption className='popup__caption'></figcaption>
        </figure>
        <button className='popup__close' type='button'></button>
      </div>
    </div>
	)
}