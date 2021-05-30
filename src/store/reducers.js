import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_DETAIL_REQUEST,
  ADVERTS_DETAIL_SUCCESS,
  ADVERTS_DELETED_REQUEST,
  ADVERTS_DELETED_SUCCESS,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCESS,
  AUTH_SET_PROFILE,
  UI_RESET_ERROR,
} from './types';

export const initialState = {
  auth: { logged: false, user: null, id: null },
  adverts: {
    loaded: false,
    data: [],
  },
  ui: {
    loading: false,
    error: null,
  },
  tags: {
    loaded: false,
    data: [],
  },
};

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return { logged: true, user: null, id: null };
    case AUTH_LOGOUT:
      return { logged: false, user: null, id: null };
    case AUTH_SET_PROFILE:
      return { ...state, user: action.payload.username, id: action.payload.id };

    default:
      return state;
  }
}

export function adverts(state = initialState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { loaded: true, data: action.payload };
    case ADVERTS_CREATED_SUCCESS:
    case ADVERTS_DETAIL_SUCCESS:
      return { ...state, loaded: true, data: [...state.data, action.payload] };
    case ADVERTS_DELETED_SUCCESS:
      return {
        loaded: true,
        data: state.data.filter(ad => ad.id !== action.payload),
      };
    default:
      return state;
  }
}

export function tags(state = initialState.tags, action) {
  switch (action.type) {
    case TAGS_LOADED_SUCCESS:
      return { loaded: true, data: action.payload };

    default:
      return state;
  }
}

export function ui(state = initialState.ui, action) {
  if (action.error) {
    return { ...state, loading: false, error: action.payload };
  }
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case ADVERTS_LOADED_REQUEST:
    case ADVERTS_CREATED_REQUEST:
    case ADVERTS_DELETED_REQUEST:
    case ADVERTS_DETAIL_REQUEST:
    case TAGS_LOADED_REQUEST:
      return { ...state, loading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
    case ADVERTS_LOADED_SUCCESS:
    case ADVERTS_CREATED_SUCCESS:
    case ADVERTS_DETAIL_SUCCESS:
    case ADVERTS_DELETED_SUCCESS:
    case TAGS_LOADED_SUCCESS:
      return { ...state, loading: false };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UI_RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
