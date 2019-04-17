import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import cx from 'classnames';


type Props = {
  comment: any,
  index: any,
}

class Comment extends Component {
    props: Props;

    render() {
      const { index, comment, fullDateTime, shortDateTime } = this.props;



      return (
        <div key={index.toString()} className={cx("row", {"author":comment.authorComment})}>
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <div className="avatar-container">
              <span> {comment.account.displayName}</span></div>
          </div>
          <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 comment-attachments">
        	<div className="avatar-container">
        		<span onClick={this.openCommentAttachments} className="attachment-clip-enabled" />
        	</div>
          </div>
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 comment">
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
