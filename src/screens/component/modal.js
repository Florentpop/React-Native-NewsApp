import React, { Component } from "react";
import { Dimensions, Modal, Share } from "react-native";
import { WebView } from "react-native-webview";
import {
  Container,
  Header,
  Body,
  Title,
  Right,
  Left,
  Button,
  Icon,
  Content,
} from "native-base";

const webViewHeight = Dimensions.get("window").height - 120;

export default class modal extends Component {
  constructor(props) {
    super(props);
  }

  handleClose = () => {
    return this.props.onClose();
  };

  handleShare = () => {
    const { url, title } = this.props.articleData;
    message = `${title}\n\nRead More @${url}\n\nShared via News App`;
    return Share.share(
      { title, message, url: message },
      { dialogTitle: `Share ${title}` }
    );
  };

  render() {
    const { showModal, articleData } = this.props;
    const { url } = articleData;
    if (url != undefined) {
      return (
        <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={this.handleClose}
        >
          <Container
            style={{ margin: 15, marginBottom: 0, backgroundColor: "#fff" }}
          >
            <Header style={{ backgroundColor: "#009387" }}>
              <Left>
                <Button onPress={this.handleClose} transparent>
                  <Icon name="close" style={{ color: "white", fontsize: 12 }} />
                </Button>
              </Left>
              <Body>
                <Title
                  children={articleData.title}
                  style={{ color: "white" }}
                />
              </Body>
              <Right>
                <Button onPress={this.handleShare} transparent>
                  <Icon name="share" style={{ color: "white", fontsize: 12 }} />
                </Button>
              </Right>
            </Header>
            <Content contentContainerStyle={{ height: webViewHeight }}>
              <WebView
                source={{ uri: url }}
                style={{ flex: 1 }}
                onError={this.handleClose}
                startInLoadingState
                scalePageToFit
              />
            </Content>
          </Container>
        </Modal>
      );
    } else {
      return null;
    }
  }
}
