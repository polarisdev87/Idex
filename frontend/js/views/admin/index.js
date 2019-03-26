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

import {
  fetchIdeasForBubbleGraph,
  setStartDate,
  setEndDate,
  toggleFilterFullPartialAdmin,
  setMinVotesRange,
  setMaxVotesRange,
  setMinProfitRange,
  setMaxProfitRange,
  setMinImplementationRange,
  setMaxImplementationRange
} from '../../actions/admin';
import AddIdeaModal from '../../components/modals/AddIdeaModal';


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

  constructor(props) {
    super(props);
    this.displayIdea = this.displayIdea.bind(this);
    this.modalIdea = null;
  }

  state = {
    tags: [],
    isOpen: false,
  };


  componentDidMount() {
    const { dispatch } = this.props;
    this.modalIdea = null;
    this.type = 'view'; // 'add', 'edit' not being used
  }


  handleIdea(idea) {
    const { dispatch } = this.props;
    const errorMessage = this.validateIdea(idea);
    console.log('error message ===> ', errorMessage);
    this.modalIdea = null;
    this.setState({ isOpen: false });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  validateIdea(idea) {
    let errorMessage = '';
    if (idea.title.length === 0) {
      errorMessage += 'Title must be required.\n';
    }

    if (idea.description.length === 0) {
      errorMessage += 'Description must be required.\n';
    }

    if (idea.stage.length === 0) {
      errorMessage += 'Stage must be required.\n';
    }

    if (idea.expectedCostInCents.length === 0) {
      errorMessage += 'ExpectedCostInCents must be required.\n';
    }

    if (idea.expectedTtm.length === 0) {
      errorMessage += 'ExpectedTtm must be required.\n';
    }

    if (idea.expectedProfitInCents.length === 0) {
      errorMessage += 'ExpectedProfitInCents must be required.\n';
    }

    if (idea.tags.length === 0) {
      errorMessage += 'Tags must be required.\n';
    }

    if (errorMessage.endsWith('\n')) {
      errorMessage = errorMessage.substr(0, errorMessage.length - 1);
    }

    return errorMessage;
  }


  viewIdeaClickHandler(idea) {
    this.modalIdea = idea;
    this.type = 'view';
    console.log('view type ===>', this.type);
    this.setState({
      isOpen: true,
    });
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


  handleChange(date) {
    const { dispatch } = this.props;
    dispatch(setStartDate(date));
  }

  handleChangeOfaxis(date) {
    const { dispatch } = this.props;
    dispatch(setEndDate(date));
  }

  applyFilters() {
    const {
      partialFullSwitch,
      submittedAtMsMin,
      submittedAtMsMax,
      minVotesRange,
      maxVotesRange,
      minProfitRange,
      maxProfitRange,
      minImplementationRange,
      maxImplementationRange,
      dispatch,
    } = this.props;

    const {
      tags,
    } = this.state;

    dispatch(fetchIdeasForBubbleGraph(
      submittedAtMsMin,
      submittedAtMsMax,
      minVotesRange,
      maxVotesRange,
      minProfitRange,
      maxProfitRange,
      minImplementationRange,
      maxImplementationRange,
      tags,
      partialFullSwitch
    ));
  }


  calculateIncrement(minValue, maxValue, intervals) {
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
    const increment = result * Math.pow(10, selectedPower);

    // make min and max value be multiple of increment


    let max = maxValue;
    if (max % increment) {
      max = (Math.floor(max / increment) + 1) * increment;
    }

    let min = minValue;
    if (min % increment) {
      min = (Math.floor(min / increment)) * increment;
    }

    return {
      max,
      min,
      increment,
    };
  }


  calculateMagnitude(range) {
    let maxLimit = range.max;
    const minLimit = range.min;

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

    const result  = this.calculateIncrement(baseMin, baseMax, 5);
    return result;
  }

  prepareOptions(ideasSummary) {
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
      onClick: this.displayIdea,
    };
    return defaultOption;
  }


  onPartialFullToggle() {
    const { dispatch } = this.props;
    dispatch(toggleFilterFullPartialAdmin());
  }


  setMinVotesRange(event) {
    const { dispatch } = this.props;
    dispatch(setMinVotesRange(event.target.value));
  }

  setMaxVotesRange(event) {
    const { dispatch } = this.props;
    dispatch(setMaxVotesRange(event.target.value));
  }

  setMinProfitRange(event) {
    const { dispatch } = this.props;
    dispatch(setMinProfitRange(event.target.value));
  }

  setMaxProfitRange(event) {
    const { dispatch } = this.props;
    dispatch(setMaxProfitRange(event.target.value));
  }

  setMinImplementationRange(event) {
    const { dispatch } = this.props;
    dispatch(setMinImplementationRange(event.target.value));
  }

  setMaxImplementationRange(event) {
    const { dispatch } = this.props;
    dispatch(setMaxImplementationRange(event.target.value));
  }

  /**
   * on this method this is chart
   */

  displayIdea(clickEvent, chartElement) {
    const chartGraph = chartElement[0]._chart;

    const { ideasSummary } = this.props;
    const element = chartGraph.getElementAtEvent(clickEvent);

    // If you click on at least 1 element ...
    if (element.length > 0) {
      // Logs it

      // Here we get the data linked to the clicked bubble ...
      const datasetLabel = chartGraph.config.data.datasets[element[0]._datasetIndex].label;
      // data gives you `x`, `y` and `r` values
      const data = chartGraph.config.data.datasets[element[0]._datasetIndex].data[element[0]._index];


      const idea = ideasSummary.items.filter(element => element.id == datasetLabel)[0].ideas[0];
      this.viewIdeaClickHandler(idea);
    }
  }


  render() {
    const {
      ideasSummary,
      bubbleData,
      partialFullSwitch,
      startDate,
      endDate,
      minVotesRange,
      maxVotesRange,
      minProfitRange,
      maxProfitRange,
      minImplementationRange,
      maxImplementationRange,
    } = this.props;

    const { isOpen } = this.state;

    const defaultOption = this.prepareOptions(ideasSummary);

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
                <TagSection
                  partialFullSwitch={partialFullSwitch}
                  tags={this.state.tags}
                  handleTagsChange={(tags) => this.handleTagsChange(tags)}
                  addTag={(tag) => this.addTag(tag)}
                  onPartialFullToggle={() => this.onPartialFullToggle()}
                />
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
                          selected={startDate}
                          onChange={(date) => this.handleChange(date)}
                        />
                      </div>
                      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 label-base-base to-col-item">
                        To
                      </div>
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <DatePicker
                          selected={endDate}
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
                        <input
                          type="text" className="form-control data-section-input" placeholder="Minimum" value={minVotesRange}
                          onChange={(x) => { this.setMinVotesRange(x); }}
                        />
                      </div>
                      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 label-base-base to-col-item">
                        To
                      </div>
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <input
                          type="text" className="form-control data-section-input" placeholder="Maximum" value={maxVotesRange}
                          onChange={(x) => { this.setMaxVotesRange(x); }}
                        />
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
                        <input
                          type="text" className="form-control data-section-input" placeholder="Minimum" value={minProfitRange}
                          onChange={(x) => { this.setMinProfitRange(x); }}
                        />
                      </div>
                      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 label-base-base to-col-item">
                        To
                      </div>
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <input
                          type="text" className="form-control data-section-input" placeholder="Maximum" value={maxProfitRange}
                          onChange={(x) => { this.setMaxProfitRange(x); }}
                        />
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
                        <input
                          type="text" className="form-control data-section-input" placeholder="Minimum" value={minImplementationRange}
                          onChange={(x) => { this.setMinImplementationRange(x); }}
                        />
                      </div>
                      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 label-base-base to-col-item">
                        To
                      </div>
                      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-item">
                        <input
                          type="text" className="form-control data-section-input" placeholder="Maximum" value={maxImplementationRange}
                          onChange={(x) => { this.setMaxImplementationRange(x); }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section2">
              <Bubble
                data={bubbleData}
                options={defaultOption}
              />
            </div>
            <div>
              <AddIdeaModal
                isOpen={isOpen} idea={this.modalIdea} type={this.type}
                handleIdea={(idea, type) => this.handleIdea(idea, type)}
                close={() => this.closeModal()}
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
    minVotesRange: state.admin.minVotesRange,
    maxVotesRange: state.admin.maxVotesRange,
    minProfitRange: state.admin.minProfitRange,
    maxProfitRange: state.admin.maxProfitRange,
    minImplementationRange: state.admin.minImplementationRange,
    maxImplementationRange: state.admin.maxImplementationRange,
    tags: state.admin.tags,
    ideasSummary: state.admin.ideasSummary,
    bubbleData: state.admin.bubbleData,
    startDate: state.admin.startDate,
    endDate: state.admin.endDate,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
