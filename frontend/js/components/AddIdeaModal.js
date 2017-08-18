import React, { Component, PropTypes } from 'react'

class AddIdeaModal extends Component {

  constructor(props) {
    super(props);
    this.handleCloseModal = this.props.handleCloseModal;
    this.addIdea = this.props.addIdea;
    this.handleSubmitPressed = this.handleSubmitPressed.bind(this);
  }

  render() {
    const tripleDot = '...';

    return (
      <div className='add-idea-modal'>
        <p>Modal text!</p>
        <label>Title</label>
        <input type="text" ref="title"></input>
        <label>Description</label>
        <input type="text" ref="description"></input>
        <label>Expected Cost in Cents</label>
        <input type="text" ref="ec"></input>
        <label>Expected Time to Market</label>
        <input type="text" ref="ettm"></input>
        <label>Tags</label>
        <input type="text" ref="tags"></input>
        <button onClick={this.handleSubmitPressed}>Submit</button>
        <button onClick={this.handleCloseModal}>Cancel</button>
     </div>
    )
  }

  handleSubmitPressed() {

    const tagsStringArr = this.refs.tags.value.split(' ');

    this.addIdea(
      {
        title: this.refs.title.value,
        description: this.refs.description.value,
        expectedCostInCents: this.refs.ec.value,
        expectedTimeToMarket: this.refs.ettm.value,
        tags: tagsStringArr
      }
    )
  }

}

AddIdeaModal.propTypes = {
  addIdea: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired
};

export default AddIdeaModal;