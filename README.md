# YOSGO Editor

The editor use React, Typescript, react-quill

# Feature

- Store and Generate with HTMLformat
- Insert image Url and upload image to imgur
- Embeded video with full width and 16:9 ratio
- Basic editor function

# Get start

### Example code

```
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
```

### Editor props

| props         | required | type                           | description                                                              |
| ------------- | -------- | ------------------------------ | ------------------------------------------------------------------------ |
| mode          | no       | string "normal", "simple"      | 簡單模式僅支援粗體、文字超連結、圖片、影片。預設為正常模式               |
| defaultLine   | no       | number                         | 預設編輯器行數。無此屬性編輯器預設一行                                   |
| defaultValue  | no       | string                         | 編輯器初始的 html 內容。例如暫存情境                                     |
| onChange      | no       | function (html: string) => any | 當編輯器改變時取得 html 內容，並執行自訂函示                             |
| imgurClientId | no       | string                         | 圖片上傳至指定 imgur application。無此屬性編輯器僅提供貼上圖片網址的功能 |

### Viewer props

| props | required | type   | description                                                                |
| ----- | -------- | ------ | -------------------------------------------------------------------------- |
| html  | yes      | string | 顯示 HTML 內容。透過 Viewer 元件，讓編輯情境與查看情境時的內容樣式保持一致 |

### Run Demo

```
// Build package to demo folder
// Move to demo folder and run demo at localhost:3000
$ yarn build
$ cd demo
$ yarn && yarn start
```

# Relative issue tracking

- [react-quill build issue solve with "esModuleInterop": true](https://github.com/quilljs/delta/issues/33)
- [react-quill build issue solve with "resolutions": {"@types/quill": "1.3.6" }](https://github.com/zenoamaro/react-quill/issues/415)

# Helpful resource

- [Customize image upload and elements](https://github.com/zenoamaro/react-quill/issues/169)
- [Ref in typescript](https://stackoverflow.com/questions/33796267/how-to-use-refs-in-react-with-typescript)
- [Image update example](http://chenamin.com/2017/11/16/React-quill-%E5%88%9D%E4%BD%93%E9%AA%8C/)
- [quill-react use ref](https://github.com/zenoamaro/react-quill#methods)
- [Ref easier way](https://github.com/zenoamaro/react-quill/issues/410)
- [Embeded block customize](https://github.com/quilljs/quill/issues/2380)
- [Nest blot](https://github.com/quilljs/parchment/issues/30#issuecomment-341017210)
- [Imgur api reference](https://apidocs.imgur.com/)
- [Quill API doc](https://quilljs.com/docs/api/)
