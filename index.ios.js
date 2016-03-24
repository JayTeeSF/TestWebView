/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import Dimensions from 'Dimensions';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';

/* TBD: try adding this to the HTML:
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
*/

const PRE_HTML = `
<!DOCTYPE html>
<html>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
  <body>
`;
const POST_HTML = `
  </body>
</html>
`;
const BGWASH = 'rgba(255,255,255,0.8)';

class TestWebView extends Component {
  constructor(props) {
    super(props)
    let renderers = ['tinyRender', 'hiddenRender']
    let render_index = Math.floor((Math.random() * 1) + 1);
    this.state = {
      renderMethod: renderers[render_index] // random
    }
  }

  render() {
    if ('tinyRender' == this.state.renderMethod) {
      return this.tinyRender()
    } else {
      return this.hiddenRender()
    }
  }

  tinyRender() {
    console.log("tinyRender")
    return (
      <TouchableOpacity onPress={() => this.otherRenderer()} underlayColor='#dddddd' style={styles.card}>
      <View>
        <WebView
          style={styles.webView}
          source={{html: this.htmlFor("<p>TouchableOpacity: I want to see this HTML snippet</p>")}}
          scalesPageToFit={true}
        />
      </View>
      </TouchableOpacity>
    )
  }

  hiddenRender() {
    console.log("hiddenRender")
    return (
      <TouchableHighlight onPress={() => this.otherRenderer()} underlayColor='#dddddd' style={styles.card}>
        <View>
          <WebView
            style={styles.webView}
            source={{html: this.htmlFor("<p>TouchableHighlight: I want to see this HTML snippet</p>")}}
            scalesPageToFit={true}
          />
        </View>
      </TouchableHighlight>
    )
  }

  htmlFor(htmlSnippet) {
    let htmlText = PRE_HTML + htmlSnippet + POST_HTML
    console.log("presenting HTML: " + htmlText)
    return htmlText
  }

  otherRenderer() {
    var otherRenderMethod = 'tinyRender'
    console.log("Got Click")
    switch (this.state.renderMethod) {
      case 'tinyRender':
        otherRenderMethod = 'hiddenRender'
        break;
      default:
        otherRenderMethod = 'tinyRender'
        break;
    }

    this.setState({renderMethod: otherRenderMethod})
  }
}

const defaultCardWidth = 290
const defaultCardHeight = 290
const defaultScreenWidth = 375
const defaultScreenHeight = 667
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
const actualCardHeight = defaultScreenHeight == screenHeight ? defaultCardHeight : Math.floor((defaultCardHeight / defaultScreenHeight) * screenHeight)
const actualCardWidth = defaultScreenWidth == screenWidth ? defaultCardWidth : Math.floor((defaultCardWidth / defaultScreenWidth) * screenWidth)

const marginTop = Math.floor((screenHeight - actualCardHeight) / 2)
// mt: 188
const marginLeft = Math.floor((screenWidth - actualCardWidth) / 2)
// mL: 42

const styles = StyleSheet.create({
  card: {
    marginTop: marginTop,
    marginLeft: marginLeft,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    width: actualCardWidth,
    height: actualCardHeight,
  },
  webView: {
    backgroundColor: BGWASH,
    top: marginTop,
    left: marginLeft,
    height: actualCardHeight,
    width: actualCardWidth,
  },
});

AppRegistry.registerComponent('TestWebView', () => TestWebView);
