// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import Header from './Header';
import IdeaItem from './IdeaItem';
import AddIdeaModal from '../../components/modals/AddIdeaModal';
import CommentAttachmentsModal from '../../components/modals/CommentAttachmentsModal';
import { updateCommentAttachments } from '../../actions/comments';
import { areAllAttachmentsUploaded } from '../../actions/files';
import { fetchIdeas, addIdea, handleAddIdeaError, updateIdea, handleUpdateIdeaError,
	openIdeaModal, closeIdeaModal,
	openAttachmentModal, closeAttachmentModal} from '../../actions/ideas';
	
	

type Props = {
  dispatch: any;
  ideas: any;
}

class Ideas extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.modalIdea = null;
    this.ideaBeingCommented = null;
    this.modalComment = null;
    this.commentText = null;
    this.type = 'view'; // 'add', 'edit'
    this.commentAttachmentType = "edit"
    dispatch(fetchIdeas());
  }

  props: Props;

  handleIdea(idea, type) {
    const { dispatch } = this.props;
    const errorMessage = this.validateIdea(idea);
    console.log('error message ===> ', errorMessage);
    if (type === 'edit') {
      if (errorMessage.length > 0) {
        dispatch(handleUpdateIdeaError(errorMessage));
        alert(errorMessage);
        return;
      }
      dispatch(updateIdea(idea));
    } else if (type === 'add') {
      if (errorMessage.length > 0) {
        dispatch(handleAddIdeaError(errorMessage));
        alert(errorMessage);
        return;
      }
      dispatch(addIdea(idea));
    }
    this.modalIdea = null;
    this.ideaBeingCommented = null;
    this.modalComment = null;
    dispatch(closeIdeaModal());
  }

  
  handleCommentAttachments(idea, type, comment) {
	    console.log('handleCommentAttachments(...)');
	    console.log(idea);
	    const { dispatch } = this.props;
	    if (type === 'edit') {
	      dispatch(updateCommentAttachments(idea.id));
	    }
	    this.modalComment = null;
	    dispatch(closeAttachmentModal());
	  }
  
  
  closeModal() {
	    const { dispatch } = this.props;
	    dispatch(closeIdeaModal());
  }

  closeAttachmentsModal() {
	    const { dispatch } = this.props;
	    dispatch(closeAttachmentModal());
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

    // TODO: make a retry behavior when finishing editing or adding ideas
    if (!areAllAttachmentsUploaded(idea)) {
      errorMessage += 'Wait until all attachments are uploaded.\n';
    }
    if (errorMessage.endsWith('\n')) {
      errorMessage = errorMessage.substr(0, errorMessage.length - 1);
    }

    return errorMessage;
  }


  addCommentAttachmentsButtonClickHandler(idea, commentText) {
	  const {dispatch} = this.props;
	    this.ideaBeingCommented = idea;
	    this.modalComment = null;
	    this.commentText = commentText;
	    this.commentAttachmentType = 'edit';
	    dispatch(openAttachmentModal());
  }
  
  viewCommentAttachmentsButtonClickHandler(idea,comment) {
	  const {dispatch} = this.props;
	    this.ideaBeingCommented = idea;
	    this.modalComment = comment;
	    this.commentAttachmentType = 'view';
	    dispatch(openAttachmentModal());
  }
  
  addIdeaButtonClickHandler() {
	const {dispatch} = this.props;
    this.modalIdea = null;
    this.ideaBeingCommented = null;
    this.type = 'add';
    dispatch(openIdeaModal());
  }

  editIdeaButtonClickHandler(idea) {
	  const {dispatch} = this.props;
    this.modalIdea = idea;
    this.ideaBeingCommented = null;
    this.type = 'edit';
    dispatch(openIdeaModal());
  }

  viewIdeaClickHandler(idea) {
	  const {dispatch} = this.props;
    this.modalIdea = idea;
    this.ideaBeingCommented = null;
    this.type = 'view';
    dispatch(openIdeaModal());
  }

  render() {
    const { isOpen, isOpenAttachments } = this.props;
    const {
      ideas: {
        ideasErrorMessage,
        isFetchingIdeas,
        commentsErrorMessage,
        isFetchingComments,
        partialFullSwitch,
      },
      ideasArr,
    } = this.props;
    const numIdeas = typeof ideasArr !== 'undefined' ? ideasArr.length : 0;
    const renderIdeaItems = (!isFetchingIdeas && ideasArr !== undefined && ideasArr.length !== 0) ?
      ideasArr.map(item => (
        <IdeaItem
          key={item.id}
          idea={item}
          liked={item.userSession.liked}
          votes= {item.votes}
          editable= {item.userSession.editable}
          edit={() => this.editIdeaButtonClickHandler(item)}
          view={() => this.viewIdeaClickHandler(item)}
          addCommentAttachments={(commentText) => this.addCommentAttachmentsButtonClickHandler(item, commentText)}
          viewCommentAttachments={(comment) => this.viewCommentAttachmentsButtonClickHandler(item,comment)}
        />
      )) :
      null;

    return (
      <div className="container">
        <div className="ideas-container">
        
          <Header
            addIdeaButtonClick={() => this.addIdeaButtonClickHandler()}
            fetchIdeas={(
              filter, stages, submittedAtMsMin, submittedAtMsMax,
              votesMin, votesMax, profitMin, profitMax, implementationTimeMsMin,
              implementationTimeMsMax, tags,
            ) => this.props.dispatch(fetchIdeas(
              filter, stages, submittedAtMsMin, submittedAtMsMax,
              votesMin, votesMax, profitMin, profitMax, implementationTimeMsMin,
              implementationTimeMsMax, tags, partialFullSwitch,
            ))}
            numIdeas={numIdeas}
          />
          {renderIdeaItems}
        </div>
        <AddIdeaModal
          isOpen={isOpen} idea={this.modalIdea} type={this.type}
          handleIdea={(idea, type) => this.handleIdea(idea, type)}
          close={() => this.closeModal()}
        />
        <CommentAttachmentsModal
          isOpen={isOpenAttachments} 
          idea={this.ideaBeingCommented} 
          comment = {this.modalComment}
          commentText = {this.commentText}
          type={this.commentAttachmentType}
          handleCommentAttachments={(idea, type) => this.handleCommentAttachments(idea, type)}
          close={() => this.closeAttachmentsModal()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ideas: state.ideas,
    ideasArr: state.ideas.ideasArr,
    ideaToAdd: state.ideas.ideaToAdd,
    isOpen: state.ideas.isOpen,
    isOpenAttachments: state.ideas.isOpenAttachments,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ideas);
