// @flow
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import TagsInput from 'react-tagsinput';

type Props = {
  placeholder: '',
  type: 'text',
  className: '',
};

class TagSection extends Component {
  props: Props;

  state = {
    inputValue: '',
  }

  handleChange(tags) {
    this.props.handleTagsChange(tags);
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      this.props.addTag(e.target.value);
      this.searchTag.value = '';
    }
  }

  render() {
    const { placeholder, type, className } = this.props;
    const { inputValue } = this.state;
    return (
      <div className="form-group tag-container">
        <div className="select-label label-base-base">Select Tags:</div>
        <div className="input-container display-tag-container">
          <TagsInput value={this.props.tags} onChange={::this.handleChange} />
        </div>
        <div className="top-tag-container">
          <div className="label-sm-base trending-label">Top Trending Tags:</div>
          <div className="top-tag-wrapper">
            <div className="top-tag">
              asia
            </div>
            <div className="top-tag">
              cloud
            </div>
            <div className="top-tag">
              web
            </div>
          </div>
        </div>
        <div className="input-container search-input-container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <input type="text" className="form-control search-input" placeholder="Search tags ....." ref={el => { this.searchTag = el; }} onKeyPress={this.handleKeyPress} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TagSection;
