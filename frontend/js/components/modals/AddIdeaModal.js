// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import TagsInput from 'react-tagsinput';
import CommonButton from '../buttons/CommonButton';
import { changeFiles } from '../../actions/files';
import AttachmentsSection from '../attachments/AttachmentsSection';
import {I18n} from 'react-redux-i18n';


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
          tags: idea.tags,
          mainTag,
          stage: idea.stage,
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
	  console.log("handleIdea");
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
    // check if last element is in previous position
    if (tags.length>1) {
    	const element = tags[tags.length-1];
    	const pos = tags.indexOf(element);
    	if (pos < tags.length-1) {
    		tags.pop();
    		alert("Removing duplicated added tag");
    	}
    }
    // set main tag
    if (tags.length === 1) {
      mainTag = 0;
    }
    this.setState({ tags, mainTag });
  }


  setTagAsMain(evt, key) {
    if (this.isRemoving) {
      this.isRemoving = false;
    } else {
      this.setState({ mainTag: key });
    }
  }


  onRemoveTag(key, classThis, onRemoveFunction) {
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
    const { dispatch, idea, remoteFiles, localFiles, type } = this.props;

    let newFiles = [];
    Array.prototype.push.apply(newFiles,files); 
    Array.prototype.push.apply(newFiles,remoteFiles); 
    if (type === "edit") {
        changeFiles(dispatch, idea.id, idea.files, newFiles);
    } else {
    	changeFiles(dispatch, -1, localFiles, files);
    }
  }

  onFilesError = (error, file) => {
    console.log(`error code ${error.code}: ${error.message}`);
  }

  
  render() {
    const {
      isOpen, idea, close, type, localFiles, remoteFiles,ideas, nextIdea, previousIdea,
    } = this.props;
    console.log('type ===>', type);
    console.log(idea);
    const { isEditMode } = this.state;
    
    const multipleIdeas = !(typeof ideas == "undefined" || ideas == null || ideas.length<=1);
    
    const renderTitle = () => {
      if (type === 'view') {
        return <span>{I18n.t('ideas.modal.viewIdea')}</span>;
      } else if (type === 'edit') {
        return <span>{I18n.t('ideas.modal.editIdea')}</span>;
      }
      return <span>{I18n.t('ideas.modal.addIdea')}</span>;
    };
    const renderButtonTitle = () => {
      if (type === 'view') {
        return <span>{I18n.t('ideas.modal.finishView')}</span>;
      } else if (type === 'edit') {
        return <span>{I18n.t('ideas.modal.finishEdit')}</span>;
      }
      return <span>{I18n.t('ideas.modal.finishAdd')}</span>;
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
          {multipleIdeas && <span>
          <button className="btn btn-default" onClick={() => previousIdea()}>&lt;</button>
          <button className="btn btn-default" onClick={() => nextIdea()}>&gt;</button>
          </span>}
            {renderTitle()}
            <button className="btn btn-default btn-close" onClick={() => close()}>X</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="label">{I18n.t('ideas.modal.title')}</label>
              <div className="input-container">
                <input ref={el => { this.title = el; }} className="form-control" type="text" />
              </div>
            </div>

            <div className="form-group">
              <label className="label">{I18n.t('ideas.modal.description')}</label>
              <div className="input-container">
                <textarea ref={el => { this.description = el; }} className="form-control" type="text" />
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <label className="label">{I18n.t('ideas.modal.expectedTimeToMarket')}</label>
                  <div className="input-container">
                    <input pattern="[0-9]*" ref={el => { this.expectedTtm = el; }} className="form-control" type="number" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <label className="label">{I18n.t('ideas.modal.cost')}</label>
                  <div className="input-container">
                    <input pattern="[0-9]*" ref={el => { this.expectedCostInCents = el; }} className="form-control" type="number" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <label className="label">{I18n.t('ideas.modal.profit')}</label>
                  <div className="input-container">
                    <input pattern="[0-9]*" ref={el => { this.expectedProfitInCents = el; }} className="form-control" type="number" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="label">{I18n.t('ideas.modal.tags')} {type !== 'view' && <span> {I18n.t('ideas.modal.clickTags')}</span>}</label>
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
      const ideaFiles = state.ideas.ideasArr[index].files;
      if (ideaFiles !== null) {
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
