import {
  getTagsLoaded,
  getAdvertsLoaded,
  getAdvertDetail as giveMeAd,
} from './selectors';

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_CREATED_FAILURE,
  ADVERTS_DETAIL_REQUEST,
  ADVERTS_DETAIL_SUCCESS,
  ADVERTS_DETAIL_FAILURE,
  ADVERTS_DELETED_REQUEST,
  ADVERTS_DELETED_SUCCESS,
  ADVERTS_DELETED_FAILURE,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCESS,
  TAGS_LOADED_FAILURE,
  AUTH_SET_PROFILE,
} from './types';

export const authLoginRequest = () => {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
};

export const authLoginSuccess = () => {
  return {
    type: AUTH_LOGIN_SUCCESS,
  };
};

export const authLoginFailure = error => {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: error,
    error: true,
  };
};

export const loginAction = credentials => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      // Redirect
      const { from } = history.location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const setProfile = user => {
  return {
    type: AUTH_SET_PROFILE,
    payload: user,
  };
};

export const advertsLoadedRequest = () => {
  return {
    type: ADVERTS_LOADED_REQUEST,
  };
};

export const advertsLoadedSuccess = adverts => {
  return {
    type: ADVERTS_LOADED_SUCCESS,
    payload: adverts,
  };
};

export const advertsLoadedFailure = error => {
  return {
    type: ADVERTS_LOADED_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsLoadAction = () => {
  return async function (dispatch, getState, { api }) {
    const advertsLoaded = getAdvertsLoaded(getState());
    if (advertsLoaded) {
      return;
    }
    dispatch(advertsLoadedRequest());
    try {
      const adverts = await api.adverts.getLatestAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };
};

export const advertsCreatedRequest = () => {
  return {
    type: ADVERTS_CREATED_REQUEST,
  };
};

export const advertsCreatedSuccess = advert => {
  return {
    type: ADVERTS_CREATED_SUCCESS,
    payload: advert,
  };
};

export const advertsCreatedFailure = error => {
  return {
    type: ADVERTS_CREATED_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsCreateAction = advert => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(advertsCreatedRequest());
    try {
      const createdAdvert = await api.adverts.saveAd(advert);
      dispatch(advertsCreatedSuccess(createdAdvert));
      // redirect with history
      history.push(`/advert/${createdAdvert.id}`);
    } catch (error) {
      console.log(error);
      dispatch(advertsCreatedFailure(error));
    }
  };
};

export const advertsDetailRequest = () => {
  return {
    type: ADVERTS_DETAIL_REQUEST,
  };
};

export const advertsDetailSuccess = advert => {
  return {
    type: ADVERTS_DETAIL_SUCCESS,
    payload: advert,
  };
};

export const advertsDetailFailure = error => {
  return {
    type: ADVERTS_DETAIL_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsDetailAction = adId => {
  return async function (dispatch, getState, { api, history }) {
    const advertLoaded = giveMeAd(adId, getState());
    if (advertLoaded) {
      return;
    }
    dispatch(advertsDetailRequest());
    try {
      const ad = await api.adverts.getAdvertDetail(adId);
      dispatch(advertsDetailSuccess(ad));
      return ad;
    } catch (error) {
      console.log(error);
      dispatch(advertsDetailFailure(error));
    }
  };
};

export const advertsDeletedRequest = () => {
  return {
    type: ADVERTS_DELETED_REQUEST,
  };
};

export const advertsDeletedSuccess = advert => {
  return {
    type: ADVERTS_DELETED_SUCCESS,
    payload: advert,
  };
};

export const advertsDeletedFailure = error => {
  return {
    type: ADVERTS_DELETED_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsDeleteAction = adId => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(advertsDeletedRequest());
    try {
      const res = await api.adverts.deleteAdvert(adId);
      if (res) {
        dispatch(advertsDeletedSuccess(adId));
        // redirect with history
        history.push(`/adverts`);
      }
    } catch (error) {
      console.log(error);
      dispatch(advertsDeletedFailure(error));
    }
  };
};

export const tagListRequest = () => {
  return {
    type: TAGS_LOADED_REQUEST,
  };
};

export const tagListSuccess = tags => {
  return {
    type: TAGS_LOADED_SUCCESS,
    payload: tags,
  };
};

export const tagListFailure = error => {
  return {
    type: TAGS_LOADED_FAILURE,
    payload: error,
    error: true,
  };
};

export const tagListAction = credentials => {
  return async function (dispatch, getState, { api, history }) {
    const tagsLoaded = getTagsLoaded(getState());
    if (tagsLoaded) {
      return;
    }

    dispatch(tagListRequest());
    try {
      const tags = await api.adverts.getTags();
      dispatch(tagListSuccess(tags));
    } catch (error) {
      dispatch(tagListFailure(error));
    }
  };
};
