import React, { Component, PropTypes } from 'react'

class AddIdeaModal extends Component {

  constructor(props) {
    super(props);
    this.handleCloseModal = this.props.handleCloseModal;
  }

  render() {
    const tripleDot = '...';

    return (
      <div className='add-idea-modal'>
        <p>Modal text!</p>
        <button onClick={this.handleCloseModal}>Close Modal</button>
     </div>
    )
  }

  handleClick(idea) {
    idea.votes++;
    this.forceUpdate();
  }

}

AddIdeaModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired
};

export default AddIdeaModal;