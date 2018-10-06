import * as React from 'react';
import styled from 'styled-components';

type MarkChildren = {
  children: React.ReactNode;
};
export const BoldMark = ({ children }: MarkChildren) => <strong>{children}</strong>;
export const CodeMark = ({ children }: MarkChildren) => <code>{children}</code>;
export const ItalicMark = ({ children }: MarkChildren) => <em>{children}</em>;
export const StrikethroughMark = ({ children }: MarkChildren) => <del>{children}</del>;
export const UnderlineMark = ({ children }: MarkChildren) => <u>{children}</u>;
export const H1 = ({ children }: MarkChildren) => <h1>{children}</h1>;
export const H2 = ({ children }: MarkChildren) => <h2>{children}</h2>;
export const H3 = ({ children }: MarkChildren) => <h3>{children}</h3>;
export const H4 = ({ children }: MarkChildren) => <h4>{children}</h4>;
export const H5 = ({ children }: MarkChildren) => <h5>{children}</h5>;

type MediaStyleType = {
  selected: boolean;
};
export const ImageBlock = styled.img<MediaStyleType>`
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 100%;
  margin: 4px 0 10px 0;
  transition: 0.1s;
  outline: ${({ selected }) => (selected ? '4px solid #00b5ad' : 'none')};
`;
export const VideoIframeBlock = styled.div<MediaStyleType>`
  position: relative;
  margin: 4px 0 10px 0;
  transition: 0.1s;
  outline: ${({ selected }) => (selected ? '4px solid #00b5ad' : 'none')};
  width: 100%;
  padding-top: 56.25%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 0px;
    height: 100%;
    width: 100%;
    display: block;
    border-radius: 2px;
    overflow: hidden;
  }
  .mask {
    display: ${({ selected }) => (selected ? 'none' : 'block')};
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: cell;
    z-index: 1;
    background: rgba(55, 55, 55, 0.01);
  }
`;
