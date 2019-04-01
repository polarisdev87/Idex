// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import TagsInput from 'react-tagsinput';
import Files from 'react-files'
import CommonButton from '../buttons/CommonButton';

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
  type: string;
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
            this.actualCostInCents.value = idea.actualCostInCents;
            this.expectedTtm.value = idea.expectedTtm;
            this.actualTtm.value = idea.actualTtm;
            this.expectedProfitInCents.value = idea.expectedProfitInCents;
            this.actualProfitInCents.value = idea.actualProfitInCents;
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
    files: [],
  }


  afterOpenModal() {
    console.log('after open Modal');
  }

  closeModal() {
    console.log('close open Modal');
  }

  handleIdea(type, anonymousMode) {
    console.log('AddIdeaModal -> handleIdea(type)');
    console.log(type);
    const {
 id, tags, stage, mainTag 
} = this.state;
    let category = null;
    if (mainTag != -1) {
      category = tags[mainTag];
    }
    console.log(category);
    const idea = {
      id,
      title: this.title.value.trim(),
      description: this.description.value.trim(),
      stage,
      expectedCostInCents: this.expectedCostInCents.value.trim(),
      actualCostInCents: this.actualCostInCents.value.trim(),
      expectedTtm: this.expectedTtm.value.trim(),
      expectedProfitInCents: this.expectedProfitInCents.value.trim(),
      tags,
      category,
      actualTtm: this.actualTtm.value.trim(),
      actualProfitInCents: this.actualProfitInCents.value.trim(),
      anonymousMode,
    };
    this.props.handleIdea(idea, type);
  }

  handleChange(tags) {
    let mainTag = this.state.mainTag;
    if (tags.length == 1) {
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
      if (currentMainTag == -1 && classThis.state.tags.length > 1) {
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

    if (key == classThis.state.mainTag) {
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


  onFilesChange = (files) => {
    this.setState({
      files,
    }, () => {
      console.log(this.state.files);
    });
  }

  onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message);
  }

  filesRemoveOne = (file) => {
    this.refs.files.removeFile(file)
  }

  filesRemoveAll = () => {
    this.refs.files.removeFiles()
  }



  render() {
    const {
      isOpen, idea, close, type,
    } = this.props;
    console.log('type ===>', type);
    console.log(idea);
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
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <label className="label">Actual Time to Market (Optional):</label>
                  <div className="input-container">
                    <input ref={el => { this.actualTtm = el; }} className="form-control" type="text" />
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
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <label className="label">Actual Cost to Implement (Optional):</label>
                  <div className="input-container">
                    <input ref={el => { this.actualCostInCents = el; }} className="form-control" type="text" />
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
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <label className="label">Actual Profit (Optional):</label>
                  <div className="input-container">
                    <input ref={el => { this.actualProfitInCents = el; }} className="form-control" type="text" />
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
              <div className="files">
                <Files
                  className="files-dropzone-list"
                  onChange={this.onFilesChange}
                  onError={this.onFilesError}
                  style={{ height: '100px' }}
                  accepts={['image/png', '.pdf', 'audio/*']}
                  multiple
                  maxFiles={3}
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
                >
                 Drop files here or click to upload
                </Files>

        <button onClick={this.filesRemoveAll}>Remove All Files</button>
        <button onClick={this.filesUpload}>Upload</button>
        {
          this.state.files.length > 0
          ? <div className='files-list'>
            <ul>{this.state.files.map((file) =>
              <li className='files-list-item' key={file.id}>
                <div className='files-list-item-preview'>
                  {file.preview.type === 'image'
                  ? <img className='files-list-item-preview-image' src={file.preview.url} />
                  : <div className='files-list-item-preview-extension'>{file.extension}</div>}
                </div>
                <div className='files-list-item-content'>
                  <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                  <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
                </div>
                <div
                  id={file.id}
                  className='files-list-item-remove'
                  onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
                />
              </li>
            )}</ul>
          </div>
          : null
        }


              </div>
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

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIdeaModal);
