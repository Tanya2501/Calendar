export function closeDescriptionWindow() {
	return {
		type: "DESCRIPTION_IS_CLOSE",
		payload: {
			classNameForDisplay: `none`
		}
	}
}

export function openDescriptionWindow() {
	return {
		type: "DESCRIPTION_IS_CLOSE",
		payload: {
			classNameForDisplay: `displayDescriptionEvent`
		}
	}
}