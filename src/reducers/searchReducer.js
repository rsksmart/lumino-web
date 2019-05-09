import createReducer from './helpers/reducerHelper'
import {
    UPDATE_INPUT_VALUE,
    CLEAR_SUGGESTIONS,
    LOAD_SUGGESTIONS_BEGIN,
    MAYBE_UPDATE_SUGGESTIONS,
    NO_SUGGESTIONS,
    SUGGESTION
} from "../actions/types";


const initialState = {
    value: '',
    suggestions: [],
    noSuggestions: false,
    isLoading: false
};

const searchReducer = createReducer(initialState,
    {
        [UPDATE_INPUT_VALUE](state, action) {
            return {
                ...state,
                value: action.value
            };
        },
        [CLEAR_SUGGESTIONS](state) {
            return {
                ...state,
                suggestions: []
            };
        },
        [LOAD_SUGGESTIONS_BEGIN](state) {
            return {
                ...state,
                isLoading: true
            };
        },
        [NO_SUGGESTIONS](state, action) {
            return {
                ...state,
                noSuggestions: action.noSuggestions
            };
        },
        [SUGGESTION](state, action) {
            return {
                ...state,
                suggestion: action.suggestion
            };
        },
        [MAYBE_UPDATE_SUGGESTIONS](state, action) {
            // Ignore suggestions if input value changed
            if (action.value !== state.value) {
                return {
                    ...state,
                    suggestions: action.suggestions,
                    isLoading: false
                };
            }
        }
    });


export default searchReducer;