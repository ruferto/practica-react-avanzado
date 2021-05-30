import React from 'react';
import { Link } from 'react-router-dom';
import ConfirmButton from './ConfirmButton';
import NotFoundPage from './NotFoundPage';
import Tags from './Tags';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

import { getUi, getF } from '../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { advertsDetailAction, advertsDeleteAction } from '../store/actions';

const AdvertPage = ({ adId }) => {
  const isLoading = useSelector(getUi).loading;
  const error = useSelector(getUi).error;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(advertsDetailAction(adId.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ad = useSelector(getF(adId.params.id));

  const deleteSure = async () => {
    try {
      dispatch(advertsDeleteAction(adId.params.id));
      //const res = await deleteAdvert(adId.params.id);
      //setDeletedAd(res);
    } catch (error) {
      console.log(error);
      //setError(error);
    }
  };

  // if (deletedAd) {
  //   return <Redirect to='/' />;
  // }
  if (isLoading) return <Loading isLoading={true} />;

  if (error && error.status === 404) return <NotFoundPage />;

  if (error) return <ErrorMessage error={error} resetError={null} />;

  return ad && ad.tags ? (
    <div style={{ textAlign: 'center' }}>
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Link to='/'>
          <button>Back to list</button>
        </Link>

        <ConfirmButton
          className='delete-button'
          titleButton='Delete'
          okAction={deleteSure}
          message='Are you sure?'
          subtitle="(This action can't be undone)"
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-end',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'right',
            fontFamily: 'SanchezFont',
            fontSize: 35,
          }}
        >
          <div style={{ padding: 10 }}>
            <div>{ad.sale ? 'For sale' : 'Wanted'}</div>
            <span style={{ fontSize: 50 }}>
              <b>{ad.name}</b>
            </span>
          </div>

          <div>
            Price:{' '}
            <span style={{ fontSize: 45 }}>
              {ad.price % 1 !== 0
                ? Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(ad.price)
                : Intl.NumberFormat('de-DE').format(ad.price) + ' €'}
            </span>
          </div>
          <div style={{ fontSize: 20, padding: 20 }}>
            Tags: <Tags tagsArray={ad.tags} />
          </div>
        </div>
        <div style={{ width: '50vw' }}>
          <img
            style={{ borderRadius: '25px', maxHeight: '60vh' }}
            src={
              ad.photo
                ? `${process.env.REACT_APP_API_BASE_URL}${ad.photo}`
                : '../../images/back.png'
            }
            alt={ad.name}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default AdvertPage;
