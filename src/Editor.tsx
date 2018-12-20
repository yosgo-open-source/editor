import * as React from "react";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import * as Modal from "react-modal";
import "react-quill/dist/quill.snow.css";

/**
 * 客製 block
 * replace origin video
 */
const BlockEmbed = Quill.import("blots/block/embed");
class VideoContainer extends BlockEmbed {
  static create(value: any) {
    const node = super.create();
    node.setAttribute("class", "yosgo-video-wrap");
    const child = document.createElement("iframe");
    child.setAttribute("src", value);
    child.setAttribute("frameborder", "0");
    child.setAttribute("allowfullscreen", "true");
    node.appendChild(child);
    return node;
  }

  static value(node: any) {
    return node.getAttribute("src");
  }
}

VideoContainer.blotName = "video";
VideoContainer.tagName = "div";
Quill.register(VideoContainer);

type Props = {
  value: string;
  onChange: (html: string) => void;
  mode?: "normal" | "simple";
  imgurClientId?: string;
};

export default class Editor extends React.PureComponent<Props> {
  private reactQuillRef: any;
  constructor(props: Props) {
    super(props);
    this.reactQuillRef = null;
  }

  state = {
    isOpen: false,
    imageUrl: "",
    uploadingText: "拖曳圖片至此上傳"
  };

  formats = () => {
    const normal_formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "list",
      "bullet",
      "link",
      "image",
      "video"
    ];
    const simple_modules = ["bold", "link", "image", "video"];
    switch (this.props.mode) {
      case "normal": {
        return normal_formats;
      }
      case "simple": {
        return simple_modules;
      }
      default: {
        return normal_formats;
      }
    }
  };

  modules = () => {
    const normal_modules = {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"]
        ],
        handlers: {
          image: this.imageHandler
        }
      },
      clipboard: {
        matchVisual: false
      }
    };
    const simple_modules = {
      toolbar: {
        container: [["bold"], ["link"], ["image"], ["video"]],
        handlers: {
          image: this.imageHandler
        }
      }
    };
    switch (this.props.mode) {
      case "normal": {
        return normal_modules;
      }
      case "simple": {
        return simple_modules;
      }
      default: {
        return normal_modules;
      }
    }
  };

  imageHandler = () => {
    const { imageUrl, isOpen } = this.state;
    if (!isOpen) {
      this.setState({ isOpen: true });
    } else {
      if (this.state.imageUrl === "") {
        alert("圖片網址不存在，貼上圖片網址或是直接上傳圖片");
        return;
      }
      this.reactQuillRef.getEditor().focus(); // open modal will lose focus
      const range = this.reactQuillRef.getEditor().getSelection();
      this.reactQuillRef
        .getEditor()
        .insertEmbed(range ? range.index : 0, "image", imageUrl);
      this.setState({
        isOpen: false,
        imageUrl: "",
        uploadingText: "拖曳圖片至此上傳"
      });
    }
  };

  imageInput = (e: any) => {
    this.setState({ imageUrl: e.target.value });
  };

  imageUploader = (e: any) => {
    const request = new XMLHttpRequest();
    const data = new FormData();
    const file = e.target.files[0];
    const updateImageUrl = (imageUrl: string) => {
      this.setState({ imageUrl });
    };
    if (file) {
      data.append("image", file);
      request.open("POST", "https://api.imgur.com/3/image");
      request.setRequestHeader(
        "Authorization",
        `Client-ID ${this.props.imgurClientId}`
      );
      request.onreadystatechange = function() {
        if (request.status === 200 && request.readyState === 4) {
          let response = JSON.parse(request.responseText);
          const imageUrl = response.data.link;
          if (imageUrl) {
            updateImageUrl(imageUrl);
          }
        }
      };
      request.upload.addEventListener("progress", oEvent => {
        if (oEvent.lengthComputable) {
          let percentComplete = Math.ceil((oEvent.loaded / oEvent.total) * 100);
          this.setState({
            uploadingText: `正在上傳(${percentComplete}%)`
          });
        } else {
          this.setState({ uploadingText: "正在上傳" });
        }
      });
      request.send(data);
    }
  };

  onRequestClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, imageUrl, uploadingText } = this.state;
    const { imgurClientId, onChange } = this.props;
    return (
      <Wrap>
        <ReactQuill
          ref={el => {
            this.reactQuillRef = el;
          }}
          className="yosgo-editor"
          value={this.props.value}
          onChange={onChange}
          formats={this.formats()}
          modules={this.modules()}
        />
        <Modal
          isOpen={isOpen}
          onRequestClose={this.onRequestClose}
          style={customStyles}
          contentLabel="image-upload"
          ariaHideApp={false}
        >
          <ModalContent>
            <p>圖片網址</p>
            <input onChange={e => this.imageInput(e)} value={imageUrl} />
          </ModalContent>
          {imgurClientId ? (
            <ModalUpload uploadingText={uploadingText}>
              {imageUrl && imageUrl !== "" ? (
                <img className="img" src={imageUrl} />
              ) : (
                <input type="file" onChange={e => this.imageUploader(e)} />
              )}
            </ModalUpload>
          ) : null}
          <ModalAction onClick={() => this.imageHandler()}>確認</ModalAction>
        </Modal>
      </Wrap>
    );
  }
}

const ModalAction = styled.div`
  display: block;
  width: 60px;
  padding: 5px 0;
  text-align: center;
  cursor: pointer;
  margin: 20px auto 0 auto;
  border-radius: 4px;
  background: #00b5ad;
  color: white;
  transition: 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;
const ModalUpload = styled.div<{
  uploadingText: string;
}>`
  width: 270px;
  box-sizing: border-box;
  border: 1px dotted lightgray;
  border-radius: 3px;
  position: relative;
  img {
    position: relative;
    max-height: 270px;
    max-width: 270px;
    object-fit: cover;
    margin: 0 auto;
    display: block;
    z-index: 3;
  }
  &:before {
    cursor: pointer;
    content: "${({ uploadingText }) =>
      uploadingText ? uploadingText : "拖曳圖片至此上傳"}";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: rgba(55, 55, 55, 0.98);
  }
  input {
    cursor: pointer;
    display: block;
    width: 270px;
    height: 270px;
    box-sizing: border-box;
    opacity: 0;
  }
`;
const ModalContent = styled.div`
  p {
    font-size: 14px;
    display: block;
    padding: 0 0 0 1px;
    margin: 0;
    color: rgba(55, 55, 55, 0.98);
  }
  input {
    display: block;
    height: 36px;
    width: 270px;
    border: 1px solid lightgray;
    border-radius: 2px;
    margin: 4px 0 10px 0;
    font-size: 15px;
    padding: 0 10px;
    box-sizing: border-box;
  }
`;
const Wrap = styled.div`
  width: 100%;
  position: relative;
  .yosgo-editor {
    .ql-toolbar {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .ql-container {
      font-size: 14.8px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  img {
    transition: 0.2s;
    display: block;
    position: relative;
    width: 100%;
    max-woidth: 100%;
    height: auto;
    object-fit: cover;
    &:hover {
      cursor: pointer;
      box-shadow: 1px 1px 1px 1px rgba(55, 55, 55, 0.3);
    }
  }
  .yosgo-video-wrap {
    position: relative;
    padding-bottom: 56.25%; /*16:9*/
    padding-top: 30px;
    height: 0;
    overflow: hidden;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

const customStyles = {
  overlay: {
    zIndex: 2
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
