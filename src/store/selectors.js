export const getIsLogged = state => state.auth.logged;
export const getUsername = state => state.auth.user;
export const getUserId = state => state.auth.id;

export const getAdverts = state => {
  return state.adverts.data;
};
export const getAdvertsLoaded = state => {
  return state.adverts.loaded;
};
export const getF = advertId => state => {
  console.log(state);
  const advert = state
    ? state.adverts.data.find(advert => {
        return advert.id === advertId;
      })
    : null;
  return advert;
};
export const getAdvertDetail = (advertId, state) => {
  const advert = state.adverts.data.find(advert => {
    return advert.id === advertId;
  });
  return advert;
};

export const getUi = state => state.ui;

export const getTags = state => state.tags.data;
export const getTagsLoaded = state => state.tags.loaded;
