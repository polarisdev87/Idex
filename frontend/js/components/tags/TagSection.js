// @flow
import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import Toggle from 'react-bootstrap-toggle';
import { connect } from 'react-redux';

type Props = {
  placeholder: '',
  type: 'text',
  className: '',
};

class TagSection extends Component {
  props: Props;

  state = {
    inputValue: '',
    optionalMarks: [],
  }

  handleChange(tags) {
    this.props.handleTagsChange(tags);
  }

  defaultRenderLayout(tagComponents, inputComponent, toggleActive) {
    return (
      <span>
        { tagComponents.length > 1 &&
          <span>
            <Toggle
              onClick={(x) => { this.props.onPartialFullToggle() }}
              on="Partial"
              off="Full"
              size="sm"
              active={toggleActive}
            />
          </span>
        }

        {tagComponents}
        {inputComponent}
      </span>
    );
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.addTag(e.target.value);
      this.searchTag.value = '';
    }
  }


  render() {
    const { placeholder, type, className, partialFullSwitch } = this.props;
    const { inputValue } = this.state;
    return (
      <div className="form-group tag-container">
        <div className="select-label label-base-base">Select Tags:</div>
        <div className="input-container display-tag-container">
          <TagsInput 
            value={this.props.tags} 
            onChange={::this.handleChange} 
            renderLayout={(a, b) => this.defaultRenderLayout(a, b, partialFullSwitch)} />
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
          {this.props.tags.length > 0 &&
          <div />

          }
        </div>
        <div className="input-container search-input-container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <input
                type="text" className="form-control search-input" placeholder="Search tags ....." ref={el => { this.searchTag = el; }}
                onKeyPress={this.handleKeyPress}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {  };
}


export default connect(mapStateToProps, mapDispatchToProps)(TagSection);


