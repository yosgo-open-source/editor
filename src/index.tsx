import * as React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from "styled-components";

import Toolbar from "./components/toolbar";
import { renderNode } from "./components/toolbar";
import EditorHint from "./components/editorHint";

import { MarkHotKeyPluginArray, renderMark } from "./plugins/MarkPlugin";

import valueConfig from "./utils/valueConfig";
import schema from "./utils/schema";

/**
 * Example
  <YOSGOEditor 
    onChange={(value: any) => console.log(value)} 
    defaultValue={value}
  />

 * Example 
  <YOSGOEditor 
    readOnly
    defaultValue={value}
  />
 */

type Props = {
  readOnly?: boolean;
  placeHolder?: string;
  defaultValue?: string;
  onChange: (value: string) => any;
};

export default class YOSGOEditor extends React.PureComponent<Props> {
  state = {
    value: Value.fromJSON(
      this.props.defaultValue
        ? JSON.parse(this.props.defaultValue)
        : valueConfig(this.props.placeHolder)
    )
  };

  /**
   * 改變內容
   */
  onChange = ({ value }: { value: Value }) => {
    this.props.onChange(JSON.stringify(value));
    this.setState({ value });
  };

  /**
   * 選染應用
   */
  render() {
    const readOnly = this.props.readOnly ? this.props.readOnly : false;
    return (
      <Wrapper>
        {!readOnly ? (
          <Toolbar value={this.state.value} updateValue={this.onChange} />
        ) : null}
        <Editor
          readOnly={readOnly}
          plugins={plugins}
          value={this.state.value}
          onChange={this.onChange}
          renderMark={renderMark}
          style={readOnly ? ReadOnlyStyle : DefaultEditorStyle}
          renderNode={renderNode}
          schema={schema}
        />
        {!readOnly ? <EditorHint /> : null}
      </Wrapper>
    );
  }
}

/**
 * 引用套件
 */
const plugins = MarkHotKeyPluginArray;

/**
 * 樣式
 */
const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;
const DefaultEditorStyle = {
  border: "1px solid rgba(124,124,124,0.2)",
  padding: "10px",
  minHeight: "400px",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px"
};
const ReadOnlyStyle = {};
