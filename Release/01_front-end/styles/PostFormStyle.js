import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  background-color: #F5F5F5;
  margin-bottom: 50px;
  textarea {
    width: 100%;
    height: 100px;
    resize: none;
    box-shadow: 2px 2.5px 4px -2px rgba(201,201,201,1);
  }
`;

export const PreViewerArea = styled.div`
  display: flex;
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  & > div{
    width: 300px;
    &:nth-child(2) {
      margin-left: 2px;
      margin-right: 2px;
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 2px;
    padding-bottom: 2px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 15px;
    font-weight: 200;
    font-size: 25px;
    outline: none;
    span:nth-child(2) {
      margin-left: 10px;
      font-size: 17px;
    }
  }
`;

export const CameraIcon = styled.button`
  color: ${
    ({ haveImage }) => haveImage === true ? '#b2bec3' : '#5352ed'
  };
  cursor: ${
    ({ haveImage }) => haveImage === true ? 'default' : 'pointer'
  };
`;

export const VideoIcon = styled.button`
  color: ${
    ({ haveVideo }) => haveVideo === true ? '#b2bec3' : '#5352ed'
  };
  cursor: ${
    ({ haveVideo }) => haveVideo === true ? 'default' : 'pointer'
  };
`;

export const SubmitIcon = styled.button`
  color: #5352ed
`;