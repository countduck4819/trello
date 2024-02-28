import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk"
import { inputReducer } from "../reducer/inputReducer";
const rootReducer = combineReducers({
    input: inputReducer,
});
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
