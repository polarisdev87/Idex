import React, { Component, PropTypes } from 'react'

export default class IdeaRow extends Component {


  render() {
    const { idea } = this.props;
    const tripleDot = '...';

    return (
      <div className='idea-row'>
        <div className="idea-vote-num col-md-1">
          { idea.votes }
        </div>
        <div className="idea-title col-md-1">
          { idea.title }
        </div>
        <div className="idea-description col-md-8">
          { idea.description.substring(0, 100) + tripleDot }
        </div>
        <div className="idea-description col-md-2">
          <button>
            View
          </button>
        </div>
     </div>
    )
  }

}

IdeaRow.propTypes = {
  idea: PropTypes.object.isRequired
};
