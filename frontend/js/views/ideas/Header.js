// @flow
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {I18n} from 'react-redux-i18n';


import TagSection from '../../components/tags/TagSection';
import VotesFilterSection from '../../components/filters/VotesFilterSection';
import ProfitFilterSection from '../../components/filters/ProfitFilterSection';
import TimeToMarketFilterSection from '../../components/filters/TimeToMarketFilterSection';
import { toggleFilterFullPartial, 
	changeVotes, 
	changeImplementationTTM, 
	changeProfit, 
	setDefaultFilter} from '../../actions/ideas';


const moment = require('moment');

type Props = {
  addIdeaButtonClick: () => {}
};

class Header extends Component {
  props: Props;

  topTypeFilters = {
    pastHour: 'Past Hour',
    pastDay: 'Past Day',
    pastWeek: 'Past Week',
    pastMonth: 'Past Month',
    pastYear: 'Past Year',
    allTime: 'All Time',
  };

  constructor(props) {
    super(props);
    
    
    const {dispatch} = props;
    dispatch(setDefaultFilter());

    this.state = this.getDefaultState();

    this.props = props;

    this.applyFilters.bind(this);
    this.clearFilters.bind(this);

    this.applyFilters();
  }

  getDefaultState() {
    const {dispatch} = this.props;
    dispatch(setDefaultFilter());
    return {
      filterText: `Top - ${this.topTypeFilters.pastDay} (Default)`,
      stagesSelected: {
        any: true,
        incubation: false,
        prototyping: false,
        launched: false,
        cancelled: false,
      },
      tags: [],
    };
  }


  showContent() {
    const $this = $(findDOMNode(this));
    $this.find('#collapse-container-body').collapse('show');
  }


  getMomentFromLabel(timeLabel) {
    let atMsMin = 0;
    if (timeLabel.includes('Hour')) {
      atMsMin = moment.utc().add(-1, 'hours').valueOf();
    } else if (timeLabel.includes('Day')) {
      atMsMin = moment.utc().add(-1, 'days').valueOf();
    } else if (timeLabel.includes('Week')) {
      atMsMin = moment.utc().add(-1, 'weeks').valueOf();
    } else if (timeLabel.includes('Month')) {
      atMsMin = moment.utc().add(-1, 'months').valueOf();
    } else if (timeLabel.includes('Year')) {
      atMsMin = moment.utc().add(-1, 'years').valueOf();
    }
    return atMsMin;
  }


  /* Make changes when tags elements change
  */
  handleTagsChange(tags) {
    this.setState({ tags });
  }


  addTag(value) {
    const newTags = this.state.tags;

    newTags.push(value);
    this.setState({
      tags: newTags,
    });
  }


  handleChangeVotesMin(value) {
	  const {dispatch, votesMax} = this.props;
	  dispatch(changeVotes(value,votesMax)); 
  }

  handleChangeVotesMax(value) {
	  const {dispatch, votesMin} = this.props;
	  console.log("handleChangeVotesMax");
	  console.log(votesMin);
	  console.log(value);
	  dispatch(changeVotes(votesMin, value)); 
  }


  handleChangeProfitMin(value) {
	  const {dispatch, profitMax} = this.props;
	  dispatch(changeProfit(value,profitMax)); 
  }

  handleChangeProfitMax(value) {
	  const {dispatch, profitMin} = this.props;
	  dispatch(changeProfit(profitMin, value)); 
  }


  handleChangeImplementationTTMMin(value) {
	  const {dispatch, implementationTTMMax} = this.props;
	  dispatch(changeImplementationTTM(value,implementationTTMMax)); 
  }


  
  handleChangeImplementationTTMMax(value) {
	  const {dispatch, implementationTTMMin} = this.props;
	  dispatch(changeImplementationTTM(implementationTTMMin, value)); 
  }


  applyFilters() {
    const {
      filterText,
      stagesSelected,
      tags,
    } = this.state;
    
    const {
    	votesMin,
    	votesMax,
    	profitMin,
    	profitMax,
    	implementationTTMMin,
    	implementationTTMMax,
    } = this.props;

    const stages = [];

    if (stagesSelected.any === true) {
      stages.push('Incubation');
      stages.push('Prototyping');
      stages.push('Launched');
      stages.push('Cancelled');
    } else {
      stagesSelected.incubation === true ? stages.push('Incubation') : null;
      stagesSelected.prototyping === true ? stages.push('Prototyping') : null;
      stagesSelected.launched === true ? stages.push('Launched') : null;
      stagesSelected.cancelled === true ? stages.push('Cancelled') : null;
    }

    let mainFilter = '';
    let submittedAtMsMin = null;
    const submittedAtMsMax = null;
    if (filterText.startsWith('Top')) {
      submittedAtMsMin = this.getMomentFromLabel(filterText);
      mainFilter = 'Top';
    } else {
      mainFilter = 'Newest';
    }
    this.props.fetchIdeas(
      mainFilter,
      stages,
      submittedAtMsMin,
      submittedAtMsMax,
      votesMin,
      votesMax,
      profitMin,
      profitMax,
      implementationTTMMin,
      implementationTTMMax,
      tags
    );
  }

  clearFilters() {
	    const {dispatch} = this.props;
	    this.setState(this.getDefaultState());	    
	    dispatch(setDefaultFilter());
  }

  setFilterText(filterText) {
    if (filterText !== 'Newest') {
      this.setState({
        filterText: `Top - ${filterText}`,
      });
    } else {
      this.setState({ filterText });
    }
  }


  checkStageBox(stageBox) {
    const stagesSelected = this.state.stagesSelected;
    stagesSelected[stageBox] = !stagesSelected[stageBox];

    if (stageBox !== 'any' && stagesSelected.any === true) {
      stagesSelected.any = false;
    }

    this.setState({
      stagesSelected,
    });
  }


  onPartialFullToggle() {
    const { dispatch } = this.props;
    dispatch(toggleFilterFullPartial());
  }


  render() {
    const { addIdeaButtonClick, partialFullSwitch, implementationTTMMin, implementationTTMMax, votesMin, votesMax, profitMin, profitMax } = this.props;
    const { stagesSelected, implementedFilterSelected } = this.state;
    console.log("Header.render()");
    console.log(this.props);
    console.log(this.state);
    console.log("votesMin");
    console.log(votesMin);
    console.log("votesMax");
    console.log(votesMax);


    return (
      <div className="header-container shadow">

        {/* Header */}
        <div className="nav-container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <button type="button" className="btn btn-link" data-toggle="collapse" href="#collapse-container-body">{I18n.t('ideas.filter.title')}</button>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <button type="button" className="btn btn-link btn-right" onClick={() => addIdeaButtonClick()}>{I18n.t('ideas.filter.addIdea')}</button>
            </div>
          </div>
        </div>

        <div id="collapse-container-body" className="collapse">
          <div className="collapse-container">
            <div className="tag-section">
              <TagSection
                partialFullSwitch= {partialFullSwitch}
                tags={this.state.tags}
                handleTagsChange={(tags) => this.handleTagsChange(tags)}
                addTag={(tag) => this.addTag(tag)}
                onPartialFullToggle= {() => this.onPartialFullToggle()}
              />
            </div>

            {/* Stage */}

            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="label-base-base">
                 {I18n.t('ideas.filter.stage.title')}
                </div>
                <div className="">
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={stagesSelected.any} onChange={() => this.checkStageBox('any')} />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      {I18n.t('ideas.filter.stage.anyStage')}
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={stagesSelected.any || stagesSelected.incubation} onChange={() => this.checkStageBox('incubation')} />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      {I18n.t('ideas.filter.stage.incubation')}
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={stagesSelected.any || stagesSelected.prototyping} onChange={() => this.checkStageBox('prototyping')} />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      {I18n.t('ideas.filter.stage.Prototyping')}
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={stagesSelected.any || stagesSelected.launched} onChange={() => this.checkStageBox('launched')} />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      {I18n.t('ideas.filter.stage.Launched')}
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={stagesSelected.any || stagesSelected.cancelled} onChange={() => this.checkStageBox('cancelled')} />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      {I18n.t('ideas.filter.stage.Cancelled')}
                    </label>
                  </div>
                </div>
              </div>

              {/* Sort by section */}
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="label-base-base">
                {I18n.t('ideas.filter.sortBy')}
                </div>
                <div className="dropdown-container">
                  <ul className="nav site-nav">
                    <li className="flyout">
                      <a href="#" className="dropdown-title"><span id="selected">{ this.state.filterText }</span><span>▼</span></a>
                      <ul className="flyout-content sub nav stacked">
                        <li className="flyout-alt">
                          <a href="#">Top (default)</a>
                          <ul className="flyout-content sub nav stacked">
                            <li><a href="#" onClick={() => this.setFilterText(this.topTypeFilters.pastHour)}>{this.topTypeFilters.pastHour}</a></li>
                            <li><a href="#" onClick={() => this.setFilterText(this.topTypeFilters.pastDay)}>{this.topTypeFilters.pastDay} (Default)</a></li>
                            <li><a href="#" onClick={() => this.setFilterText(this.topTypeFilters.pastWeek)}>{this.topTypeFilters.pastWeek}</a></li>
                            <li><a href="#" onClick={() => this.setFilterText(this.topTypeFilters.pastMonth)}>{this.topTypeFilters.pastMonth}</a></li>
                            <li><a href="#" onClick={() => this.setFilterText(this.topTypeFilters.pastYear)}>{this.topTypeFilters.pastYear}</a></li>
                            <li><a href="#" onClick={() => this.setFilterText(this.topTypeFilters.allTime)}>{this.topTypeFilters.allTime}</a></li>
                          </ul>
                        </li>
                        <li><a href="#" onClick={() => this.setFilterText('Newest')}>Newest</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Expected Time To Market */}
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <TimeToMarketFilterSection
                  min={implementationTTMMin}
                  max={implementationTTMMax}
                  changeMin={(value) => this.handleChangeImplementationTTMMin(value)}
                  changeMax={(value) => this.handleChangeImplementationTTMMax(value)}
                />
              </div>


              {/* Votes Section */}
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <VotesFilterSection
                  min={votesMin}
                  max={votesMax}
                  changeMin={(value) => this.handleChangeVotesMin(value)}
                  changeMax={(value) => this.handleChangeVotesMax(value)}
                />
              </div>

              {/* Profit Section */}
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <ProfitFilterSection
                  min={profitMin}
                  max={profitMax}
                  changeMin={(value) => this.handleChangeProfitMin(value)}
                  changeMax={(value) => this.handleChangeProfitMax(value)}
                />
              </div>
            </div>


            {/* Base Section */}
            <div className="result-container">
              <div className="label-base-base">
                <span>{ this.props.numIdeas } {I18n.t('ideas.filter.results')}</span>
              </div>
              <button type="button" className="btn btn-link label-base-base" onClick={this.applyFilters.bind(this)} >{I18n.t('ideas.filter.applyFilters')}</button>
              <button type="button" className="btn btn-link label-base-base" onClick={this.clearFilters.bind(this)} >{I18n.t('ideas.filter.clearFilters')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	console.log("Header.mapStateToProps");
	console.log(state);
  return {
    partialFullSwitch: state.ideas.partialFullSwitch,
    votesMin: state.ideas.filter.votesMin,
    votesMax: state.ideas.filter.votesMax,
    profitMin: state.ideas.filter.profitMin,
    profitMax: state.ideas.filter.profitMax,
    implementationTTMMin: state.ideas.filter.implementationTTMMin,
    implementationTTMMax: state.ideas.filter.implementationTTMMax,
    
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
