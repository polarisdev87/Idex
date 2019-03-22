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
      dispatch,
    } = this.props;

    const {
      tags,
    } = this.state;

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


  prepareGraph(ideasSummary, radiusUnit) {

    console.log("prepareGraph");
    console.log(ideasSummary);
    /* Build bubbleData from ideasSummary

    x-axis : implementation Months
    y-axis : profit range
    size : votes range
    color : first tag

    */

    let bubbleDataNew = {
      labels: '',
      datasets: [

      ],
    };

    for (const bubbleIdeaIndex in ideasSummary.items) {
      const bubbleIdea = ideasSummary.items[bubbleIdeaIndex];
      bubbleDataNew.datasets.push({
        ...defaultConfig,
        ...{
          data: [
            { x: bubbleIdea.expectedTtm, y: bubbleIdea.expectedProfitInCents, r: (bubbleIdea.votes + 1) * radiusUnit },
          ],
          backgroundColor: this.getColor(0),
          borderColor: this.getColor(0),
          pointBorderColor: this.getColor(0),
        },
      });
    }

    console.log(bubbleDataNew);


    return bubbleDataNew;


}


  getRadiusUnit(ideasSummary) {
    // define biggestBubble as 1/6 of width
    const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const biggestBubble = viewPortWidth / 16;

    let maxSize = 1;
    for (const bubbleIdeaIndex in ideasSummary.items) {
      const bubbleIdea = ideasSummary.items[bubbleIdeaIndex];
      maxSize = Math.max(maxSize, bubbleIdea.votes + 1);
    }

    return biggestBubble / maxSize;
  }


  calculateIncrement(minValue, maxValue, intervals) {
    console.log("calculateIncrement");
    const toConvert = (maxValue - minValue) / intervals;


    const selectedPower = Math.round(Math.log10(toConvert));
    const standarized = toConvert / Math.pow(10, selectedPower);
    let result = 0;
    if (standarized <= 0.1) {
      result = 0.1;
    } else if (standarized <= 0.2) {
      result = 0.2;
    } else if (standarized <= 0.5) {
      result = 0.5;
    } else if (standarized <= 1) {
      result = 1;
    } else if (standarized <= 2) {
      result = 2;
    } else if (standarized <= 5) {
      result = 5;
    } else {
      result = 10;
    }
    let increment = result * Math.pow(10, selectedPower);
    console.log("increment");
    console.log(increment);

    // make min and max value be multiple of increment


    let max = maxValue;
    if (max % increment) {
      max = (Math.floor(max / increment) + 1) * increment;
    }

    let min = minValue;
    if (min % increment) {
      min = (Math.floor(min / increment)) * increment;
    }
    console.log("min and max");
    console.log(min);
    console.log(max);

    return {max: max,
        min: min,
        increment: increment};

  }


  calculateMagnitude(range) {

    console.log("calculateMagnitude");
    let maxLimit = range.max;
    let minLimit = range.min;

    if (maxLimit == 0) {
      return {
        min: 0,
        max: 100,
      };
    }
    if (maxLimit == minLimit) {
      maxLimit++;
    }
    const selectedPower = Math.floor(Math.log10(maxLimit - minLimit) - 1);

    let baseMax = Math.floor(maxLimit / Math.pow(10, selectedPower)) + 1; // move base to 2 digits numbers
    let baseMin = Math.floor(minLimit / Math.pow(10, selectedPower)) - 1; // move base to 2 digits numbers

    baseMin *= Math.pow(10, selectedPower); // restore original magnitude
    baseMax *= Math.pow(10, selectedPower); // restore original magnitude

    console.log(range);
    console.log(baseMin);
    console.log(baseMax);

    const result  = this.calculateIncrement(baseMin, baseMax, 5);
    return result;

  }

  prepareOptions(ideasSummary) {
      console.log("prepareOptions");
    let maxX = 0;
    let maxY = 0;
    let minX = 99999999;
    let minY = 99999999;
    // find min and max of x and y
    for (const bubbleIdeaIndex in ideasSummary.items) {
      const bubbleIdea = ideasSummary.items[bubbleIdeaIndex];
      maxX = Math.max(maxX, bubbleIdea.expectedTtm);
      maxY = Math.max(maxY, bubbleIdea.expectedProfitInCents);
      minX = Math.min(minX, bubbleIdea.expectedTtm);
      minY = Math.min(minY, bubbleIdea.expectedProfitInCents);
    }

    const maxWidth = maxX - minX;
    const maxHeight = maxY - minY;


    minX -= maxWidth / 4;
    maxX += maxWidth / 4;

    minY -= maxHeight / 4;
    maxY += maxHeight / 4;

    console.log("minX, maxX, minY, maxY");
    console.log(minX);
    console.log(maxX);
    console.log(minY);
    console.log(maxY);

    // define magnitude (1, 2, 5, 10, 100, 1000, ...)
    const widthRange = this.calculateMagnitude({ min: minX, max: maxX });

    const heightRange = this.calculateMagnitude({ min: minY, max: maxY });


    const defaultOption = {
      legend: { display: false },
      scales: {
        yAxes: [{
          ticks: {
            min: heightRange.min,
            max: heightRange.max,
            stepSize: heightRange.increment,
          },
        }],
        xAxes: [{
          ticks: {
            min: widthRange.min,
            max: widthRange.max,
            stepSize: widthRange.increment,
          },
        }],
      },
    };

    return defaultOption;
  }


  render() {
    const { bubbleData } = this.state;
    const { ideasSummary } = this.props;


    const defaultOption = this.prepareOptions(ideasSummary);
    console.log("admin.render() defaultOption");
    console.log(defaultOption);
    let bubbleDataNew = this.prepareGraph(ideasSummary, this.getRadiusUnit(ideasSummary));
    console.log("admin.render() bubbleDataNew");
    console.log(bubbleDataNew);

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
                options={defaultOption}
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
