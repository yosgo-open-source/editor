import * as React from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import { format } from "path";

type Props = {
  html: string;
};

export default class Viewer extends React.PureComponent<Props> {
  render() {
    const { html } = this.props;
    const modules = {
      clipboard: {
        matchVisual: false
      }
    };
    return (
      <Wrap>
        {html ? (
          <ReactQuill
            value={html}
            readOnly
            className="yosgo-viewer"
            modules={modules}
          />
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
      font-size: 14.8px;
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
    max-width: 100%;
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
