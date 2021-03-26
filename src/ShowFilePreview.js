import React from 'react'
import {IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-modal';

function ShowFilePreview({handleClose,avatar,uploadImageFile}) {

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          width                 : '50%',
          height                 : '75%',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

    return (
        <Modal isOpen style={customStyles}>
            <div className="chat_image_preview">
            <div className="chat_preview_header">
                <h2>Image Preview</h2>
                <IconButton onClick={handleClose}><CloseIcon/></IconButton>
            </div>
            <div className="chat_preview_content">
                <img src={avatar} alt="Preview"/>
            </div>
            <div className="chat_preview_footer" onClick={uploadImageFile}>
                <IconButton><SendIcon /> </IconButton>Send 
            </div>
        </div>
        </Modal>
    )
}

export default ShowFilePreview
    