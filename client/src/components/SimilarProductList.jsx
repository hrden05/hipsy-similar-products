import React from 'react';
import axios from 'axios';
import SimilarProductItem from './SimilarProductItem.jsx';
import { currentProductId } from '../dummyData.js';

class SimilarProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      similarProducts: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    const currentproductId = currentProductId;
    axios.get(`api/similar/${currentproductId}`)
      .then((response) => {
        // console.log('ads', response.data);
        this.setState({
          similarProducts: response.data.similar,
          isLoaded: true,
        });
      })
      .catch((error) => {
        // console.log(error);
        // return error.message;
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  render() {
    const { error, isLoaded, similarProducts } = this.state;
    if (error) {
      return <div className="similar-products">Error</div>;
    }
    if (!isLoaded) {
      return <div className="similar-products">Loading...</div>;
    }
    return (
      <div className="similar-products">
        <ul className="listings">
          {similarProducts.map((prod) => <SimilarProductItem product={prod} key={prod.product_id} />)}
        </ul>
      </div>
    );
  }
}

export default SimilarProductList;
