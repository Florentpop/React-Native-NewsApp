import React, { Component } from "react";
import { Container, Content, List } from "native-base";
import { getArticles } from "../service/news";
import { ActivityIndicator, Alert, View, Text } from "react-native";
import DataItem from "../component/dataItem";
import Modal from "../component/modal";

export default class tab3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
      setModalVisible: false,
      modalArticleData: {},
    };
  }

  handleItemDataOnPress = (articleData) => {
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData,
    });
  };

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {},
    });
  };

  componentDidMount() {
    getArticles("sports").then(
      (data) => {
        this.setState({
          isLoading: false,
          data: data,
        });
      },
      (error) => {
        Alert.alert("Error", "Something went wrong");
      }
    );
  }

  render() {
    console.log(this.state.data);
    let view = this.state.isLoading ? (
      <View>
        <ActivityIndicator animating={this.state.isLoading} />
        <Text style={{ marginTop: 10 }}>Please Wait...</Text>
      </View>
    ) : (
      <List
        dataArray={this.state.data}
        renderRow={(item) => {
          return <DataItem onPress={this.handleItemDataOnPress} data={item} />;
        }}
      />
    );

    return (
      <Container>
        <Content>{view}</Content>
        <Modal
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}
