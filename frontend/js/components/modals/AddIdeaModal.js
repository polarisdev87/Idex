// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import CommonButton from '../buttons/CommonButton';
import TagsInput from 'react-tagsinput';


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
  props: Props;

  state = {
    tags: [],
    isEditMode: false,
    stage: 'Launched',
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log(nextProps);
    const { idea, type } = nextProps;
    console.log('idea ===  ===>', idea);
    if (type === 'view' || type === 'edit') {
      if (idea !== undefined && idea !== null) {
        this.setState({
          stage: idea.stage,
          tags: idea.tags,
          isEditMode: true,
        });
        setTimeout(() => {
          if (this.title) {
            this.title.value = idea.title;
            this.description.value = idea.description;
            this.expectedCostInCents.value = idea.expectedCostInCents;
            this.actualCostInCents.value = idea.actualCostInCents;
            this.expectedTtm.value = idea.expectedTtm;
            this.actualTtm.value = idea.actualTtm;
          }
        }, 500);
      } else {
        this.setState({
          tags: [],
          isEditMode: false,
          stage: 'Launched',
        });
      }
    }
    // if (idea !== undefined && idea !== null) {

    // } else {

    // }
  }

  afterOpenModal() {
    console.log('after open Modal');
  }

  closeModal() {
    console.log('close open Modal');
  }

  handleIdea(type) {
    const { tags, stage } = this.state;
    const idea = {
      title: this.title.value.trim(),
      description: this.description.value.trim(),
      stage: stage,
      expectedCostInCents: this.expectedCostInCents.value.trim(),
      expectedTtm: this.expectedTtm.value.trim(),
      expectedProfit: this.expectedProfit.value.trim(),
      tags: tags,
      actualCostInCents: this.actualCostInCents.value.trim(),
      actualTtm: this.actualTtm.value.trim(),
      actualProfit: this.actualProfit.value.trim(),
    };
    this.props.handleIdea(idea, type);
  }

  handleChange(tags) {
    this.setState({ tags });
  }

  render() {
    const { isOpen, idea, close, type } = this.props;
    console.log('type ===>', type);
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
                    <input ref={el => { this.expectedProfit = el; }} className="form-control" type="text" />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <label className="label">Actual Profit (Optional):</label>
                  <div className="input-container">
                    <input ref={el => { this.actualProfit = el; }} className="form-control" type="text" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="label">Tags</label>
              <div className="input-container">
                {/* <input ref={el => { this.tags = el; }} className="form-control" type="text" /> */}
                <TagsInput value={this.state.tags} onChange={::this.handleChange} />
              </div>
            </div>

            <div className="button-container">
              <button type="button" className="btn idea-modal-button" onClick={() => this.handleIdea(type)}>
                {renderButtonTitle()}
              </button>
            </div>
            {
              (type === 'view') ?
                <div className="viewOverLayer"></div> :
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
