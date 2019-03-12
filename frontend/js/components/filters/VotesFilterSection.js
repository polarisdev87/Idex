// @flow
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import NumericInput from 'react-numeric-input'; 

type Props = {
  placeholder: '',
  type: 'text',
  className: '',
};

class VotesFilterSection extends Component {
  props: Props;

  state = {
    votesMin: 0,
    votesMax: 999999,
  }

  handleChangeMin(votesMin) {
    this.setState({ votesMin });
  }

  handleChangeMax(votesMax) {
    this.setState({ votesMax });
  }
  
  
  render() {
    return (
  		<div className="form-group">
          <div className="input-container">
              <div className="select-label label-base-base">Votes:</div>
              <NumericInput  min={0} max={999999} value={this.state.votesMin} placeholder="Min" onChange={this.handleChangeMin} />
              <NumericInput  min={0} max={999999} value={this.state.votesMax} placeholder="Max" onChange={this.handleChangeMax} />
          </div>
        </div>
    		
    );
  }
}

export default VotesFilterSection;
