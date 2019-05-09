import createReducer from './helpers/reducerHelper'
import {
    TASK_PENDING,
    TASK_COMPLETE,
    TASK_FAILED
} from "../actions/types";

const initialState = {
    count: 0,
    tasks: []
};

const taskStatusReducer = createReducer(initialState,
    {
        [TASK_PENDING](state, action) {
            return {
                ...state,
                count: state.count + 1,
                tasks: [ ...state.tasks, action.task.task],
            };
        },
        [TASK_COMPLETE](state, action) {
            return {
                ...state,
                count: decreaseCounter(state.count),
                tasks: removeTask(state.tasks, action)
            };
        },
        [TASK_FAILED](state, action) {
            return {
                ...state,
                count: decreaseCounter(state.count),
                tasks: removeTask(state.tasks, action)
            };
        }
    });


function decreaseCounter(count){
    return count - 1;
}

function removeTask(tasks, action) {
   return tasks.filter(task => task.inputAddress !== action.data.partner_address && task.token_address !== action.data.inputToken);
}

export default taskStatusReducer;