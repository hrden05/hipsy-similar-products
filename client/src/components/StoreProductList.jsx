import React from 'react';
import axios from 'axios';
import StoreProductItem from './StoreProductItem.jsx';
import { currentProductId } from '../dummyData.js';

class StoreProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storeProducts: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    const productId = currentProductId;
    axios.get('api/storeproducts', {
      params: {
        productId,
      },
    })
      .then((response) => {
        this.setState({
          storeProducts: response.data.storeProducts,
          isLoaded: true,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  render() {
    const { error, isLoaded, storeProducts } = this.state;
    if (error) {
      return <div className="store-products">Error</div>;
    }
    if (!isLoaded) {
      return <div className="store-products">Loading...</div>;
    }
    return (
      <div className="store-products">
        <div className="store-listings">
          {storeProducts.map((prod) => <StoreProductItem product={prod} key={prod.product_id} />)}
        </div>
      </div>
    );
  }
}

export default StoreProductList;
