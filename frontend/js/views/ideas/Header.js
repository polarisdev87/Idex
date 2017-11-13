// @flow
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TagSection from '../../components/tags/TagSection';
const moment = require('moment');

type Props = {
  addIdeaButtonClick: () => {}
};

class Header extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.state = this.getDefaultState();

    this.props = props;

    this.applyFilters.bind(this);
    this.clearFilters.bind(this);
  }

  getDefaultState() {

    return {
      filterText: "Top - Past Day (Default)",
      stagesSelected: {
        any: true,
        incubation: false,
        prototyping: false,
        launched: false,
        cancelled: false
      },
      tags: []
    };
  }

  showContent() {
    const $this = $(findDOMNode(this));
    $this.find('#collapse-container-body').collapse('show');
  }

  applyFilters() {

    console.log('this', this);
    const { filterText, stagesSelected } = this.state;

    let stages = [];

    if(stagesSelected['any'] === true) {
      stages.push('Incubation');
      stages.push('Prototyping');
      stages.push('Launched');
      stages.push('Cancelled');
    } else {
      stagesSelected['incubation'] === true ? stages.push('Incubation') : null;
      stagesSelected['prototyping'] === true ? stages.push('Prototyping') : null;
      stagesSelected['launched'] === true ? stages.push('Launched') : null;
      stagesSelected['cancelled'] === true ? stages.push('Cancelled') : null;

    }

    if(filterText.startsWith('Top')) {

      let submittedAtMsMin;

      if(filterText.includes('Hour')) {
        submittedAtMsMin = moment.utc().add(-1, 'hours').valueOf();
      } else if (filterText.includes('Day')) {
        submittedAtMsMin = moment.utc().add(-1, 'days').valueOf();
      } else if (filterText.includes('Week')) {
        submittedAtMsMin = moment.utc().add(-1, 'weeks').valueOf();
      } else if (filterText.includes('Month')) {
        submittedAtMsMin = moment.utc().add(-1, 'months').valueOf();
      } else if (filterText.includes('Year')) {
        submittedAtMsMin = moment.utc().add(-1, 'years').valueOf();
      } else {
        submittedAtMsMin = 0;
      }

      this.props.fetchIdeas('Top', stages, submittedAtMsMin)
    } else {
      this.props.fetchIdeas('Newest', stages)
    }
  }

  clearFilters() {
    this.setState(this.getDefaultState());
  }

  setFilterText(filterText) {

    if(filterText !== 'Newest') {
      this.setState({
          filterText: `Top - ${filterText}`,
          stagesSelected: this.state.stagesSelected
        });
    } else {
      this.setState({ filterText: filterText });
    }
  }

  checkStageBox(stageBox) {

    let stagesSelected = this.state.stagesSelected;
    stagesSelected[stageBox] =  !stagesSelected[stageBox];

    if(stageBox !== 'any' && stagesSelected['any'] === true) {
      stagesSelected['any'] = false;
    }

    this.setState( {
      stagesSelected,
      filterText: this.state.filterText
    })
  }

  render() {
    const { addIdeaButtonClick } = this.props;
    const { stagesSelected } = this.state;


    return (
      <div className="header-container shadow">
        <div className="nav-container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <button type="button" className="btn btn-link" data-toggle="collapse" href="#collapse-container-body">Filter</button>
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
                      <input type="checkbox" value="" checked={stagesSelected.any} onClick={ () =>  this.checkStageBox('any') } />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Any Stage (default)
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={ stagesSelected.any || stagesSelected.incubation } onClick={ () =>  this.checkStageBox('incubation') } />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Incubation
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={ stagesSelected.any || stagesSelected.prototyping } onClick={ () =>  this.checkStageBox('prototyping') } />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Prototyping
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value=""  checked={ stagesSelected.any || stagesSelected.launched } onClick={ () =>  this.checkStageBox('launched') } />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Launched
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={stagesSelected.any || stagesSelected.cancelled } onClick={ () =>  this.checkStageBox('cancelled') } />
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
                      <a href="#" className="dropdown-title"><span id="selected">{ this.state.filterText }</span><span>▼</span></a>
                      <ul className="flyout-content sub nav stacked">
                        <li className="flyout-alt">
                          <a href="#">Top (default)</a>
                          <ul className="flyout-content sub nav stacked">
                            <li><a href="#" onClick={ () => this.setFilterText('Past Hour') }>Past Hour</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText('Past Day') }>Past Day (default)</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText('Past Week') }>Past Week</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText('Past Month') }>Past Month</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText('Past Year') }>Past Year</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText('All Time') }>All Time</a></li>
                          </ul>
                        </li>
                        <li><a href="#" onClick={ () => this.setFilterText('Newest') }>Newest</a></li>
                      </ul>
                    </li>
                  </ul>​
                </div>
              </div>
            </div>
            <div className="result-container">
              <div className="label-base-base">
                <span>{ this.props.numIdeas } Results</span>
              </div>
              <button type="button" className="btn btn-link label-base-base" onClick={ this.applyFilters.bind(this) } >Apply Filters</button>
              <button type="button" className="btn btn-link label-base-base" onClick={ this.clearFilters.bind(this) } >Clear Filters</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
