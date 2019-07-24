import React, {useMemo, useCallback} from 'react';
import { connect } from 'react-redux';
import {useDropzone} from 'react-dropzone';
import { addImage } from '../actions/index'


const containerStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  width: "100%",
  height: "100%",
  color: 'white',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  background: "rgb(79,169,185)",
  // eslint-disable-next-line no-dupe-keys
  background: "linear-gradient(229deg, rgba(79,169,185,0.7525385154061625) 24%, rgba(210,27,27,0.3267682072829131) 87%)",
};

const baseBoxStyle={
  border:"2px dashed rgba(255, 255, 255, 0.5)",
  borderRadius: "6px",
  margin: "auto",
  padding: "5%",
  paddingLeft: "10%",
  paddingRight: "10%",
  fontFamily: "roboto",
  fontWeight: "500",
  fontSize: ".9em"
}

const acceptBoxStyle = {
  border: "none",
  backgroundColor: "rgba(42, 201, 64, 0.4)"
}

const rejectBoxStyle = {
  border: "none",
  backgroundColor: "rgba(115, 23, 23, 0.5)"
}

const baseBoxText = "Drop Images Here"

const acceptBoxText = "Drop!"

const rejectBoxText = "Invalid File Type"

function Dropzone(props) {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      props.addImage(file)
    });
  }, [props])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/jpeg, image/png', noClick: true, onDrop, noKeyboard: true});

  const boxstyle = useMemo(() => ({
    ...baseBoxStyle,
    ...(isDragActive ? baseBoxStyle : {}),
    ...(isDragAccept ? acceptBoxStyle : {}),
    ...(isDragReject ? rejectBoxStyle : {})
  }), [
    isDragActive,
    isDragAccept,
    isDragReject
  ]);

  let boxText = baseBoxText;
  if (isDragReject) boxText = rejectBoxText;
  if (isDragAccept) boxText = acceptBoxText;

  return (
    <div className="container" style={{width:"100%", height:"65%"}}>
      <div style = {containerStyle} {...getRootProps({boxstyle})}>
        <input {...getInputProps()} />
        <span id="spanBox" style={boxstyle}>{boxText}</span>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  images: state.images
})

const mapDispatchToProps = dispatch => ({
  addImage: image => dispatch(addImage(image))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone)
