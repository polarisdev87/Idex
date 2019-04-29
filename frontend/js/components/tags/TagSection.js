// @flow
import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import Toggle from 'react-bootstrap-toggle';
import { connect } from 'react-redux';
import {I18n} from 'react-redux-i18n';
import { getPopularTags } from '../../actions/admin';

type Props = {
  placeholder: '',
  type: 'text',
  className: '',
};

class TagSection extends Component {

  componentDidMount() {
    this.getPopularTagsHandle();
  }

    props: Props;

  state = {
    inputValue: '',
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
              onClick={(x) => { this.props.onPartialFullToggle(); }}
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

  getPopularTagsHandle() {
    const {
      dispatch,
    } = this.props;

    dispatch(getPopularTags());
  }


  render() {
    const {
      placeholder, type, className, partialFullSwitch, popularTags, tags,
    } = this.props;
    console.log("TagSection.js");
    console.log(popularTags);
    const { inputValue } = this.state;
    return (
      <div className="form-group tag-container">
        <div className="select-label label-base-base">{I18n.t('tags.selectTags')}</div>
        <div className="input-container display-tag-container">
          <TagsInput
            value={tags}
            onChange={::this.handleChange}
            renderLayout={(a, b) => this.defaultRenderLayout(a, b, partialFullSwitch)}
          />
        </div>
        <div className="top-tag-container">
          <div className="label-sm-base trending-label">{I18n.t('tags.topTrendingTags')}</div>
          <div className="top-tag-wrapper">
            {popularTags && popularTags.map((topTag) => <div className="top-tag" key={topTag.name}>{topTag.name}</div>)}
          </div>
          {tags.length > 0 &&
          <div />

          }
        </div>
        <div className="input-container search-input-container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <input
                type="text" className="form-control search-input" placeholder={I18n.t('tags.searchTags')} ref={el => { this.searchTag = el; }}
                onKeyPress={this.handleKeyPress}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state,ownProps) {
  return {
    popularTags: state.admin.popularTags,
    ...ownProps,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(TagSection);

