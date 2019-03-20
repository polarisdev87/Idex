import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
  comment: any,
  index: any,
}


class Comment extends Component {
    props: Props;

    render() {
      const { index, comment, fullDateTime, shortDateTime } = this.props;
      return (
        <div key={index.toString()} className="row">
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <div className="avatar-container"><span> {comment.account.firstName} {comment.account.lastName.charAt(0)}. </span></div>
          </div>
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 comment">
            <div className="label-base-base">{comment.text}</div>
            <div className="date">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={
                  <Tooltip id="tooltip-right">{fullDateTime}</Tooltip>
                }
              >
                <span>{shortDateTime}</span>
              </OverlayTrigger>
            </div>

          </div>
        </div>
      );
    }
}


export default Comment;
