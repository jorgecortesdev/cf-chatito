import React from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { View, Platform, KeyboardAvoidingView } from "react-native";

export default class Chat extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    let { name } = this.props.route.params;

    this.props.navigation.setOptions({ title: name });

    this.setState({
      messages: [
        {
          _id: 3,
          text: `${name} has just entered this chat`,
          createdAt: new Date(),
          system: true,
        },
        {
          _id: 2,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Test Bot",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 1,
          text: `Test Bot entered this chat`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.route.params.backgroundColor,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{ _id: 1 }}
        />

        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
