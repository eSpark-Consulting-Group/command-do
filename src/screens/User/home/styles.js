import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  },
  headerContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: height * 0.015,
  }, 
  headerCenterComponentStyle: {flexDirection: 'row', alignItems: 'flex-end'},
  categoryContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: height * 0.015,
  },
  categoryImage: {
    height: height * 0.05,
    width: height * 0.05,
    borderRadius: height * 0.05,
    marginRight: height * 0.003,
  },
  cartContainerStyle: {
    position: 'absolute',
    bottom: height * 0.02,
    right: height * 0.015,
    width: height * 0.08,
    height: height * 0.08,
    borderRadius: height * 0.1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: height * 0.003,
  },
  cartAmountStyle: {
    height: height * 0.038,
    width: height * 0.038,
    backgroundColor: '#fff',
    borderRadius: height * 1,
    position: 'absolute',
    right: height * -0.008,
    top: height * -0.008,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: height * 0.005,
  }
});

export default styles;
