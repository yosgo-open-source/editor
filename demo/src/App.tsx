import React, { Component } from "react";
import { Editor, Viewer } from "yosgo-editor";
import "./App.css";

class App extends Component {
  constructor(props: any) {
    super(props);
    this.handleHtmlChange = this.handleHtmlChange.bind(this);
  }
  state = {
    html: "",
    defaultValue: "<p>Hi type something</p><p><br></p><p><br></p><p><br></p>"
  };

  handleHtmlChange(html: string) {
    this.setState({ html });
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col">
            <h3>editor example</h3>
            <Editor
              defaultValue={this.state.defaultValue}
              onChange={this.handleHtmlChange}
              imgurClientId="98285ba983cd6ff"
            />
          </div>
          <div className="col">
            <h3>viewer result</h3>
            <Viewer html={this.state.html} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const html = `<div class="yosgo-video-wrap"><iframe src="https://www.youtube.com/embed/wSZQ7ivJvLk?showinfo=0" allowfullscreen="true" frameborder="0"></iframe></div><p><br></p><p><img src="https://upload.cc/i1/2018/11/09/UAwCSR.png"></p><p><br></p><h2>紅酒燉牛肉</h2><p>這是一道非常棒的料理</p><p><br></p><ul><li>紅蘿波</li><li>紅酒</li><li>牛肉</li></ul>`;
