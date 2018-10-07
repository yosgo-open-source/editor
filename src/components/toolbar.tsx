import * as React from "react";
import { Value, Mark } from "slate";
import styled from "styled-components";
import * as Modal from "react-modal";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaImage,
  FaVideo
} from "react-icons/fa";

import { ImageBlock, VideoIframeBlock } from "./render";

import Uploader from "../components/uploader";

import { getYoutubeId, getYoutubeEmbedUrl } from "../utils/handleYoutube";

type Props = {
  value: Value;
  updateValue: ({ value }: { value: Value }) => void;
  imgurClientId?: string;
};

class Toolbar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    modalIsOpen: false,
    modalContentType: "",
    imageUrl: "",
    videoUrl: ""
  };

  /**
   * Mark性質按鈕
   */
  renderMarkButton = (type: string, i: number) => {
    const { value, updateValue } = this.props;
    const active = value.activeMarks.some((mark: Mark) => mark.type == type);
    return (
      <Button
        key={`${type}-${i}`}
        active={active}
        onMouseDown={event => {
          event.preventDefault();
          const handleMark = value.change().toggleMark(type);
          updateValue(handleMark);
        }}
      >
        {renderIcon(type)}
      </Button>
    );
  };

  /**
   * 媒體性質按鈕
   */
  renderFunctionButton = (type: string, i: number) => {
    return (
      <Button key={`${type}-${i}`} onClick={() => this.opneModal(type)}>
        {renderIcon(type)}
      </Button>
    );
  };

  /**
   * 操作媒體事件
   */
  handleMediaUrlChange = (type: string, value: string) => {
    if (type === "image") this.setState({ imageUrl: value });
    if (type === "video") this.setState({ videoUrl: value });
  };
  handleImageUrl = (event: any) => {
    event.preventDefault();
    const { imageUrl } = this.state;
    const { value, updateValue } = this.props;
    if (!imageUrl || imageUrl === "") {
      alert("圖片網址不存在");
      return;
    }
    const addImageChange = value.change().insertBlock({
      type: "image",
      data: { src: imageUrl }
    });
    updateValue(addImageChange);
    this.closeModal();
  };
  handleVideoUrl = (event: any) => {
    event.preventDefault();
    const { videoUrl } = this.state;
    const { value, updateValue } = this.props;
    const id = getYoutubeId(videoUrl);
    const src = getYoutubeEmbedUrl(id);
    if (!videoUrl || videoUrl === "") {
      alert("影片網址不存在");
      return;
    }
    const addVideoChange = value.change().insertBlock({
      type: "video",
      data: { src }
    });
    updateValue(addVideoChange);
    this.closeModal();
  };
  handleKeypress = (event: any, type: string) => {
    const isEnterKey = event.key === "Enter";
    const isImage = type === "image";
    const isVideo = type === "video";
    if (isEnterKey && isImage) this.handleImageUrl(event);
    else if (isEnterKey && isVideo) this.handleVideoUrl(event);
  };
  handleImageUploadUrl = (url: string) => {
    this.setState({ imageUrl: url });
  };

  /**
   * 操作 Modal
   */
  opneModal = (type: string) => {
    this.setState({ modalIsOpen: true, modalContentType: type });
  };
  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      modalContentType: "",
      imageUrl: "",
      videoUrl: ""
    });
  };

  /**
   * 渲染 Toolbar
   */
  render() {
    const {
      closeModal,
      renderMarkButton,
      renderFunctionButton,
      handleImageUrl,
      handleVideoUrl,
      handleMediaUrlChange,
      handleKeypress
    } = this;
    const { modalIsOpen, modalContentType, videoUrl, imageUrl } = this.state;
    const { imgurClientId } = this.props;
    return (
      <div>
        <ToolbarWrap>
          {markTypeArray.map((type, i) => renderMarkButton(type, i))}
          {markSizeArray.map((type, i) => renderMarkButton(type, i))}
          {mediaArray.map((type, i) => renderFunctionButton(type, i))}
        </ToolbarWrap>
        <Modal
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={true}
          style={modalStyles}
          onRequestClose={closeModal}
          contentLabel="Media Modal"
          ariaHideApp={false}
        >
          <ModalContentWrap>
            <h3>
              {modalContentType === "image" ? "插入圖片 " : ""}
              {modalContentType === "video" ? "插入影片 " : ""}
              {modalContentType === "image" ? renderIcon("image") : ""}
              {modalContentType === "video" ? renderIcon("video") : ""}
            </h3>
            <h4>
              {modalContentType === "image"
                ? "貼上圖片網址或是直接上傳圖片(10MB內)"
                : ""}
              {modalContentType === "video"
                ? "請直接輸入 Youtube 的影片網址"
                : ""}
            </h4>
            <input
              onChange={e =>
                handleMediaUrlChange(modalContentType, e.target.value)
              }
              onKeyPress={e => handleKeypress(e, modalContentType)}
              placeholder={
                modalContentType === "image"
                  ? "請貼上圖片網址"
                  : "請貼上 youtube 網址"
              }
            />
            {modalContentType === "image" && imgurClientId ? (
              <div>
                <p className="or">或者</p>
                <Uploader
                  onImageUrlChange={(url: string) =>
                    this.handleImageUploadUrl(url)
                  }
                  imgurClientId={imgurClientId}
                />
              </div>
            ) : null}
            <ActionWrap>
              <p onClick={() => this.closeModal()} className="closeModal">
                返回
              </p>
              {modalContentType === "image" ? (
                <button
                  disabled={imageUrl === "" || !imageUrl}
                  onClick={e => handleImageUrl(e)}
                >
                  完成
                </button>
              ) : null}
              {modalContentType === "video" ? (
                <button
                  disabled={videoUrl === "" || !videoUrl}
                  onClick={e => handleVideoUrl(e)}
                >
                  完成
                </button>
              ) : null}
            </ActionWrap>
          </ModalContentWrap>
        </Modal>
      </div>
    );
  }
}

export default Toolbar;

/**
 * 渲染 客製 Block
 */
export const renderNode = (props: any) => {
  const { attributes, node, isFocused, isSelected, readOnly } = props;
  switch (node.type) {
    case "image": {
      const src = node.data.get("src");
      return (
        <ImageBlock
          src={src}
          selected={readOnly ? false : isFocused}
          {...attributes}
        />
      );
    }
    case "video": {
      const src = node.data.get("src");
      return (
        <VideoIframeBlock selected={isSelected} {...attributes}>
          {readOnly ? null : <div className="mask" />}
          <iframe src={src} />
        </VideoIframeBlock>
      );
    }
    default: {
      return;
    }
  }
};

/**
 * 輔助函示
 */
const markTypeArray = ["bold", "italic", "underline", "strikethrough"];
const markSizeArray = ["h1", "h2", "h3", "h4", "h5"];
const mediaArray = ["image", "video"];
const renderIcon = (type: string) => {
  switch (type) {
    case "bold":
      return <FaBold />;
    case "italic":
      return <FaItalic />;
    case "underline":
      return <FaUnderline />;
    case "strikethrough":
      return <FaStrikethrough />;
    case "h1":
      return "H1";
    case "h2":
      return "H2";
    case "h3":
      return "H3";
    case "h4":
      return "H4";
    case "h5":
      return "H5";
    case "image":
      return <FaImage />;
    case "video":
      return <FaVideo />;
    default:
      return;
  }
};

/**
 * 樣式
 */
const modalStyles = {
  overlay: {
    zIndex: 1
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

/**
 * 客製樣式元件
 */
const ToolbarWrap = styled.div`
  border: 1px solid rgba(124, 124, 124, 0.2);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 50px;
  padding: 0 10px;
`;

type ButtonStyleType = {
  active?: Boolean;
};
const Button = styled.div<ButtonStyleType>`
  border: ${({ active }) =>
    active ? "1px solid #00b5ad" : "1px solid rgba(55,55,55,0.1)"};
  color: ${({ active }) => (active ? "white" : "black")};
  background: ${({ active }) => (active ? "#00b5ad" : "white")};
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  transition: 0.1s;
  border-radius: 4px;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
  &:hover {
    background: #00b5ad;
    color: white;
  }
`;
const ModalContentWrap = styled.div`
  h3 {
    font-size: 16.5px;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    svg {
      margin-left: 4px;
    }
  }
  h4 {
    font-size: 13px;
    color: rgba(55, 55, 55, 0.9);
    margin-bottom: 20px;
  }
  input {
    box-sizing: border-box;
    width: 300px;
    margin: 0 0 0;
    padding: 5px;
    height: 36px;
    font-size: 14px;
    border-radius: 2px;
    border: 1px solid lightgray;
  }
  .or {
    margin: 10px 0;
    text-align: center;
    color: rgba(55, 55, 55, 0.9);
    font-size: 13px;
  }
`;
const ActionWrap = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1px;
  button {
    text-decoration: underline;
    background: rgba(0, 0, 0, 0);
    border: 0;
    float: right;
    font-size: 14px;
    padding: 0;
  }
  .closeModal {
    cursor: pointer;
    font-size: 12.4px;
    color: rgba(55, 55, 55, 1);
    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }
`;
