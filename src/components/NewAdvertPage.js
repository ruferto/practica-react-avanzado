import React from 'react';
import SelectTag from './SelectTag';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

import { getUi } from '../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { advertsCreateAction } from '../store/actions';

export const NewAdvertPage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [formValues, setFormValues] = React.useState({
    name: '',
    price: 0,
    sale: true,
    tags: [],
  });

  const [tags, setTags] = React.useState([]);
  const error = useSelector(getUi).error;
  const isLoading = useSelector(getUi).loading;
  const inputRef = React.useRef(null);

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(advertsCreateAction(formValues));
  };

  const handleChange = event => {
    if (event.target && event.target.name === 'photo') {
      setFormValues(oldValue => {
        const newValue = {
          ...oldValue,
          photo: event.target.files[0],
        };
        return newValue;
      });
    } else {
      setFormValues(oldValue => {
        const newValue = event.target
          ? {
              ...oldValue,
              [event.target.name]: event.target.value,
            }
          : {
              ...oldValue,
              tags: event.length ? event : '',
            };

        return newValue;
      });
    }
  };

  if (isLoading) return <Loading isLoading={true} />;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {' '}
      <div className='new-ad-container'>
        <form
          className='form-add'
          method='POST'
          onSubmit={handleSubmit}
          noValidate
        >
          <div className='new-ad-wrapper'>
            <div>
              <div>
                <label htmlFor='name'>
                  <br />
                  Name
                </label>
                <input
                  ref={inputRef}
                  type='text'
                  name='name'
                  value={formValues.name}
                  className='ad-name-input'
                  id='name'
                  placeholder='Article'
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor='precio'>Price</label>
                <input
                  type='number'
                  step='0.01'
                  min='0'
                  name='price'
                  value={formValues.price}
                  id='price'
                  className='ad-price-input'
                  placeholder='0,00'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div
              style={{
                fontSize: '1.2rem',
                display: 'flex',
                flexDirection: 'row',
                padding: 7,
                justifyContent: 'center',
              }}
            >
              <label
                style={{
                  fontSize: 14,
                  marginRight: 20,
                }}
              >
                Type
              </label>
              <div
                style={{
                  marginRight: 20,
                  fontFamily: 'SanchezFont',
                  fontSize: 25,
                }}
              >
                <input
                  id='sale'
                  name='sale'
                  type='radio'
                  value={formValues.sale}
                  onChange={handleChange}
                  defaultChecked
                />
                <label> Sale</label>
              </div>
              <div
                style={{
                  marginRight: 20,
                  fontFamily: 'SanchezFont',
                  fontSize: 25,
                }}
              >
                <input
                  id='sale'
                  name='sale'
                  type='radio'
                  value={!formValues.sale}
                  onChange={handleChange}
                />
                <label> Buy</label>
              </div>
            </div>
            <div>
              <label htmlFor='tags'>Tags</label>
              <SelectTag
                handleChange={handleChange}
                selected={tags}
                setTagsForNew={setTags}
                width={500}
              />
            </div>
            <div
              style={{
                marginTop: 20,
                marginBottom: 20,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}
            >
              <label style={{ marginRight: 20 }} htmlFor='photo'>
                Photo
              </label>
              <br></br>
              <input
                style={{
                  width: 500,
                  fontSize: 20,
                }}
                type='file'
                className='ad-photo'
                name='photo'
                id='photo'
                accept='image/*'
                onChange={handleChange}
              />
            </div>
            <button
              style={{ fontSize: 25 }}
              type='submit'
              className='buttonAdd'
              disabled={
                !(
                  formValues.name !== '' &&
                  formValues.price > 0 &&
                  formValues.tags.length > 0
                )
              }
            >
              Publish
            </button>
          </div>
        </form>
        {error ? <ErrorMessage error={error} /> : ''}
      </div>
    </div>
  );
};
export default NewAdvertPage;
