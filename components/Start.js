import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      backgroundColor: "#fff",
      pressed: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg-image.png")}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <Text style={styles.appTitle}>Chatito</Text>

          <View style={styles.settings}>
            <View style={styles.nameInputContainer}>
              <Image
                style={styles.userIcon}
                source={require("../assets/user-icon.png")}
              />
              <TextInput
                style={[styles.nameInput]}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>
            <View>
              <Text style={styles.chooserFont}>Choose Background Color:</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={[
                    styles.colorXContainer,
                    {
                      borderColor:
                        this.state.pressed === "color1" ? "#090c08" : "#fff",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.colorX, styles.color1]}
                    onPress={() =>
                      this.setState({
                        backgroundColor: "#090c08",
                        pressed: "color1",
                      })
                    }
                  />
                </View>
                <View
                  style={[
                    styles.colorXContainer,
                    {
                      borderColor:
                        this.state.pressed === "color2" ? "#474056" : "#fff",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.colorX, styles.color2]}
                    onPress={() =>
                      this.setState({
                        backgroundColor: "#474056",
                        pressed: "color2",
                      })
                    }
                  />
                </View>
                <View
                  style={[
                    styles.colorXContainer,
                    {
                      borderColor:
                        this.state.pressed === "color3" ? "#8a95a5" : "#fff",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.colorX, styles.color3]}
                    onPress={() =>
                      this.setState({
                        backgroundColor: "#8a95a5",
                        pressed: "color3",
                      })
                    }
                  />
                </View>
                <View
                  style={[
                    styles.colorXContainer,
                    {
                      borderColor:
                        this.state.pressed === "color4" ? "#b9c6ae" : "#fff",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.colorX, styles.color4]}
                    onPress={() =>
                      this.setState({
                        backgroundColor: "#b9c6ae",
                        pressed: "color4",
                      })
                    }
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  backgroundColor: this.state.backgroundColor,
                })
              }
            >
              <Text style={styles.startButtonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    padding: 22,
  },
  settings: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
  },
  appTitle: {
    flex: 1.5,
    color: "#fff",
    fontSize: 45,
    lineHeight: 100,
    fontWeight: "600",
    textAlign: "center",
  },
  nameInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#757083",
  },
  userIcon: {
    padding: 10,
    margin: 12,
  },
  nameInput: {
    flex: 1,
    color: "#757083",
    opacity: 50,
    fontSize: 16,
    fontWeight: "300",
  },
  chooserFont: {
    color: "#757083",
    fontSize: 16,
    fontWeight: "300",
    opacity: 100,
  },
  colorXContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  colorX: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color1: {
    backgroundColor: "#090c08",
  },
  color2: {
    backgroundColor: "#474056",
  },
  color3: {
    backgroundColor: "#8a95a5",
  },
  color4: {
    backgroundColor: "#b9c6ae",
  },
  startButton: {
    backgroundColor: "#757083",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
