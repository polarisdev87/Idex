// @flow
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TagSection from '../../components/tags/TagSection';
import VotesFilterSection from '../../components/filters/VotesFilterSection';
import ProfitFilterSection from '../../components/filters/ProfitFilterSection';
const moment = require('moment');

type Props = {
  addIdeaButtonClick: () => {}
};

class Header extends Component {
  props: Props;

  topTypeFilters = {
    pastHour : "Past Hour",
    pastDay : 'Past Day',
    pastWeek : 'Past Week',
    pastMonth : 'Past Month',
    pastYear : 'Past Year',
    allTime : 'All Time'
  };

  implementedTypeFilters = {
    pastHour : "Past Hour",
    pastDay : 'Past Day',
    pastWeek : 'Past Week',
    pastMonth : 'Past Month',
    pastYear : 'Past Year',
    allTime : 'All Time'
  };

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
      filterImplementedText: "All Time (default)",
      stagesSelected: {
        any: true,
        incubation: false,
        prototyping: false,
        launched: false,
        cancelled: false
      },
      implementedFilterSelected: false,
      tags: [],
      votesMin: 0,
      votesMax: 999999,
      profitMin: 0,
      profitMax: 999999,
    };
  }


  showContent() {
    const $this = $(findDOMNode(this));
    $this.find('#collapse-container-body').collapse('show');
  }


  getMomentFromLabel(timeLabel) {
      var atMsMin=0;
      if(timeLabel.includes('Hour')) {
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


  changeVotesMin(value) {
    console.log("changeVotesMin");
    console.log(value);
    this.setState({ votesMin: value });
  }

  changeVotesMax(value) {
    this.setState({ votesMax: value });
  }
  

  changeProfitMin(value) {
    this.setState({ profitMin: value });
  }

  changeProfitMax(value) {
    this.setState({ profitMax: value });
  }
  


  applyFilters() {

    console.log('this', this);
    const { filterText, stagesSelected, filterImplementedText,implementedFilterSelected, votesMin, votesMax, profitMin, profitMax, tags } = this.state;

    console.log("applyFilters().state");
    console.log(this.state);
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

    let implementationTimeMsMin=0;
    let implementationTimeMsMax=null;
    if (implementedFilterSelected) {
      implementationTimeMsMin = this.getMomentFromLabel(filterImplementedText);
    }
    let mainFilter="";
    let submittedAtMsMin = 0;
    let submittedAtMsMax = null;
    console.log("test1");
    if(filterText.startsWith('Top')) {
	    console.log("Top");
      let submittedAtMsMin = this.getMomentFromLabel(filterText);
    } else {
      mainFilter = 'Newest';
    }
    this.props.fetchIdeas(mainFilter, stages, submittedAtMsMin,submittedAtMsMax,votesMin,votesMax,profitMin,profitMax,implementationTimeMsMin,implementationTimeMsMax, tags);

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


  setFilterImplementedText(filterText) {
      this.setState({
          filterImplementedText: `${filterText}`,
        });
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

  toggleImplemented() {
    let implementedFilterSelected = this.state.implementedFilterSelected;
    implementedFilterSelected = !implementedFilterSelected;
    this.setState({
      implementedFilterSelected,
    })
  }




  render() {
    const { addIdeaButtonClick } = this.props;
    const { stagesSelected, implementedFilterSelected } = this.state;


    return (
      <div className="header-container shadow">

            {/* Header */}
      
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
              <TagSection tags={this.state.tags} handleTagsChange={(tags) => this.handleTagsChange(tags)} addTag={(tag) => this.addTag(tag)} />
            </div>
        
            {/* Stage */}
            
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="label-base-base">
                  Stage
                </div>
                <div className="">
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={stagesSelected.any} onChange={ () =>  this.checkStageBox('any') } />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Any Stage (default)
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={ stagesSelected.any || stagesSelected.incubation } onChange={ () =>  this.checkStageBox('incubation') } />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Incubation
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={ stagesSelected.any || stagesSelected.prototyping } onChange={ () =>  this.checkStageBox('prototyping') } />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Prototyping
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value=""  checked={ stagesSelected.any || stagesSelected.launched } onChange={ () =>  this.checkStageBox('launched') } />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Launched
                    </label>
                  </div>
                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={stagesSelected.any || stagesSelected.cancelled } onChange={ () =>  this.checkStageBox('cancelled') } />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Cancelled
                    </label>
                  </div>
                </div>
              </div>

            {/* Sort by section */}
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
                            <li><a href="#" onClick={ () => this.setFilterText(this.topTypeFilters.pastHour) }>{this.topTypeFilters.pastHour}</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText(this.topTypeFilters.pastDay) }>{this.topTypeFilters.pastDay} (Default)</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText(this.topTypeFilters.pastWeek) }>{this.topTypeFilters.pastWeek}</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText(this.topTypeFilters.pastMonth) }>{this.topTypeFilters.pastMonth}</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText(this.topTypeFilters.pastYear) }>{this.topTypeFilters.pastYear}</a></li>
                            <li><a href="#" onClick={ () => this.setFilterText(this.topTypeFilters.allTime) }>{this.topTypeFilters.allTime}</a></li>
                          </ul>
                        </li>
                        <li><a href="#" onClick={ () => this.setFilterText('Newest') }>Newest</a></li>
                      </ul>
                    </li>
                  </ul>​
                </div>
              </div>


            {/* Implementated section */}
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">

                  <div className="checkbox label-xs-base">
                    <label>
                      <input type="checkbox" value="" checked={implementedFilterSelected} onChange={ () =>  this.toggleImplemented() } />
                      <span className="cr"><i className="cr-icon glyphicon glyphicon-ok" /></span>
                      Only Implemented
                    </label>
                  </div>
                <div className="dropdown-container">
                  <ul className="nav site-nav">
                    <li className={implementedFilterSelected?"flyout":"flyout disabled"}>
                      <a href="#" className="dropdown-title"><span id="selected">{ this.state.filterImplementedText }</span><span>▼</span></a>
                      <ul className="flyout-content sub nav stacked">
                        <li><a href="#" onClick={ () => this.setFilterImplementedText(this.implementedTypeFilters.pastHour) }>{this.implementedTypeFilters.pastHour}</a></li>
                        <li><a href="#" onClick={ () => this.setFilterImplementedText(this.implementedTypeFilters.pastDay) }>{this.implementedTypeFilters.pastDay}</a></li>
                        <li><a href="#" onClick={ () => this.setFilterImplementedText(this.implementedTypeFilters.pastWeek) }>{this.implementedTypeFilters.pastWeek}</a></li>
                        <li><a href="#" onClick={ () => this.setFilterImplementedText(this.implementedTypeFilters.pastMonth) }>{this.implementedTypeFilters.pastMonth}</a></li>
                        <li><a href="#" onClick={ () => this.setFilterImplementedText(this.implementedTypeFilters.pastYear) }>{this.implementedTypeFilters.pastYear}</a></li>
                        <li><a href="#" onClick={ () => this.setFilterImplementedText(this.implementedTypeFilters.allTime) }>{this.implementedTypeFilters.allTime} (Default)</a></li>
                      </ul>  
                    </li>
                  </ul>​
                </div>
              </div>

              
            {/* Votes Section */}
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <VotesFilterSection min={this.state.votesMin} max={this.state.votesMax} changeMin={(value) => this.changeVotesMin(value)} changeMax={(value) => this.changeVotesMax(value) } />
              </div>
              
            {/* Profit Section */}
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <ProfitFilterSection min={this.state.profitMin} max={this.state.profitMax}  changeMin={(value) => this.changeProfitMin(value) } changeMax={(value) => this.changeProfitMax(value)} />
              </div>
            </div>
            

            {/* Base Section */}
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
