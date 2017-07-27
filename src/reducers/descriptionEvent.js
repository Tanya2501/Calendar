const descriptionInitialState = {
	classNameForDisplay: `none`	
}

export default function description(state=descriptionInitialState, action) {
	switch (action.type) {
		case "DESCRIPTION_IS_CLOSE":
			return {...state,
				classNameForDisplay: action.payload
			};
		case "DESCRIPTION_IS_OPEN":
			return {...state, classNameForDisplay: action.payload}
	}
	return state;
}