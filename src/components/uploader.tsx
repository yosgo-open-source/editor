import * as React from 'react';
import styled from 'styled-components';

type Props = {
  onImageUrlChange: Function;
  clientId: string;
};

class Uploader extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    uploadLink: '',
    isDrag: false,
    uploadingText: ''
  };

  updateUploadLink = (url: string) => {
    this.setState({ uploadLink: url });
  };

  handleDrage = (bool: boolean) => {
    this.setState({ isDrag: bool });
  };

  onChange = (e: any) => {
    const request = new XMLHttpRequest();
    const data = new FormData();
    const file = e.target.files[0];
    const { onImageUrlChange } = this.props;
    const { updateUploadLink } = this;
    if (file) {
      data.append('image', file);
      request.open('POST', 'https://api.imgur.com/3/image');
      request.setRequestHeader('Authorization', `Client-ID ${this.props.clientId}`);
      request.onreadystatechange = function() {
        if (request.status === 200 && request.readyState === 4) {
          let response = JSON.parse(request.responseText);
          const imageUrl = response.data.link;
          if (imageUrl) {
            updateUploadLink(imageUrl);
            onImageUrlChange(imageUrl);
          }
        }
      };
      request.upload.addEventListener('progress', oEvent => {
        if (oEvent.lengthComputable) {
          var percentComplete = Math.ceil((oEvent.loaded / oEvent.total) * 100);
          this.setState({ uploadingText: percentComplete });
        } else {
          this.setState({ uploadingText: '上傳中，請稍候' });
        }
      });
      request.send(data);
    }
  };

  render() {
    const { uploadLink, isDrag, uploadingText } = this.state;
    return (
      <UploaderWrap>
        {/* upload image */}
        {uploadLink === '' ? (
          <UploadArea
            onDragOver={() => this.handleDrage(true)}
            onDragExit={() => this.handleDrage(false)}
            isDrag={isDrag}
            uploadingText={uploadingText}
          >
            <input className="uploadInput" type="file" onChange={e => this.onChange(e)} />
          </UploadArea>
        ) : null}
        {/* process and display */}
        {uploadLink && uploadLink !== '' ? <img src={uploadLink} alt="upload preview" /> : null}
      </UploaderWrap>
    );
  }
}

export default Uploader;

/**
 * 客製元件樣式
 */
const UploaderWrap = styled.div`
  position: relative;
  width: 100%;
  img {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid lightgray;
    width: 300px;
    box-sizing: border-box;
    height: auto;
    object-fit: cover;
  }
`;

type UploadAreaProps = {
  isDrag: boolean;
  uploadingText: string;
};
const UploadArea = styled.div<UploadAreaProps>`
  border: 2px dotted lightgray !important;
  background: ${({ isDrag }) => (isDrag ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0)')};
  position: relative;
  transition: 0.1s;
  border-radius: 3px;
  over-flow: hidden;
  &:before {
    content: "${({ uploadingText }) =>
      uploadingText === '' ? '拖曳圖片至此上傳' : `上傳中(${uploadingText}%)`}";
    position: absolute;
    width: calc(100% - 2px);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: gray;
  }
  .uploadInput {
    width: 300px;
    box-sizing: border-box;
    height: 260px !important;
    cursor: pointer;
    overflow: hidden;
    text-align: center;
    opacity: 0;
  }
`;
