const initialState = {
    apiKey: "",
    dataBlog: [],
    dataMessage: [],
    checkApiUpdate: false,
    id: 0,
} 

export const inputReducer = function (state = initialState, action) {
    switch (action.type) {
        case "input/submit": {
            return {...state, apiKey: action.payload}
        }
        case "data/submit": {
            return {...state, dataBlog: action.payload}
        }
        case "add/column": {
            return {...state, dataBlog: [...state.dataBlog,action.payload]}
        }
        case "data/message": {
            return {...state, dataMessage: action.payload}
        }
        case "checkUpdate/api": {
            return {...state, checkApiUpdate: action.payload}
        }
        case "add/task": {
            return {...state, dataMessage: [...state.dataMessage,action.payload]}
        }
        case "create/id": {
            return {...state, id: Number.parseInt(state.id) + 1}
        }
        default: {
            return state;
        }
    }
}