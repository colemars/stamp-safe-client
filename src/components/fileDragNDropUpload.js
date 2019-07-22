import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const boxStyle={
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

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  width: "100%",
  height: "100%",
  borderColor: '#eeeeee',
  backgroundColor: '#fafafa',
  color: 'white',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  background: "rgb(79,169,185)",
  background: "linear-gradient(229deg, rgba(79,169,185,0.7525385154061625) 24%, rgba(210,27,27,0.3267682072829131) 87%)",
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744' 
};

export default function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*', noClick:"true"});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="container" style={{width:"100%", height:"65%"}}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <span id="spanBox" style={boxStyle}>Drop Images Here</span>
      </div>
    </div>
  );
}