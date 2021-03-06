import React from 'react';
import axios from 'axios';
import SimilarProductItem from './SimilarProductItem.jsx';
import { currentProductId } from '../dummyData.js';
import { arrow } from '../SVGIcons.jsx';

class SimilarProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simProducts: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    const productId = currentProductId;
    axios.get('api/similar', {
      params: {
        productId,
      },
    })
      .then((response) => {
        this.setState({
          simProducts: response.data.similar,
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
    const { error, isLoaded, simProducts } = this.state;
    if (error) {
      return <div className="similar-section">Error</div>;
    }
    if (!isLoaded) {
      return <div className="similar-section">Loading...</div>;
    }
    return (
      <div className="similar-section">
        <div className="similar-description">
          <div>
            <h3 className="text-heading light-weight big-bottom-margin">You may also like</h3>
          </div>
          <p className="text-caption medium-weight black offset big-bottom-margin">
            <span>Shop more similar items</span>
            <span className="arrow-container">{arrow}</span>
          </p>
        </div>
        <div className="similar-products">
          {simProducts.map((prod) => <SimilarProductItem product={prod} key={prod.product_id} />)}
        </div>
      </div>
    );
  }
}

export default SimilarProductList;
