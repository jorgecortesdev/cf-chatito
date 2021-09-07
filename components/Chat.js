import React from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { View, Platform, KeyboardAvoidingView } from "react-native";

const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        _id: 0,
        name: "",
        avatar: "",
      },
      messages: [],
      backgroundColor: "",
    };

    const firebaseConfig = {
      apiKey: "AIzaSyBWeoKvoP8yslrnDNKggr_9reYJKR1oTw8",
      authDomain: "chatito-app.firebaseapp.com",
      projectId: "chatito-app",
      storageBucket: "chatito-app.appspot.com",
      messagingSenderId: "814653148191",
      appId: "1:814653148191:web:68adb5480acd3f6a32592a",
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  componentDidMount() {
    let { name, backgroundColor } = this.props.route.params;

    // Sign in anonymously
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      // Set the state
      this.setState({
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        },
        backgroundColor: backgroundColor,
      });

      this.referenceChatMessages = firebase.firestore().collection("messages");

      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });

    // Set window title
    this.props.navigation.setOptions({ title: name });
  }

  componentWillUnmount() {
    if (this.referenceChatMessages) {
      this.unsubscribe();
    }
  }

  addMessage() {
    this.referenceChatMessages.add(this.state.messages[0]);
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });

    this.setState({
      messages,
    });
  };

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
          user={{
            _id: this.state.user._id,
            name: this.state.user.name,
            avatar: this.state.user.avatar,
          }}
        />

        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
