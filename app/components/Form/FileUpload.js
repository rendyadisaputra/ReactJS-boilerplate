import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Progress } from 'reactstrap';
import Button from '../Button/Button';

export default function FileUpload(props) {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files;

    props.fileUploaded(fileUploaded);
  };

  return (
    <div>
      <div className="upload-box">
        <p className="size18 mb2">Drag and drop a file or</p>
        <Button onClick={handleClick}>Browse</Button>
      </div>
      <input
        multiple
        name="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
      />

      <div className="upload-progress">
        {props.selectedImages ? (
          props.selectedImages.map((file, index) => {
            if (index !== 0) {
              return (
                <>
                  <h2 className="bold mb1">Uploaded</h2>
                  <div
                    key={Math.random() * 10}
                    className="upload-progress__bar mb1"
                  >
                    <p className="size16">{file.image.name}</p>
                    <Progress
                      value={file.progress}
                      className="progress-bar-upload"
                    />
                  </div>
                </>
              );
            }

            return null;
          })
        ) : (
          <p>Kamu belum memilih foto</p>
        )}
      </div>
    </div>
  );
}

FileUpload.propTypes = {
  fileUploaded: PropTypes.any,
  selectedImages: PropTypes.array,
};
