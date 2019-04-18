// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Alert } from 'react-bootstrap';
import * as moment from 'moment';
import StageMark from '../../components/StageMark';
import Comment from './Comment';
import CircleIconButton from '../../components/buttons/CircleIconButton';
import { addComment, toggleAnonymous } from '../../actions/comments';
import { toggleVote } from '../../actions/ideas';
import { areAllAttachmentsUploaded } from '../../actions/files';


type Props = {
  idea: {
    id: number,
    title: string,
    description: string,
    stage: string,
    submittedBy: Date,
    submittedAt: Date,
    updatedAt: Date,
    expectedCostInCents: number,
    expectedTtm: number,
    tags: [],
    category: string,
    mainTag: number,
    comments: [],
    votes: number,
    userSession: any,
  },
  vote: () => {},
  edit: () => {},
  view: () => {},
}

class IdeaItem extends Component {
  props: Props;

  handleAddCommentKeyPress = e => {
    if (e.key === 'Enter') {
      const { dispatch, idea, commentsToAdd } = this.props;
      console.log("IdeaItem.handleAddCommentKeyPress");
      console.log(idea);
      let files = [];
      let comment = {
    	        ideaId: idea.id,
    	        text: e.target.value,
    	        sumittedBy: '',
    	        submittedAt: '',
    	        anonymous: idea.anonymousMode,
    	      }; 
      const index = commentsToAdd.findIndex(x => x.ideaId === idea.id);
      if (index != -1) {
    	  files = commentsToAdd[index].files;
   	  };
   	  comment.files = files;
   	  if (!areAllAttachmentsUploaded(comment)) {
   		  alert("wait until all attachments are uploaded");
   	  } else {
   	      dispatch(addComment(comment));
   	      this.commentInput.value = '';
   	  }
   	  
    }
  }

    handleToggleAnonymous = e => {
      const { dispatch,idea } = this.props;
      dispatch(toggleAnonymous(idea.id));
    }

    handleToggleVote = e => {
        console.log("handleToggleVote");
      const { dispatch,idea } = this.props;
      dispatch(toggleVote(idea.id));
    }


    render() {
      const { idea, edit, view, vote, liked, votes, editable, addCommentAttachments, viewCommentAttachments } = this.props;
      const commentBoxId = `comment-container-${idea.id}`;
      const commentBoxHref = `#comment-container-${idea.id}`;
      console.log('IdeaItem.js');
      console.log(idea);

      console.log('comments');
      console.log(idea.comments);


      const commentsMark = (typeof idea.comments !== 'undefined' && idea.comments != null) &&
      idea.comments.map((comment, index) => (
        <Comment
          key={index.toString()}
          index={index}
          comment={comment}
          shortDateTime={moment(comment.submittedAt).fromNow()}
          fullDateTime={(new Date(comment.submittedAt)).toString()}
          viewCommentAttachments = {() => viewCommentAttachments(comment)}
        />
      ));

      const addCommentMark = (
        <div className="row">
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <div className="avatar-container">
              <span onClick={this.handleToggleAnonymous} className={idea.anonymousMode ? 'identity-icon-anonymous' : 'identity-icon-identified'} />
            </div>
          </div>
          <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 comment-attachments">
          	<div className="avatar-container">
          		<span onClick={() => addCommentAttachments(this.commentInput.value)} className="attachment-clip-enabled" />
  			</div>
          </div>
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 comment">
            <input
              type="text" className="form-control comment-input" placeholder="Add a Comment ....." ref={el => { this.commentInput = el; }}
              onKeyPress={this.handleAddCommentKeyPress}
            />
          </div>
        </div>
      );

      const showCommentError = typeof this.props.commentsErrorMessage !== 'undefined';
      console.log('idea.category');
      console.log(idea.category);
      console.log(idea.tags);

      return (
        <div className="idea-item-container shadow">
          <div className="body-container" onClick={() => view()} >
            <div className="label-sm-gray m-b-space">
              {idea.stage}
            </div>
            <div className="label-lg-base m-b-space">
              {idea.title}
            </div>
            <div className="label-sm-gray">
              {idea.description}
            </div>
            <div className="tag-container">
              <div className="label-sm-gray card-tag-label">Tags: </div>
              <div className="tag-wrapper">
                {
                  idea.tags.map((tag, index) => ((tag === idea.category)
                    ? (<div key={index.toString()} className="label-sm-base card-tag main-tag">{tag}</div>)
                    : (<div key={index.toString()} className="label-sm-base card-tag">{tag}</div>)
                  ))
                }
              </div>
            </div>
            <StageMark className="stage-mark-container" stage={idea.stage} />
            <div className="right-buttons-container">
              <CircleIconButton type={liked?"already_like":"like"} onClick={(e) => this.handleToggleVote(e)} />
              {editable && <CircleIconButton type="edit" onClick={() => edit()} />} 
            </div>
          </div>
          <div className="footer-container">
            <div className="footer-item label-sm-gray">{votes.toString()} Votes</div>
            <div className="footer-item label-sm-gray">{ (idea.comments === undefined || idea.comments == null) ?
              '' :
              idea.comments.length.toString()} Comments
            </div>
            <div className="footer-item label-sm-gray">Cost: {idea.expectedCostInCents}</div>
            <div className="footer-item label-sm-gray">Time: {idea.expectedTtm} Months</div>
            <div className="footer-item bottom-item label-sm-gray">
              <button type="button" className="btn btn-link btn-right" data-toggle="collapse" href={commentBoxHref}>Add Comment</button>
            </div>
          </div>

          <div id={commentBoxId} className="collapse">
            <div className="comment-wrapper">
              {showCommentError &&
            <Alert bsStyle="danger" >{this.props.commentsErrorMessage}</Alert> }
              { commentsMark }
              { addCommentMark }
            </div>
          </div>
        </div>
      );
    }
}


function mapStateToProps(state) {
  return {
    commentsErrorMessage: state.ideas.commentsErrorMessage,
    commentsToAdd: state.ideas.commentsToAdd,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeaItem);
