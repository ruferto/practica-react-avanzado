import React from 'react';
import { shallow } from 'enzyme';

import QueryForm from './QueryForm';

describe('QueryForm', () => {
  const queries = {
    id: '',
    nombre: '',
    precio: [0, 5000],
    venta: '',
    tags: '',
  };

  const props = {
    queries,
    onSubmit: jest.fn(),
    setQueries: jest.fn(),
    handleChange: jest.fn(),
    handleReset: jest.fn(),
    maxPrice: jest.fn(),
  };

  const render = () => shallow(<QueryForm {...props} />);

  test('should render', () => {
    const wrapper = render();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('form').props().className).toBe('search-form');
  });

  test('snapshot testing', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  test('snapshot testing with is loading', () => {
    const wrapper = render();
    wrapper.setProps({ isLoading: true });
    expect(wrapper).toMatchSnapshot();
  });

  test('should submit queries', () => {
    const queries = {
      nombre: 'coche',
      precio: [100, 5000],
    };
    const wrapper = render();

    const nameField = wrapper.find('.name-qForm');
    // console.log(nameField);
    nameField.props().onChange({ target: { queries } });

    const form = wrapper.find('.search-form');
    form.simulate('submit', { preventDefault: () => {} });

    expect(props.handleChange).toHaveBeenCalledWith({ target: { queries } });
  });
});
