export default function PopupWithForm(props) {
	return (
		<div className={props.isOpen ? 'popup popup_opened' : 'popup'} id={`popup-${props.name}`}>
      <div className='popup__container'>
        <h2 className='popup__title'>{props.title}</h2>
        <form className='popup__form' name={`form${props.name}`}>
          {props.inputs && (
						props.inputs.map(input => {
							return (
								<> 
							    <input
                    id ={`${input.name}-input`}
                    type={input.type}
                    name={input.name}
                    className='popup__input'
                    placeholder={input.placeholder}
                    required
                  />
								  <span 
									  id = {`${input.name}-input-error`}
										className='popup__input-error'
									>
									</span>
								</>
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