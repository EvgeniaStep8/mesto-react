import { useState  } from "react";

const useInputsChange = (inputsValues) => {
  const [values, setValues] = useState(inputsValues);

	const handleChange = (event) => {
    const { value, name } = event.target;
		setValues({...values, [name]: value});
	}

	return { values, setValues, handleChange };
}

export default useInputsChange;