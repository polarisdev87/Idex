// @flow
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TagSection from '../../components/tags/TagSection';
type Props = {
  addIdeaButtonClick: () => {},
}

class Header extends Component {
  props: Props;
    
  showContent() {
    const $this = $(findDOMNode(this));
    $this.find('#collapse-container-body').collapse('show');
  }

  render() {
    const { addIdeaButtonClick } = this.props;

    return (
      <div className="header-container shadow">
        <div className="nav-container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <button type="button" className="btn btn-link" >All Ideas</button>
              <button type="button" className="btn btn-link">Newest</button>
              <button type="button" className="btn btn-link">Votes</button>
              <button type="button" className="btn btn-link" data-toggle="collapse" href="#collapse-container-body">Tags</button>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <button type="button" className="btn btn-link btn-right" onClick={() => addIdeaButtonClick()}>Add Idea</button>
            </div>
          </div>
        </div>
        <div id="collapse-container-body" className="collapse">
          <div className="collapse-container">
            <div className="tag-section">
              <TagSection />
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="label-base-base">
                  Stage
                </div>
                <div className="">
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Any Stage (default)
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Incubation
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Prototyping
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Launched
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Canceled
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="label-base-base">
                  Sort by:
                </div>
                <div className="dropdown-container">
                  <ul className="nav site-nav">
                    <li className="flyout">
                      <a href="#" className="dropdown-title">▼</a>
                      <ul className="flyout-content sub nav stacked">
                        <li><a href="#">Votes (default)</a></li>
                        <li className="flyout-alt">
                          <a href="#">Newest</a>
                          <ul className="flyout-content sub nav stacked">
                            <li><a href="#">Past Hour</a></li>
                            <li><a href="#">Past day (default)</a></li>
                            <li><a href="#">Past week</a></li>
                            <li><a href="#">Past month</a></li>
                            <li><a href="#">Past year</a></li>
                            <li><a href="#">All time</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>​
                </div>
              </div>
            </div>
            <div className="result-container">
              <div className="label-base-base">
                72 Results
              </div>
              <button type="button" className="btn btn-link label-base-base" >Clear Filters</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
