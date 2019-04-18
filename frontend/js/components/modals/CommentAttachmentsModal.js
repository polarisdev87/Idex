// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import TagsInput from 'react-tagsinput';
import Files from 'react-files';
import CommonButton from '../buttons/CommonButton';
import { changeFilesOnNewComment } from '../../actions/files';
import { API_BASE_URI } from '../../const';
import AttachmentsSection from '../attachments/AttachmentsSection';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    maxWidth: '75rem',
    top: '10rem',
    bottom: 'auto',
    padding: '0px',
    margin: '0 auto',
    borderRadius: '0px',
    border: 'none',
  },
};

type Props = {
  isOpen: boolean;
  handleCommentAttachments: (idea, isEditMode) => {},
  close: () => {},
  dispatch: any,
  idea: any,
  type: string,
  localFiles: any,
  remoteFiles: any,
}

/**
 * Attachments Modal for comments
 */
class CommentAttachmentsModal extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(nextProps);
    const { idea, type, comment, commentText } = nextProps;
    console.log('idea ===  ===>', idea);
    console.log('comment ===  ===>', comment);
    this.idea = idea;
    if (type === 'view' || type === 'edit') {
      if (idea !== undefined && idea !== null) {
        this.setState({
          stage: idea.stage,
          isEditMode: true,
          id: idea.id,
        });
        setTimeout(() => {
          if (this.title) {
            this.title.value = idea.title;
            this.description.value = idea.description;
            this.commentText.value = comment != null ? comment.text: commentText;
          }
        }, 500);
      } else {
        this.setState({
          stage: 'Launched',
          isEditMode: false,
          id: null,
        });
      }
    }
    // if (idea !== undefined && idea !== null) {

    // } else {

    // }
  }

  props: Props;

  isRemoving= false;

  state = {
    isEditMode: false,
    stage: 'Launched',
  }


  afterOpenModal() {
    console.log('after open Modal');
  }

  closeModal() {
    console.log('close open Modal');
  }

  /**
   * Close Modal - finish editing or adding
   * @param {*} type
   * @param {*} anonymousMode
   */
  handleCommentAttachments(type, anonymousMode) {
    console.log('AttachmentsModal -> handleCommentAttachments(type)');
    console.log(type);
    console.log(this.props.localFiles);
    const {
      id,  stage, 
    } = this.state;
    let newFiles = [];
    Array.prototype.push.apply(newFiles,this.props.localFiles); 
    Array.prototype.push.apply(newFiles,this.props.remoteFiles); 
    console.log(newFiles);
    const comment = {
      id,
      ideaId: id,
      commentId: id,
      text: this.commentText.value.trim(),
      title: this.title.value.trim(),
      description: this.description.value.trim(),
      anonymousMode,
      files: newFiles,
    };
    console.log(comment);
    this.props.handleCommentAttachments(comment, type);
  }


  /**
  * Upload files as soon as they are dragged and dropped
  */
  onFilesChange = (files) => {
    console.log('onFilesChange');
    console.log(this.props);
    console.log(files);
    const { dispatch, idea, remoteFiles, localFiles, type } = this.props;

    let newFiles = [];
    Array.prototype.push.apply(newFiles,files); 
    Array.prototype.push.apply(newFiles,remoteFiles); 
    console.log("newFiles");
    console.log(newFiles);
    console.log("localFiles");
    console.log(localFiles);
    changeFilesOnNewComment(dispatch, idea.id, localFiles, newFiles);
  }

  onFilesError = (error, file) => {
    console.log(`error code ${error.code}: ${error.message}`);
  }

  
  /*
  filesRemoveAll = () => {
    this.refs.files.removeFiles();
  }
*/

  render() {
    console.log('AddIdeaModal.render()');
    console.log(this.props);
    const {
      isOpen, idea, close, type, localFiles, remoteFiles,
    } = this.props;
    console.log('render - type ===>', type);
    console.log(idea);
    console.log("localFiles");
    console.log(localFiles);
    const { isEditMode } = this.state;
    const renderTitle = () => {
      if (type === 'view') {
        return <span>View Comment Attachments</span>;
      } else {
        return <span>Edit Comment Attachments</span>;
      }
    };
    const renderButtonTitle = () => {
       return <span>Close</span>;
    };
    const allowAttachments = type !== "view";
    return (
      <Modal
        isOpen={isOpen}
        onAfterOpen={() => this.afterOpenModal}
        onRequestClose={() => this.closeModal}
        shouldCloseOnOverlayClick={true}
        style={modalStyle}
        contentLabel="Comment Attachments Modal"
      >
        <div className="idea-modal-container">
          <div className="modal-header">
            {renderTitle()}
            <button className="btn btn-default btn-close" onClick={() => close()}>X</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="label">Idea Title</label>
              <div className="input-container">
                <input readOnly ref={el => { this.title = el; }} className="form-control" type="text" />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Idea Description</label>
              <div className="input-container">
                <textarea readOnly ref={el => { this.description = el; }} className="form-control" type="text" />
              </div>
            </div>

            <div className="form-group">
            <label className="label">Comment</label>
            <div className="input-container">
              <textarea readOnly ref={el => { this.commentText = el; }} className="form-control" type="text" />
            </div>
            </div>
            
            <div className="form-group">

            
            <AttachmentsSection allowAttachments={type != "view"} 
            	idea={idea}
            	localFiles = {localFiles}
            	remoteFiles = {remoteFiles}
        		onFilesChange = {(files) => {this.onFilesChange(files)}} 
         		onFilesError = {(error, file) => {this.onFilesError(error, file)}} 
            />

            
            
            </div>

            <div className="button-container">
              <button type="button" className="btn idea-modal-button" onClick={() => this.handleCommentAttachments(type, idea == null ? false : idea.anonymousMode)} >
                {renderButtonTitle()}
              </button>
            </div>
            {
              (type === 'view') ?
                <div className="viewOverLayer" /> :
                null
            }
          </div>

        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log('AttachmentsModal.mapStateToProps...');
  console.log('state');
  console.log(state);
  console.log(ownProps);
  const {comment, idea} = ownProps;

  let localFiles = [];
  let remoteFiles = [];
  if (comment !=null) {
	  // files to view of a saved comment
	  if (comment.files != null ) {
		  remoteFiles = comment.files;
	  }
  } else {
     // files of a comment that have not been added yet
     const index = state.ideas.commentsToAdd.findIndex(x => x.ideaId === idea.id);
	 if (index !== -1) {
	   console.log("index != -1");
	   localFiles = state.ideas.commentsToAdd[index].files;
	 }
  }

  return {
    localFiles,
    remoteFiles,
    ...ownProps,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentAttachmentsModal);
