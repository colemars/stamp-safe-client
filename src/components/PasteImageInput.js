import React, { useEffect, useState, useRef } from "react";
import { Input, Ref } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { addImage } from '../actions/index'
import convertBlob from '../helpers/blobToFile';
import config from '../config'
import { v4 } from 'uuid'

const style = {
  fontSize: "14px",
  width: "18vw",
  borderRadius: "6px",
  textAlign: "center"
}

const PasteImageInput = (props) => {
  const node = useRef();

  const [imageUrl, setImageUrl] = useState('');

  const [isUrlLoading, setUrlLoading] = useState(false);

  const [focus, setFocus] = useState(false);

  const handlePaste = async (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const urlString = clipboardData.getData('Text');
    setUrlLoading(true);
    setImageUrl(urlString);
    fetch(urlString)
      .then(res => res.blob())
      .then(blob => {
        console.log(blob)
        if (config.file.allowedFileSize < blob.size) {
          console.log("Sorry, URL failed to upload.", "Error: size limit exceeded");
          setUrlLoading(false);
          setImageUrl("");
          return;
        }
        if (config.file.allowedFileTypes.indexOf(blob.type) === -1) {
          console.log("Sorry, URL failed to upload.", "Error: wrong file type");
          setUrlLoading(false);
          setImageUrl("");
          return;
        }
        console.log("success");
        setUrlLoading(false);
        setImageUrl("");
        const imageFile = convertBlob(blob, v4());
        props.addImage(imageFile)
      })
      .catch(error => {
        console.log(error)
        setUrlLoading(false);
        setImageUrl("");
      })
  }

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setFocus(false)
  }

  useEffect(() => {
    if (focus) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [focus]);

  const placeholder = focus ? "" : "Paste image or URL";

  return (
    <Ref innerRef={node}>
      <Input
        loading={isUrlLoading}
        onPaste={handlePaste}
        value={imageUrl}
        placeholder={placeholder}
        input={<input style={style} />}
        onMouseDown={e => setFocus(true)}
      />
    </Ref>
  )
}

const mapStateToProps = state => ({
  images: state.images
})

const mapDispatchToProps = dispatch => ({
  addImage: image => dispatch(addImage(image))
})

export default connect(mapStateToProps, mapDispatchToProps)(PasteImageInput)
