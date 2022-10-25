import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerTitlesContainer: {
    width: width * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
    justifyContent: 'space-between',
  },
  headerTitleContainer: {
    width: width * 0.2,
    alignItems: 'center',
    fontSize: width * 0.04,
  },
  headerTitleContainer2: {
    width: width * 0.18,
    alignItems: 'center',
    fontSize: width * 0.04,
  },
  headerTitle: {
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.95,
    paddingVertical: 5,
    borderRadius: 5,
    paddingHorizontal: width * 0.02,
    backgroundColor: '#fff',
    elevation: 5,
    marginVertical: 5,
  },
  cardInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDataContainer: {
    width: width * 0.2,
    alignItems: 'center',
  },
  cardDataContainer2: {
    width: width * 0.18,
    alignItems: 'center',
  },
  cardDataText: {
    fontSize: width * 0.04,
  },
  cardDataMoreText: {
    fontSize: width * 0.03,
  },
});

export default styles;
