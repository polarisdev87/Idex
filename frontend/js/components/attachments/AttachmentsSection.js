import React, { Component } from 'react';
import { connect } from 'react-redux';
import Files from 'react-files';
import { API_BASE_URI } from '../../const';


type Props = {
	allowAttachments: boolean,
}

class AttachmentsSection extends Component {
	componentDidMount() {
    }
	  
    props: Props;
	  
    state = {
	}
    

    
    render() {
        const { allowAttachments, remoteFiles, localFiles } = this.props;
        const { remoteFilesRemoveOne, localFilesRemoveOne, onFilesChange, onFilesError } = this.props;
    	return (
                <div className="files">
                {/* see accepts options in http://www.iana.org/assignments/media-types/media-types.xhtml */ }
                 { allowAttachments &&
               	  <Files
                     ref="localFiles"
                     className="files-dropzone-list"
                     onChange={(files) => onFilesChange(files) }
                     onError={(error, files) => onFilesError(error, files) }
                     style={{ height: '100px', width: '100%' }}
                     accepts={['image/*', '.pdf', 'audio/*', '.txt', '.json', '.xml', '.docx', '.xml' ]}
                     multiple
                     maxFiles={10}
                     maxFileSize={3145728}
                     minFileSize={0}
                     clickable
                   >
                    Drop files here or click to upload
                   </Files>
                 }
                    
                    {
                        remoteFiles.length > 0
                          ? <div className="files-list">
                            <ul>{remoteFiles.map((file) =>
                              (<li className="files-list-item" key={file.id}>
                              
                              
                              		<a href={API_BASE_URI+file.preview.url} target="_blank" >
                                <div className="files-list-item-preview">
                                  {file.preview.type === 'image'
                                    ? <img className="files-list-item-preview-image" src={(file.remote?API_BASE_URI:"")+file.preview.url} />
                                    : <div className="files-list-item-preview-extension">{file.extension}</div>}
                                </div>
                                <div className="files-list-item-content">
                                  <div className="files-list-item-content-item files-list-item-content-item-1">{file.name}</div>
                                  <div className="files-list-item-content-item files-list-item-content-item-2">{file.sizeReadable}</div>
                                </div>
                             	</a>
                             	{allowAttachments &&
                             		<div>
                                   <div
                                   id={file.id}
                                   className="files-list-item-remove"
                                   	onClick={() => remoteFilesRemoveOne(file)} // eslint-disable-line
                                 />
                                   </div>
                             	}
                                </li>))}
                            </ul>
                          </div>
                          : null
                      }
                    
                    
                    {
                     localFiles.length > 0
                       ? <div className="files-list">
                         <ul>{localFiles.map((file) =>
                           (<li className="files-list-item" key={file.id}>
                           
                      		<a href={file.preview.url} target="_blank" >
                             <div className="files-list-item-preview">
                               {file.preview.type === 'image'
                                 ? <img className="files-list-item-preview-image" src={(file.remote?API_BASE_URI:"")+file.preview.url} />
                                 : <div className="files-list-item-preview-extension">{file.extension}</div>}
                             </div>
                             <div className="files-list-item-content">
                               <div className="files-list-item-content-item files-list-item-content-item-1">{file.name}</div>
                               <div className="files-list-item-content-item files-list-item-content-item-2">{file.sizeReadable}</div>
                             </div>
                           	</a>
                                   <div
                                   id={file.id}
                                   className="files-list-item-remove"
                                   	onClick={() => localFilesRemoveOne(file)} // eslint-disable-line
                                 />
                           </li>))}
                         </ul>
                       </div>
                       : null
                   }
                 </div>
    			
    	)
    }
	
}



function mapStateToProps(state, ownProps) {

	  return {
	    ...ownProps,
	  };
	}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(AttachmentsSection);
