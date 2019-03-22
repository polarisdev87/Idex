// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePicker from 'react-datepicker';
import { Bubble } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import InfoBox from '../../components/InfoBox';
import TagSection from '../../components/tags/TagSection';
import { fetchIdeasForBubbleGraph } from '../../actions/admin';


const defaultConfig = {
  label: '',
  fill: true,
  lineTension: 0.1,
  backgroundColor: 'rgba(0, 0, 0 ,0)',
  borderColor: 'rgba(0, 0, 0 ,0)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(0, 0, 0 ,0)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(0, 0, 0 ,0)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  data: [],
};

const deafultOption = {
  legend: { display: false },
  scales: {
    yAxes: [{
      ticks: {
        min: 0,
        max: 100,
        stepSize: 20,
      },
    }],
    xAxes: [{
      ticks: {
        min: 0,
        max: 100,
        stepSize: 20,
      },
    }],
  },
};

class Admin extends Component {
      props: props;

  state = {
    startDate: moment(),
    startDateOfaxis: moment(),
    bubbleData: {
      labels: '',
      datasets: [
        {
          ...defaultConfig,
          ...{
            data: [
              { x: 10, y: 20, r: 15 },
            ],
            backgroundColor: this.getColor(0),
            borderColor: this.getColor(0),
            pointBorderColor: this.getColor(0),
          },
        },
        {
          ...defaultConfig,
          ...{
            data: [
              { x: 55, y: 70, r: 30 },
            ],
            backgroundColor: this.getColor(1),
            borderColor: this.getColor(1),
            pointBorderColor: this.getColor(1),
          },
        },
        {
          ...defaultConfig,
          ...{
            data: [
              { x: 30, y: 50, r: 60 },
            ],
            backgroundColor: this.getColor(2),
            borderColor: this.getColor(2),
            pointBorderColor: this.getColor(2),
          },
        },
        {
          ...defaultConfig,
          ...{
            data: [
              { x: 20, y: 80, r: 40 },
            ],
            backgroundColor: this.getColor(3),
            borderColor: this.getColor(3),
            pointBorderColor: this.getColor(3),
          },
        },
      ],
    },
    tags: [],
  };


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


  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  handleChangeOfaxis(date) {
    this.setState({
      startDateOfaxis: date,
    });
  }

  getColor(index) {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      if (i < 2) {
        color += letters[((i * index) + 5) % 16];
      } else if (i < 4) {
        color += letters[((i * index) + 7) % 16];
      } else {
        color += letters[((i * index) + 9) % 16];
      }
    }
    return color;
  }

  applyFilters() {
    const {
      partialFullSwitch,
      submittedAtMsMin,
      submittedAtMsMax,
      votesMin,
      votesMax,
      profitMin,
      profitMax,
      implementationTimeMsMin,
      implementationTimeMsMax,
      tags,
      dispatch,
    } = this.props;

    dispatch(fetchIdeasForBubbleGraph(
      submittedAtMsMin,
      submittedAtMsMax,
      votesMin,
      votesMax,
      profitMin,
      profitMax,
      implementationTimeMsMin,
      implementationTimeMsMax,
      tags,
      partialFullSwitch
    ));
  }


  prepareGraph(ideasSummary, ratioUnit) {
    /* Build bubbleData from ideasSummary

    x-axis : implementation Months
    y-axis : profit range
    size : votes range
    color : first tag

    */

    const bubbleDataNew = {
      labels: '',
      datasets: [

      ],
    };

    console.log('ideasSummary');
    console.log(ideasSummary);
    for (const bubbleIdeaIndex in ideasSummary.items) {
      const bubbleIdea = ideasSummary.items[bubbleIdeaIndex];
      bubbleDataNew.datasets.push({
        ...defaultConfig,
        ...{
          data: [
            { x: bubbleIdea.expectedTtm, y: bubbleIdea.expectedProfitInCents, r: (bubbleIdea.votes + 1) * ratioUnit },
          ],
          backgroundColor: this.getColor(0),
          borderColor: this.getColor(0),
          pointBorderColor: this.getColor(0),
        },
      });
    }
    return bubbleDataNew;
  }


  getRatioUnit(ideasSummary) {
    const biggestBubble = 60;

    let maxSize = 1;
    for (const bubbleIdeaIndex in ideasSummary.items) {
      const bubbleIdea = ideasSummary.items[bubbleIdeaIndex];
      maxSize = Math.max(maxSize, bubbleIdea.votes + 1);
    }

    return biggestBubble / maxSize;
  }

  prepareOptions(ideasSummary) {

    let maxX = 0;
    let maxY = 0;
    let maxSize = 1;
    for (const bubbleIdeaIndex in ideasSummary.items) {
      const bubbleIdea = ideasSummary.items[bubbleIdeaIndex];
      maxX = Math.max(maxX, bubbleIdea.expectedTtm);
      maxY = Math.max(maxY, bubbleIdea.expectedProfitInCents);
      maxSize = Math.max(maxSize, bubbleIdea.votes + 1);
    }

    maxY = (maxY + 1) * 1.2;
    maxX = (maxX + 1) * 1.2;
    const deafultOption = {
      legend: { display: false },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: maxY,
            stepSize: maxY / 5,
          },
        }],
        xAxes: [{
          ticks: {
            min: 0,
            max: maxX,
            stepSize: maxX / 5,
          },
        }],
      },
    };
    return deafultOption;
  }


  render() {
    console.log('Admin.render()');
    const { bubbleData } = this.state;
    console.log(bubbleData);
    console.log(this.props);
    const { ideasSummary } = this.props;
    console.log(ideasSummary);


    const deafultOption = this.prepareOptions(ideasSummary);
    const bubbleDataNew = this.prepareGraph(ideasSummary,this.getRatioUnit(ideasSummary));

    return (
      <div className="container admin-container">
        {/* header - boxes */ }
        <div className="info-container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <InfoBox index={0} ideaNum={121} />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <InfoBox index={1} ideaNum={121} />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <InfoBox index={2} ideaNum={121} />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <InfoBox index={3} ideaNum={121} />
            </div>
          </div>
        </div>
        <div className="main-container shadow">
          {/* header - filter */ }
          <div className="header">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="label-base-base">Ideas Statistics</div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 filter-btn">
                <button
                  type="button" className="btn btn-link base-btn" onClick={(x) =>
                    this.applyFilters()}
                >Filter Ideas
                </button>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="section1">
              <div className="tag-section">
                <TagSection tags={this.state.tags} handleTagsChange={(tags) => this.handleTagsChange(tags)} addTag={(tag) => this.addTag(tag)} />
              </div>
              <div className="date-section">
                <div className="row row-item">
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 label-base-base title-label">
                        Submission Date:
                      </div>
                    </div>
                    <div className="row row-content">
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={(date) => this.handleChange(date)}
                        />
                      </div>
                      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 label-base-base to-col-item">
                        To
                      </div>
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <DatePicker
                          selected={this.state.startDateOfaxis}
                          onChange={(date) => this.handleChangeOfaxis(date)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 label-base-base title-label">
                        Vote Range (circles size):
                      </div>
                    </div>
                    <div className="row row-content">
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <input type="text" className="form-control data-section-input" placeholder="Minimum" ref={el => { this.minVotesRange = el; }} />
                      </div>
                      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 label-base-base to-col-item">
                        To
                      </div>
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <input type="text" className="form-control data-section-input" placeholder="Minimum" ref={el => { this.maxVotesRange = el; }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row row-item">
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 label-base-base title-label">
                        Profit Range (y-axis):
                      </div>
                    </div>
                    <div className="row row-content">
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <input type="text" className="form-control data-section-input" placeholder="Minimum" ref={el => { this.minProfitRange = el; }} />
                      </div>
                      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 label-base-base to-col-item">
                        To
                      </div>
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <input type="text" className="form-control data-section-input" placeholder="Minimum" ref={el => { this.maxProfitRange = el; }} />
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 label-base-base title-label">
                        Implementation Months (x-axis):
                      </div>
                    </div>
                    <div className="row row-content">
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <input type="text" className="form-control data-section-input" placeholder="Minimum" ref={el => { this.minImplRange = el; }} />
                      </div>
                      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 label-base-base to-col-item">
                        To
                      </div>
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <input type="text" className="form-control data-section-input" placeholder="Minimum" ref={el => { this.maxImplRange = el; }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section2">
              <Bubble
                data={bubbleDataNew}
                options={deafultOption}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('admin/index.js - mapStateToProps');
  console.log(state);
  return {
    partialFullSwitch: state.admin.partialFullSwitch,
    submittedAtMsMin: state.admin.submittedAtMsMin,
    submittedAtMsMax: state.admin.submittedAtMsMax,
    votesMin: state.admin.votesMin,
    votesMax: state.admin.votesMax,
    profitMin: state.admin.profitMin,
    profitMax: state.admin.profitMax,
    implementationTimeMsMin: state.admin.implementationTimeMsMin,
    implementationTimeMsMax: state.admin.implementationTimeMsMax,
    tags: state.admin.tags,
    ideasSummary: state.admin.ideasSummary,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
