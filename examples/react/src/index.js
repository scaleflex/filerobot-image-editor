import { useState } from 'react';
import { render } from 'react-dom';
import FilerobotImageEditor from '../../../src';


const App = () => {
  const src = 'https://cdn.scaleflex.it/demo/stephen-walker-unsplash.jpg';
  const [show, toggle] = useState(false);


  return (
    <div>
      <h1>Filerobot Image Editor</h1>

      <img src={src} onClick={() => { toggle(true) }} alt="example image" style={{ maxWidth: '100%' }}/>

      <FilerobotImageEditor
        show={show}
        src={src}
        onClose={() => { toggle(false) }}
        onOpen={() => console.log('Editor is opened.')}
        onComplete={(props) => { console.log(props) }}
        onBeforeComplete={(props) => { console.log(props); return false; }}
      />
    </div>
  )
};

render(<App/>, document.getElementById('app'));

//import { Component } from 'react';
//import { render } from 'react-dom';
//import FilerobotImageEditor from '../../../src';


//const config = {
//  filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
//  filerobotContainer: 'scaleflex-tests-v5a',
//  // elementId: '',
//  // uploadParams: {},
//};

//class App extends Component {
//  constructor() {
//    super();
//
//    this.state = {
//      isShow: false,
//      imgSrc: '//scaleflex.ultrafast.io/https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/koala.jpg'
//    }
//  }
//
//  showImageEditor = () => {
//    this.setState({ isShow: true });
//  }
//
//  //onComplete = (newUrl) => {
//  //  this.setState({ imgSrc: newUrl });
//  //}
//
//  onClose = () => {
//    this.setState({ isShow: false });
//  }
//
//  render() {
//    const { imgSrc, isShow } = this.state;
//
//    return (
//      <div>
//        <h1>Filerobot Image Editor</h1>
//
//        <img src={imgSrc} onClick={this.showImageEditor} alt="example image"/>
//
//        <FilerobotImageEditor
//          show={isShow}
//          src={imgSrc}
//          //config={config}
//          //onComplete={this.onComplete}
//          onClose={this.onClose}
//        />
//      </div>
//    )
//  }
//}
//
//render(<App/>, document.getElementById('app'));