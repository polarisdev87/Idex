// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import TagsInput from 'react-tagsinput';
import CommonButton from '../buttons/CommonButton';
import { changeFiles } from '../../actions/files';
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
  handleIdea: (idea, isEditMode) => {},
  close: () => {},
  dispatch: any,
  idea: any,
  type: string,
  localFiles: any,
  remoteFiles: any,
}

class AddIdeaModal extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(nextProps);
    const { idea, type } = nextProps;
    console.log('idea ===  ===>', idea);
    this.idea = idea;
    if (type === 'view' || type === 'edit') {
      if (idea !== undefined && idea !== null) {
        let mainTag = -1;
        if (typeof idea.tags !== 'undefined') {
          mainTag = idea.tags.indexOf(idea.category);
        }
        this.setState({
          stage: idea.stage,
          tags: idea.tags,
          mainTag,
          isEditMode: true,
          id: idea.id,
        });
        setTimeout(() => {
          if (this.title) {
            this.title.value = idea.title;
            this.description.value = idea.description;
            this.expectedCostInCents.value = idea.expectedCostInCents;
            this.expectedTtm.value = idea.expectedTtm;
            this.expectedProfitInCents.value = idea.expectedProfitInCents;
          }
        }, 500);
      } else {
        this.setState({
          stage: 'Launched',
          tags: [],
          mainTag: -1,
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
    tags: [],
    isEditMode: false,
    stage: 'Launched',
    mainTag: -1,
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
  handleIdea(type, anonymousMode) {
    console.log('AddIdeaModal -> handleIdea(type)');
    console.log(type);
    console.log(this.props.localFiles);
    const {
      id, tags, stage, mainTag,
    } = this.state;
    let category = null;
    if (mainTag !== -1) {
      category = tags[mainTag];
    }
    console.log(category);
    let newFiles = [];
    Array.prototype.push.apply(newFiles,this.props.localFiles); 
    Array.prototype.push.apply(newFiles,this.props.remoteFiles); 
    console.log(newFiles);
    const idea = {
      id,
      title: this.title.value.trim(),
      description: this.description.value.trim(),
      stage,
      expectedCostInCents: this.expectedCostInCents.value.trim(),
      expectedTtm: this.expectedTtm.value.trim(),
      expectedProfitInCents: this.expectedProfitInCents.value.trim(),
      tags,
      category,
      anonymousMode,
      files: newFiles,
    };
    console.log(idea);
    this.props.handleIdea(idea, type);
  }

  /**
   * Handle tags change
   * @param {*} tags
   */
  handleChange(tags) {
    let { mainTag } = this.state;
    if (tags.length === 1) {
      mainTag = 0;
    }
    this.setState({ tags, mainTag });
  }


  setTagAsMain(evt, key) {
    console.log('setTagAsMain');
    console.log(key);
    if (this.isRemoving) {
      console.log('isRemoving');
      this.isRemoving = false;
    } else {
      console.log('NOT isRemoving');
      this.setState({ mainTag: key });
    }
  }


  onRemoveTag(key, classThis, onRemoveFunction) {
    console.log('onRemoveTag');
    console.log(key);
    console.log(classThis);
    let currentMainTag = classThis.state.mainTag;
    onRemoveFunction(key);
    if (key <= currentMainTag) {
      currentMainTag--;
      if (currentMainTag === -1 && classThis.state.tags.length > 1) {
        currentMainTag = 0;
      }
      classThis.setState({ mainTag: currentMainTag });
    }
    this.isRemoving = true;
  }

  renderTagWithMainFlag(props, classThis) {
    const {
      tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other
    } = props;

    if (key === classThis.state.mainTag) {
      if (other.className != null) {
        other.className += ' main-tag';
      }
    }
    return (
      <span
        key={key} {...other}
        onClick={(ev) => classThis.setTagAsMain(ev, key)}
      >
        {getTagDisplayValue(tag)}
        {!disabled &&
        <a className={classNameRemove} onClick={(e) => classThis.onRemoveTag(key, classThis, onRemove)} />
        }
      </span>
    );
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
    if (type === "edit") {
        changeFiles(dispatch, idea.id, idea.files, newFiles);
    } else {
    	console.log("onFilesChange : adding attachment");
    	console.log(localFiles);
    	console.log(files);
    	changeFiles(dispatch, -1, localFiles, files);
    }
  }

  onFilesError = (error, file) => {
    console.log(`error code ${error.code}: ${error.message}`);
  }

  
  render() {
    console.log('AddIdeaModal.render()');
    console.log(this.props);
    const {
      isOpen, idea, close, type, localFiles, remoteFiles,
    } = this.props;
    console.log('type ===>', type);
    console.log(idea);
    console.log("localFiles");
    console.log(localFiles);
    const { isEditMode } = this.state;
    const renderTitle = () => {
      if (type === 'view') {
        return <span>View Idea</span>;
      } else if (type === 'edit') {
        return <span>Edit Idea</span>;
      }
      return <span>Add Idea</span>;
    };
    const renderButtonTitle = () => {
      if (type === 'view') {
        return <span>Close Idea</span>;
      } else if (type === 'edit') {
        return <span>Edit Idea</span>;
      }
      return <span>Add Idea</span>;
    };
    const allowAttachments = type !== "view";
    return (
      <Modal
        isOpen={isOpen}
        onAfterOpen={() => this.afterOpenModal}
        onRequestClose={() => this.closeModal}
        shouldCloseOnOverlayClick={true}
        style={modalStyle}
        contentLabel="Idea Modal"
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
                <input ref={el => { this.title = el; }} className="form-control" type="text" />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Idea Description</label>
              <div className="input-container">
                <textarea ref={el => { this.description = el; }} className="form-control" type="text" />
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <label className="label">Expected Time to Market:</label>
                  <div className="input-container">
                    <input ref={el => { this.expectedTtm = el; }} className="form-control" type="text" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <label className="label">Expected Cost to implement:</label>
                  <div className="input-container">
                    <input ref={el => { this.expectedCostInCents = el; }} className="form-control" type="text" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <label className="label">Expected Profit:</label>
                  <div className="input-container">
                    <input ref={el => { this.expectedProfitInCents = el; }} className="form-control" type="text" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="label">Tags {type !== 'view' && <span> (Click on tag to set as main)</span>}</label>
              <div className="input-container">
                {/* <input ref={el => { this.tags = el; }} className="form-control" type="text" /> */}
                <TagsInput value={this.state.tags} onChange={::this.handleChange} renderTag={(parProps) => this.renderTagWithMainFlag(parProps, this)} />
              </div>
            </div>

            <div className="form-group">
            
            <AttachmentsSection allowAttachments={type != "view"} idea={idea}  
            	localFiles = {localFiles}
                remoteFiles = {remoteFiles}
            	onFilesChange = {(files) => {this.onFilesChange(files)}} 
             	onFilesError = {(error, file) => {this.onFilesError(error, file)}} 
            />
            
            </div>

            
            <div className="button-container">
              <button type="button" className="btn idea-modal-button" onClick={() => this.handleIdea(type, idea == null ? false : idea.anonymousMode)} >
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
  console.log('AddIdeaModal.mapStateToProps...');
  console.log('state');
  console.log(state);
  console.log(ownProps);

  let localFiles = [];
  let remoteFiles = [];
  if (ownProps.idea !=null) {
    const index = state.ideas.ideasArr.findIndex(x => x.id === ownProps.idea.id);
    if (index !== -1) {
      console.log("index != -1");
      const ideaFiles = state.ideas.ideasArr[index].files;
      if (ideaFiles !== null) {
        console.log("files");  
        console.log(localFiles);
        console.log(remoteFiles);
        console.log(ideaFiles);
        for (let fileIndex in ideaFiles) {
        	if (ideaFiles[fileIndex].remote) {
        		remoteFiles.push(ideaFiles[fileIndex]);
        	} else {
        		localFiles.push(ideaFiles[fileIndex]);
        	}
        }
      }
    }
  } else {
	  // mode : adding an idea - ownProps.idea == null
	  console.log("state.ideas.ideaToAdd");
	  console.log(state.ideas.ideaToAdd);
	  localFiles = state.ideas.ideaToAdd.files;
	  remoteFiles = [];
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

export default connect(mapStateToProps, mapDispatchToProps)(AddIdeaModal);
