import React from 'react';
import { shallow } from 'enzyme';
import AdsProductItem from './AdsProductItem.jsx';

describe('Testing <AdsProductItem/> Component', () => {
  let wrapper;

  const sampleProduct = {
    _id: '123abc',
    name: 'Fine Art. Cactus',
    product_id: 550,
    price: 75.00,
    image: 'https://i.etsystatic.com/6507355/r/il/58ee24/905514140/il_1140xN.905514140_17k6.jpg',
    shipping: 'FREE Shipping',
    sponsored: false,
    category: 'Art',
    store_id: 200,
    store: '456def',
  };

  beforeEach(() => {
    wrapper = shallow(<AdsProductItem ad={sampleProduct} />);
  });

  test('render AdsProductItem component without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('render ad image', () => {
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').prop('src')).toEqual('https://i.etsystatic.com/6507355/r/il/58ee24/905514140/il_1140xN.905514140_17k6.jpg');
  });

  test('render ad name', () => {
    expect(wrapper.find('.product-name').text()).toBe('Fine Art. Cactus');
  });

  test('render ad price', () => {
    expect(wrapper.find('.currency-value').text()).toBe('75.00');
  });
});