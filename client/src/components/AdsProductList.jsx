import React from 'react';
import axios from 'axios';
import AdsProductItem from './AdsProductItem.jsx';
import { currentProductId } from '../dummyData.js';
import { questionmark } from '../SVGIcons.jsx';

class AdsProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adProducts: [],
      isLoaded: false,
      error: null,
      isOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const currentproductId = currentProductId;
    axios.get(`api/ads/${currentproductId}`)
      .then((response) => {
        this.setState({
          adProducts: response.data.ads,
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

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { error, isLoaded, adProducts } = this.state;
    if (error) {
      return <div className="ads-products">Error</div>;
    }
    if (!isLoaded) {
      return <div className="ads-products">Loading...</div>;
    }
    return (
      <div className="ads-section">
        <div className="ads-description">
          <span className="ads-info" onClick={this.handleClick}>
            <button type="button">
              <span>Ads</span>
              <span className="question-mark">{questionmark}</span>
            </button>
            <span className={this.state.isOpen === true ? 'popover-content popover-is-open' : 'popover-content'} role="tooltip">
              Etsy sellers promote their items through our paid advertising platform. Ads are shown to you based on a number of factors like relevancy and the amount sellers pay per click. <u>Learn more</u>.
            </span>
          </span>
        </div>
        <div className="ads-products">
          {/* <div className="ads-listings"> */}
            {adProducts.map((ad) => <AdsProductItem ad={ad} key={ad.product_id} />)}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default AdsProductList;
