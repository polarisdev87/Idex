// @flow
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import NumericInput from 'react-numeric-input'; 

type Props = {
  placeholder: '',
  type: 'text',
  className: '',
};

class TimeToMarketFilterSection extends Component {
  props: Props;

  render() {
    return (
  		<div className="form-group">
          <div className="input-container">
              <div className="select-label label-base-base">Time to Market (Months):</div>
              <NumericInput  min={0} max={999999} value={this.props.min} placeholder="Min" onChange={this.props.changeMin} />
              <NumericInput  min={0} max={999999} value={this.props.max} placeholder="Max" onChange={this.props.changeMax} />
          </div>
        </div>
    		
    );
  }
}

export default TimeToMarketFilterSection;
