// @flow
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import NumericInput from 'react-numeric-input'; 

type Props = {
  placeholder: '',
  type: 'text',
  className: '',
};

class ProfitFilterSection extends Component {
  props: Props;

  state = {
    profitMin: 0,
    profitMax: 999999,
  }

  handleChangeMin(profitMin) {
    this.setState({ profitMin });
  }

  handleChangeMax(profitMax) {
    this.setState({ profitMax });
  }
  
  
  render() {
    return (
  		<div className="form-group">
          <div className="input-container">
              <div className="select-label label-base-base">Profit:</div>
              <NumericInput  min={0} max={999999} value={this.state.profitMin} placeholder="Min" onChange={this.handleChangeMin} />
              <NumericInput  min={0} max={999999} value={this.state.profitMax} placeholder="Max" onChange={this.handleChangeMax} />
          </div>
        </div>
    		
    );
  }
}

export default ProfitFilterSection;
