import * as React from "react";
import styled from "styled-components";
import { FaInfoCircle, FaImage, FaVideo } from "react-icons/fa";
import * as Modal from "react-modal";

class EditorHint extends React.Component {
  state = {
    modalIsOpen: false
  };

  opneModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  render() {
    const { modalIsOpen } = this.state;
    const { opneModal, closeModal } = this;
    return (
      <EditorHintWrap>
        <FaInfoCircle className="info" onClick={() => opneModal()} />
        <p className="text" onClick={() => opneModal()}>
          幫助
        </p>
        <Modal
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={true}
          style={modalStyles}
          onRequestClose={closeModal}
          contentLabel="Media Modal"
          ariaHideApp={false}
        >
          <ModalContent>
            <h1>快捷鍵</h1>
            <ol>
              <li>
                粗體：
                <code>ctrl</code> + <code>b</code>
              </li>
              <li>
                斜體：
                <code>ctrl</code> + <code>i</code>
              </li>
              <li>
                底線：
                <code>ctrl</code> + <code>u</code>
              </li>
              <li>
                刪除線：
                <code>ctrl</code> + <code>s</code>
              </li>
              <li>
                標題字：
                <code>ctrl</code> + <code>1、2、3、4、5</code>
              </li>
            </ol>
            <h1>插入媒體</h1>
            <ol>
              <li>
                工具列
                <span className="hint-icon">
                  <FaImage />
                </span>{" "}
                插入圖片網址或是直接上傳
              </li>
              <li>
                工具列
                <span className="hint-icon">
                  <FaVideo />
                </span>{" "}
                插入 youtube 影片
              </li>
            </ol>
          </ModalContent>
        </Modal>
      </EditorHintWrap>
    );
  }
}

export default EditorHint;

/**
 * 樣式
 */
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999
  }
};

const EditorHintWrap = styled.div`
  padding-top: 5px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 12.3px;
  display: flex;
  align-items: center;
  .info {
    margin-right: 3px;
    cursor: pointer;
  }
  .text {
    margin: 0;
    cursor: pointer;
  }
`;

const ModalContent = styled.div`
  h1 {
    margin-top: 0;
    font-size: 16px;
    color: rgba(55, 55, 55, 0.9);
  }
  ol {
    padding: 0 0 0 10px;
    list-style-position: inside;
    li {
      margin-bottom: 15px;
      font-size: 14px;
      .hint-icon {
        font-size: 14px;
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid rgba(55, 55, 55, 0.1);
        border-radius: 4px;
        padding: 5px;
        text-align: center;
        margin: 0 3px;
      }
    }
  }
`;
