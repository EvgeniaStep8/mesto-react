import React from 'react';
import Input from './Input.js'

export default function PopupWithForm(props) {
	return (
		<div className={props.isOpen ? 'popup popup_opened' : 'popup'} id={`popup-${props.name}`}>
      <div className='popup__container'>
        <h2 className='popup__title'>{props.title}</h2>
        <form className='popup__form' name={`form${props.name}`}>
          {props.inputs && (
						props.inputs.map(input => {
							return (
								<Input
								  name={input.name}
									type={input.type}
									placeholder={input.placeholder}
									key={input.name}
								/>
							)
						})
					)}
          <button className='popup__save-button' type='submit'>{props.buttonText}</button>
        </form>
        <button
				  className='popup__close'
					type='button'
					onClick={props.onClose}
					></button>
      </div>
    </div>
	)
}