import chroma from 'chroma-js';

import {
  GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_REQUEST,
  GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_SUCCESS,
  GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_FAILURE,
  TOGGLE_FILTER_FULL_PARTIAL_ADMIN,
  SET_START_DATE_ADMIN,
  SET_END_DATE_ADMIN,
  SET_MIN_VOTES_RANGE_ADMIN,
  SET_MAX_VOTES_RANGE_ADMIN,
  SET_MIN_PROFIT_RANGE_ADMIN,
  SET_MAX_PROFIT_RANGE_ADMIN,
  SET_MIN_IMPLEMENTATION_RANGE_ADMIN,
  SET_MAX_IMPLEMENTATION_RANGE_ADMIN,
  GET_POPULAR_TAGS_REQUEST,
  GET_POPULAR_TAGS_SUCCESS,
  GET_POPULAR_TAGS_FAILURE,
  SET_GRAPH_IDEAS_TO_SHOW,
  SET_GRAPH_CURRENT_IDEA,
} from '../actions/admin';

const moment = require('moment');


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

function getColorList(tagsCount) {
  const colorList = chroma.bezier(['#ffd54f', '#aed581'])
    .scale()
    .colors(tagsCount);
  console.log('colorList');
  console.log(colorList);
  return colorList;
}

function getColor(tag, tagColorMap) {
  return tagColorMap.get(tag);
}


function getRadiusUnit(ideasSummary) {
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

function generateTagColorMap(items) {
  const tagColorMapArray = items.map(item => item.category);
  const distinctTagColorMapArray = [...new Set(tagColorMapArray)];
  const colorArray = getColorList(distinctTagColorMapArray.length + 1);
  const result = new Map();
  for (let i = 0; i < distinctTagColorMapArray.length; i++) {
    result.set(distinctTagColorMapArray[i], colorArray[i]);
  }
  result.set(null, colorArray[colorArray.length - 1]);
  return result;
}

function prepareGraph(ideasSummary, radiusUnit) {
  console.log('prepareGraph');
  console.log(ideasSummary);
  /* Build bubbleData from ideasSummary

    x-axis : implementation Months
    y-axis : profit range
    size : votes range
    color : category (main tag)

    */

  const bubbleDataNew = {
    labels: '',
    datasets: [

    ],
  };


  const tagColorMap = generateTagColorMap(ideasSummary.items);

  for (const bubbleIdeaIndex in ideasSummary.items) {
    const bubbleIdea = ideasSummary.items[bubbleIdeaIndex];
    console.log('bubbleIdea');
    console.log(bubbleIdea);
    bubbleDataNew.datasets.push({
      ...defaultConfig,
      ...{
        data: [
          { x: bubbleIdea.expectedTtm, y: bubbleIdea.expectedProfitInCents, r: (bubbleIdea.votes + 1) * radiusUnit },
        ],
        backgroundColor: getColor(bubbleIdea.category, tagColorMap),
        borderColor: getColor(bubbleIdea.category, tagColorMap),
        pointBorderColor: getColor(bubbleIdea.category, tagColorMap),
        label: bubbleIdea.id,
      },
    });
  }
  return bubbleDataNew;
}


export function admin(state = {
  isFetchingIdeas: false,
  isFetchingComments: false,
  ideasSummary: {
    dimensionNames: ['ttm', 'profit', 'votes', 'tag'],
    items: [],
  },
  ideasToShow : [],
  bubbleData: {
    labels: '',
    datasets: [

    ],
  },
  ideasErrorMessage: undefined,
  partialFullSwitch: true,
  submittedAtMsMin: moment().utc().set({
    hour: 0, minute: 0, second: 0, millisecond: 0,
  }).valueOf(),
  submittedAtMsMax: moment().utc().set({
    hour: 0, minute: 0, second: 0, millisecond: 0,
  }).add(1, 'day').add(-1, 'milliseconds')
    .valueOf(),
  tags: [],
  minVotesRange: 0,
  maxVotesRange: 999999,
  minProfitRange: 0,
  maxProfitRange: 999999,
  minImplementationRange: 0,
  maxImplementationRange: 999999,
  startDate: moment(),
  endDate: moment(),
  popularTags: [],
  isFetchingpPopularTags: false,
  popularTagsErrorMessage: undefined,
  currentIdea: {},
}, action) {
  console.log('admin reducer');
  console.log(action.type);
  switch (action.type) {
    case GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_REQUEST:
      return Object.assign({}, state, {
        isFetchingIdeas: true,
      });
    case GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_SUCCESS:
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasSummary: action.ideasSummary,
        ideasErrorMessage: undefined,
        bubbleData: prepareGraph(action.ideasSummary, getRadiusUnit(action.ideasSummary)),
      });
    case GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_FAILURE:
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasErrorMessage: action.message,
        ideasSummary: {
          dimensionNames: ['ttm', 'profit', 'votes', 'tag'],
          items: [],
        },
      });
    case TOGGLE_FILTER_FULL_PARTIAL_ADMIN: {
      return Object.assign({}, state, {
        partialFullSwitch: !state.partialFullSwitch,
      });
    }
    case SET_START_DATE_ADMIN: {
      return Object.assign({}, state, {
        submittedAtMsMin: moment(action.date).utc().set({
          hour: 0, minute: 0, second: 0, millisecond: 0,
        }).valueOf(),
        startDate: action.date,
      });
    }
    case SET_END_DATE_ADMIN: {
      return Object.assign({}, state, {
        submittedAtMsMax: moment(action.date).utc().set({
          hour: 0, minute: 0, second: 0, millisecond: 0,
        }).add(1, 'day').add(-1, 'milliseconds')
          .valueOf(),
        endDate: action.date,
      });
    }
    case SET_MIN_VOTES_RANGE_ADMIN: {
      return Object.assign({}, state, {
        minVotesRange: action.value,
      });
    }
    case SET_MAX_VOTES_RANGE_ADMIN: {
      return Object.assign({}, state, {
        maxVotesRange: action.value,
      });
    }
    case SET_MIN_PROFIT_RANGE_ADMIN: {
      return Object.assign({}, state, {
        minProfitRange: action.value,
      });
    }
    case SET_MAX_PROFIT_RANGE_ADMIN: {
      return Object.assign({}, state, {
        maxProfitRange: action.value,
      });
    }
    case SET_MIN_IMPLEMENTATION_RANGE_ADMIN: {
      return Object.assign({}, state, {
        minImplementationRange: action.value,
      });
    }
    case SET_MAX_IMPLEMENTATION_RANGE_ADMIN: {
      return Object.assign({}, state, {
        maxImplementationRange: action.value,
      });
    }
    case GET_POPULAR_TAGS_REQUEST:
      return Object.assign({}, state, {
        isFetchingpPopularTags: true,
      });
    case GET_POPULAR_TAGS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingpPopularTags: false,
        popularTags: action.popularTags,
        popularTagsErrorMessage: undefined,
      });
    case GET_POPULAR_TAGS_FAILURE:
      return Object.assign({}, state, {
        isFetchingpPopularTags: false,
        popularTagsErrorMessage: action.message,
        popularTags: [],
      });
    case SET_GRAPH_IDEAS_TO_SHOW:
        return Object.assign({}, state, {
            ideasToShow: action.ideas,
          });
    case SET_GRAPH_CURRENT_IDEA:
        return Object.assign({}, state, {
            currentIdea: action.idea,
          });
    default:
      return state;
  }
}

