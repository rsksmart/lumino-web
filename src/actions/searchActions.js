import client from "../restClient";
import {
  NO_SUGGESTIONS,
  CLEAR_SUGGESTIONS,
  UPDATE_INPUT_VALUE,
  LOAD_SUGGESTIONS_BEGIN,
  MAYBE_UPDATE_SUGGESTIONS,
  SUGGESTION
} from "./types";
import { mapSuggestions } from "./actionUtils";

export const onSuggestionsFetchRequested = query => (dispatch, getState) =>
  new Promise((resolve, reject) =>
    client
      .get("/api/v1/searchLumino", {
        params: {
          query: query
        }
      })
      .then(response => {
        if (response) {
          let mappedResponse = mapSuggestions(response.data);
          if (mappedResponse.length === 0) {
            dispatch(noSuggestions(true));
          } else {
            dispatch(noSuggestions(false));
          }
          return dispatch(maybeUpdateSuggestions(mappedResponse));
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      })
  );

export const onChange = (event, { newValue }) => ({
  type: UPDATE_INPUT_VALUE,
  value: typeof newValue !== "undefined" ? newValue : ""
});

export const onSuggestionsClearRequested = () => ({
  type: CLEAR_SUGGESTIONS
});

export const loadSuggestionsBegin = () => ({
  type: LOAD_SUGGESTIONS_BEGIN
});

export const maybeUpdateSuggestions = (suggestions, value) => ({
  type: MAYBE_UPDATE_SUGGESTIONS,
  suggestions,
  value
});

export const noSuggestions = noSuggestions => ({
  type: NO_SUGGESTIONS,
  noSuggestions: noSuggestions
});

export const selectedSuggestion = selectedSuggestion => ({
  type: SUGGESTION,
  suggestion: selectedSuggestion
});
