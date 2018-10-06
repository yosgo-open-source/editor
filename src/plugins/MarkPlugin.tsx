import { Change } from 'slate';
import { RenderMarkProps } from 'slate-react';
import {
  BoldMark,
  CodeMark,
  ItalicMark,
  StrikethroughMark,
  UnderlineMark,
  H1,
  H2,
  H3,
  H4,
  H5
} from '../components/render';
import * as React from 'react';

/**
 * 熱鍵函式 tpye
 */
type OptionsType = {
  type: string;
  key: string;
};

/**
 * 熱鍵函式
 */
const MarkHotkey = (options: OptionsType) => {
  const { type, key } = options;
  return {
    onKeyDown(event: any, change: Change) {
      if (!event.ctrlKey || event.key != key) return;
      event.preventDefault();
      change.toggleMark(type);
    }
  };
};

/**
 * 套用 Mark
 */
export const renderMark = (props: RenderMarkProps) => {
  const children = props.children;
  switch (props.mark.type) {
    case 'bold':
      return <BoldMark children={children} />;
    case 'code':
      return <CodeMark children={children} />;
    case 'italic':
      return <ItalicMark children={children} />;
    case 'strikethrough':
      return <StrikethroughMark children={children} />;
    case 'underline':
      return <UnderlineMark children={children} />;
    case 'h1':
      return <H1 children={children} />;
    case 'h2':
      return <H2 children={children} />;
    case 'h3':
      return <H3 children={children} />;
    case 'h4':
      return <H4 children={children} />;
    case 'h5':
      return <H5 children={children} />;
    default:
      return <div>{children}</div>;
  }
};

/**
 * Plugin 用的陣列
 */
export const MarkHotKeyPluginArray = [
  /** Mark 插件 */
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: 'c', type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 's', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
  MarkHotkey({ key: '1', type: 'h1' }),
  MarkHotkey({ key: '2', type: 'h2' }),
  MarkHotkey({ key: '3', type: 'h3' }),
  MarkHotkey({ key: '4', type: 'h4' }),
  MarkHotkey({ key: '5', type: 'h5' })
];
