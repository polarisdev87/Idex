import React from 'react'
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import Routes from 'routes';
import thunk from 'redux-thunk';
import pipelineApp from './reducers/index'
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-checkbox/dist/js/bootstrap-checkbox';
import 'babel-polyfill';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';


// Load SCSS
import '../scss/app.scss';

const isProduction = process.env.NODE_ENV === 'production';

const translationsObject = {
		  en: {
		    date: {
		      long: 'MMMM Do, YYYY'
		    },
		    ideas: {
		    	filter: {
		    		stage: {
		    			title: 'Stage',
		    			anyStage: 'Any Stage (default)',
		    			incubation: 'Incubation',
		    			Prototyping: 'Prototyping',
		    			Launched: 'Launched',
		    			Cancelled: 'Cancelled',
		    		},
		    		title: 'Filter',
		    		addIdea: 'Add Idea',
		    		sortBy: 'Sort by:',
		    		timeToMarket: 'Time to Market (Months):',
		    		votes: 'Votes:',
		    		profit: 'Profit:',
		    		results: 'Results',
		    		applyFilters: 'Apply Filters',
		    		clearFilters: 'Clear Filters',
		    		min: 'Min',
		    		max: 'Max',
		    	},
		    	item: {
		    		votes: 'Votes',
		    		comments: 'Comments',
		    		cost: 'Cost:',
		    		time: 'Time:',
		    		months: 'Months',
		    		addComment: 'Add Comment',
		    		addAComment: 'Add a Comment .....',
		    		
		    	},
		    	modal: {
		    		viewCommentAttachments: 'View Comment Attachments',
		    		editCommentAttachments: 'Edit Comment Attachments',
		    		title: 'Idea Title',
		    		description: 'Idea Description',
		    		comment: 'Comment',
		    		close: 'Close',
		    		editIdea: 'Edit Idea',
		    		expectedTimeToMarket: 'Expected Time To Market (Months)',
		    		cost: 'Expected Cost to Implement',
		    		profit: 'Expected Profit',
		    		tags: 'Tags' ,
		    		clickTags: '(Click on tag to set as main)',
		    		dropArea: 'Drop files here or click to upload',
		    		finishEdit: 'Edit Idea',
		    		addIdea: 'Add Idea',
		    		finishAdd: 'Add Idea',
		    		finishView: 'Close Idea',
		    		viewIdea: 'View Idea',
		    	}
		    },
		    auth: {
		    	logout: 'Logout',
		    	title: 'Log in to your IDEX Account',
		    	note: 'Your account is your portal to all things!',
		    	login: 'Login',
		    	register: 'Register',
		    	forgot: 'Forgot Password?',
		    	loginButton: 'Login',
		    	firstName: 'First Name',
		    	lastName: 'Last Name',
		    	email: 'Email',
		    	confirmEmail: 'Confirm Email',
		    	userName: 'User Name',
		    	password: 'Password',
		    	confirmPassword: 'Confirm Password',
		    	registerButton: 'Register',
		    	sendConfirmation: 'Send Confirmation',
		    	error: {
		    		notValidEmail: 'Not a Valid email.\n',
		    		notValidLink: 'Not a Valid link.\n',
		    		notValidPassword: 'Not a Valid Password.\n',
		    		passwordsDontMatch: 'Passwords don\'t match.\n',
		    	}
		    },
		    tags: {
		    	selectTags: 'Select Tags:',
		    	topTrendingTags: 'Top Trending Tags:',
		    	searchTags: 'Search tags .....',
		    },
		    admin: {
		    	title: 'Ideas Statistics',
		    	filterIdeas: 'Filter Ideas',
		    	submissionDate: 'Submission Date:',
		    	votes: 'Vote Range (circles size):',
		    	profit: 'Profit Range (y-axis):',
		    	implementation: 'Implementation Months (x-axis):',
		    	to: 'To',
		    	maximum:'Maximum',
		    	minimum:'Minimum',
		    	
		    }
		  }
}




// Creating store
let store = null;

if (isProduction) {
  // In production adding only thunk middleware
  const middleware = applyMiddleware(thunk)(createStore);

  store = createStore(
    pipelineApp,
    middleware
  );
} else {
  // In development mode beside thunk
  // DevTools are added
  const middleware = applyMiddleware(thunk);
  const enhancer = compose(
    middleware,
    // Enable DevTools if browser extension is installed
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
  );
  store = createStore(
    pipelineApp,
    enhancer
  );
}

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale('en'));


ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
