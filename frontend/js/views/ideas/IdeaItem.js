// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import StageMark from '../../components/StageMark';
import CircleIconButton from '../../components/buttons/CircleIconButton';
import { addComment } from '../../actions/comments';
import { Alert } from 'react-bootstrap';

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
    actualCostInCents: number,
    expectedTtm: number,
    actualTtm: number,
    tags: [],
    comments: [],
    votes: number,
  },
  edit: () => {},
  view: () => {},
}

class IdeaItem extends Component {
  props: Props;

  handleKeyPress = e => {
    if (e.key === 'Enter') {

      const { dispatch, idea } = this.props;
      dispatch(addComment({
        ideaId: idea.id,
        text: e.target.value,
        sumittedBy: '',
        submittedAt: ''
      })); 

      this.commentInput.value = '';

    }

  }

  render() {

    const { idea, edit, view } = this.props;
    const commentBoxId = `comment-container-${idea.id}`;
    const commentBoxHref = `#comment-container-${idea.id}`;
    console.log("IdeaItem.js");
    console.log(idea);

    console.log("comments");
    console.log(idea.comments);
    const commentsMark = (idea.comments !== undefined) ?
      idea.comments.map((comment, index) => (
        <div key={index.toString()} className="row">
          <div className="col-xs-2 col-sm-1 col-md-1 col-lg-1">
            <div className="avatar-container"><img src="" alt="" /></div>
          </div>
          <div className="col-xs-10 col-sm-11 col-md-11 col-lg-11 comment">
            <div className="label-base-base">{comment.text}</div>
          </div>
        </div>
      )) :
      null;
    const addCommentMark = (
      <div className="row">
        <div className="col-xs-2 col-sm-1 col-md-1 col-lg-1">
          <div className="avatar-container"><img src="" alt="" /></div>
        </div>
        <div className="col-xs-10 col-sm-11 col-md-11 col-lg-11 comment">
          <input type="text" className="form-control comment-input" placeholder="Add a Comment ....." ref={el => { this.commentInput = el; }} onKeyPress={this.handleKeyPress} />
        </div>
      </div>
    );
        let showCommentError = typeof this.props.commentsErrorMessage != "undefined";
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
                idea.tags.map((tag, index) => (
                  <div key={index.toString()} className="label-sm-base card-tag">{tag}</div>
                ))
              }
            </div>
          </div>
          <StageMark className="stage-mark-container" stage={idea.stage} />
          <div className="right-buttons-container">
            <CircleIconButton type="already_like" />
            <CircleIconButton type="edit" onClick={() => edit()} />
          </div>
        </div>
        <div className="footer-container">
          <div className="footer-item label-sm-gray">{idea.votes.toString()} Votes</div>
          <div className="footer-item label-sm-gray">{ (idea.comments === undefined) ? '' : idea.comments.length.toString()} Comments</div>
          <div className="footer-item label-sm-gray">Cost: {idea.expectedCostInCents}~{idea.actualCostInCents}</div>
          <div className="footer-item label-sm-gray">Time: {idea.expectedTtm}~{idea.actualTtm} Months</div>
          <div className="footer-item bottom-item label-sm-gray">
            <button type="button" className="btn btn-link btn-right" data-toggle="collapse" href={commentBoxHref}>Add Comment</button>
          </div>
        </div>

        <div id={ commentBoxId } className="collapse">
          <div className="comment-wrapper">
              {showCommentError  &&
                <Alert bsStyle="danger"  >{this.props.commentsErrorMessage}</Alert>  }
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
      commentsErrorMessage: state.ideas.commentsErrorMessage
  };

}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeaItem);
