import React from 'react';
import QueryForm from './QueryForm';
import Advert from './Advert';
import storage from '../utils/storage';
import Loading from './Loading';
import MessagePage from './MessagePage';
import ErrorMessage from './ErrorMessage';
import { useSelector, useDispatch } from 'react-redux';
import { advertsLoadAction } from '../store/actions';
import { getAdverts, getUi, getUsername } from '../store/selectors';

const AdvertsPage = () => {
  const ads = useSelector(getAdverts);
  const dispatch = useDispatch();
  const me = useSelector(getUsername);

  const cleanFilters = {
    id: '',
    nombre: '',
    precio: [0, 5000],
    venta: '',
    tags: '',
  };

  const [queries, setQueries] = React.useState(
    me ? JSON.parse(storage.get(me)) || cleanFilters : cleanFilters
  );

  const handleChange = event => {
    setQueries(oldValue => {
      const newValue = {
        ...oldValue,
        [event.target.name]: event.target.value,
      };

      saveQueries(newValue);
      return newValue;
    });
  };

  const handleReset = () => {
    const cleanFilter = {
      id: '',
      nombre: '',
      precio: [0, getMaxPrice()],
      venta: '',
      tags: '',
    };
    setQueries(cleanFilter);
    saveQueries(cleanFilter);
  };

  const saveQueries = value => {
    storage.set(me, value);
  };

  const isLoading = useSelector(getUi).loading;
  const error = useSelector(getUi).error;

  const getMaxPrice = () => {
    const priceList = ads.map(ad => {
      return ad.price;
    });
    const max = Math.max.apply(null, priceList);
    return max;
  };

  React.useEffect(() => {
    dispatch(advertsLoadAction());

    if (me) {
      if (storage.get(me)) {
        setQueries(JSON.parse(storage.get(me.toString())));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  const filtered = ads
    ? ads.filter(
        ad =>
          ad.price >= queries.precio[0] &&
          ad.price <= queries.precio[1] &&
          ad.name.toLowerCase().includes(queries.nombre.toLowerCase()) &&
          (ad.sale.toString() === queries.venta || queries.venta === '') &&
          ad.tags.filter(tag => queries.tags.includes(tag)).length ===
            queries.tags.length
      )
    : [];

  const adsElement = filtered.map(ad => {
    return (
      <Advert ad={ad} queries={queries} setQueries={setQueries} key={ad.id} />
    );
  });

  const diff = ads ? ads.length - adsElement.length : 0;
  const lengthAds = ads ? ads.length : 0;

  if (error) return <ErrorMessage error={error} resetError={null} />;
  if (isLoading) return <Loading isLoading={true} />;
  if (lengthAds === 0)
    return (
      <MessagePage
        message='There are no adverts yet'
        urlLink='/advert/new'
        textLink='Be the first creating one'
      />
    );
  return (
    <>
      {ads.length > 1 ? (
        <QueryForm
          queries={queries}
          setQueries={setQueries}
          handleChange={handleChange}
          handleReset={handleReset}
          maxPrice={getMaxPrice}
        />
      ) : (
        ''
      )}
      {diff > 0 && adsElement.length !== 0 ? (
        <div style={{ textAlign: 'center' }}>
          There's {diff} more advert{diff > 1 ? 's' : ''} that not match with
          current filters
        </div>
      ) : (
        <br />
      )}
      <div className='ads-list'>
        {adsElement.length !== 0 ? (
          adsElement
        ) : (
          <MessagePage
            message='There are no adverts with this filter'
            urlLink='/advert/new'
            textLink='You can create one'
          />
        )}
      </div>
    </>
  );
};

export default AdvertsPage;
