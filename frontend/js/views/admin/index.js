// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import InfoBox from '../../components/InfoBox';
import TagSection from '../../components/tags/TagSection';
import { Bubble } from 'react-chartjs-2';

import 'react-datepicker/dist/react-datepicker.css';

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
        stepSize: 20
      }
    }],
    xAxes: [{
      ticks: {
        min: 0,
        max: 100,
        stepSize: 20
      }
    }],
  }
};

class Admin extends Component {

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
          }
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
          }
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
          }
        },
      ],
    }
  };

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

  render() {
    const { bubbleData } = this.state;
    console.log(bubbleData);
    return (
      <div className="container admin-container">
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
          <div className="header">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="label-base-base">Ideas Statistics</div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 filter-btn">
                <button type="button" className="btn btn-link base-btn">Filter Ideas</button>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="section1">
              <div className="tag-section">
                <TagSection />
              </div>
              <div className="date-section">
                <div className="row row-item">
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 label-base-base title-label">
                        Time range:
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
                        Votes range (size of circles):
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
                        Profit range (y-axis):
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
                        Implementation time range (x-axis):
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
                </div>
              </div>
            </div>
            <div className="section2">
              <Bubble
                data={bubbleData}
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
  return {};
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
