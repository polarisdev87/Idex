// @flow
import React, { Component } from 'react';
import cx from 'classnames';
import NumericInput from 'react-numeric-input'; 
import PropTypes from 'prop-types';
import {I18n} from 'react-redux-i18n';

type Props = {
  placeholder: '',
  type: 'text',
  className: '',
};

class VotesFilterSection extends Component {
  props: Props;

  render() {
	  console.log("VotesFilterSection.render()");
	  console.log(this.props);
    return (
  		<div className="form-group">
          <div className="input-container">
              <div className="select-label label-base-base">{I18n.t('ideas.filter.votes')}</div>
              <NumericInput  min={0} max={999999} value={this.props.min} placeholder="Min" onChange={this.props.changeMin} />
              <NumericInput  min={0} max={999999} value={this.props.max} placeholder="Max" onChange={this.props.changeMax} />
          </div>
        </div>
    		
    );
  }
}

export default VotesFilterSection;
