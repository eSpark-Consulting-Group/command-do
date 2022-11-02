import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#00000070',
    position: 'absolute',
    zIndex: 1,
  },
  modalInner: {
    height: height * .2,
    width: width * .3,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: height * .005,
    zIndex: 1,
    top: height * .035,
    left: height * .03,
    elevation: height * .003,
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: 'flex-end',
    padding: height * .01,
    borderBottomWidth: height * .0005,
    borderBottomColor: '#00000050'
  },
  btnIcon: {
    paddingRight: height * .01,
  }
});

export default styles;
