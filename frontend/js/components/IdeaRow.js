import React, { Component} from 'react'
import PropTypes from 'prop-types';

class IdeaRow extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { idea } = this.props;
    const tripleDot = '...';

    return (
      <div className='idea-row'>
        <div className="idea-vote-num col-md-1" onClick={ () => this.handleClick(idea) }>
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

  handleClick(idea) {
    idea.votes++;
    this.forceUpdate();
  }

}

IdeaRow.propTypes = {
  idea: PropTypes.object.isRequired
};

export default IdeaRow;