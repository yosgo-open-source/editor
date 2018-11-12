import * as React from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";

type Props = {
  html: string;
};

export default class Viewer extends React.PureComponent<Props> {
  render() {
    const { html } = this.props;
    return (
      <Wrap>
        {html ? (
          <ReactQuill value={html} readOnly className="yosgo-viewer" />
        ) : (
          ""
        )}
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  .yosgo-viewer {
    .ql-toolbar {
      display: none;
    }
    .ql-container {
      border: 0px solid #ccc !important;
      .ql-editor {
        padding: 0 !important;
      }
    }
  }
  img {
    display: block;
    position: relative;
    width: 100%;
    max-woidth: 100%;
    height: auto;
    object-fit: cover;
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
