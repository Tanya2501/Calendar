import {combineReducers} from "redux";
import calendar from "./calendar";
import events from "./events";
import trainers from "./trainers";
import descriptionEvent from "./descriptionEvent"

export default combineReducers({calendar, events, trainers, descriptionEvent});
