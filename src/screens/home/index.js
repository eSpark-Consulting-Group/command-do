import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StatusBar, ScrollView, Image, LayoutAnimation, UIManager, Platform } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Cards, IndividualCard, CustomizeModal, MyText, DropDownAlert, } from "../../components";
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../../utils/fonts';
import { AllData } from '../../utils/data';
import { Biryani, FastFood, Karahi, Roti, Snacks, Beverages, ProfileImage } from "../../assets/images";
import { changeType } from '../../features/cart/cartSlice';
import { initialDataUpdate } from '../../features/profile/profileSlice';
import styles from './styles';

const { width, height } = Dimensions.get('window');


function Home({ route, navigation }) {
	const childFunc = useRef(null)
	const reduxData = useSelector(store => store);
	const [isModal, setIsModal] = useState(false);
	const [press, setPress] = useState(false);
	const [foodName, setFoodName] = useState([
		{
			name: 'All',
			selected: true,
			data: AllData
		},
		{
			name: 'Biryani',
			selected: false,
			logo: Biryani,
			data: AllData[1]
		},
		{
			name: 'Salan',
			selected: false,
			logo: Karahi,
			data: AllData[2]
		},
		{
			name: 'Roties',
			selected: false,
			logo: Roti,
			data: AllData[3]
		},
		{
			name: 'FastFood',
			selected: false,
			logo: FastFood,
			data: AllData[0]
		},
		{
			name: 'Snacks',
			selected: false,
			logo: Snacks,
			data: AllData[4]
		},
		{
			name: 'Beverages',
			selected: false,
			logo: Beverages,
			data: AllData[5]
		},
	]);
	const [allData, setAllData] = useState([]);
	const [checkTab, setCheckTab] = useState('All');

	if (Platform.OS === 'android') {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
	const dispatch = useDispatch();




	const isSelect = (index) => {
		var isFalseArray = [...foodName];
		foodName.map((item, indexx) => {
			if (indexx == index) {

				[...isFalseArray, isFalseArray[indexx].selected = true]
				setAllData(item.data)
				setCheckTab(item.name)
				dispatch(changeType(item.name));
			} else {

				[...isFalseArray, isFalseArray[indexx].selected = false]
			}
		}
		)
		setFoodName(isFalseArray)
	}

	useEffect(() => {
		const profileData = {
			name: "Rohail",
			email: "rohail@esparkconsultants.com",
			phone: "03161145075",
			shift: "Shift C",
			image: ProfileImage
		}

		setAllData(foodName[0].data)
		dispatch(initialDataUpdate(profileData))
		// console.log('navigaiton-->', reduxData);
	}, [])

	const _onSelect = () => {
		if (reduxData?.cart?.amount == 0) {
			childFunc.current()
			setPress(true)
		} else {
			navigation.navigate('Cart')
		}
	};
	const isModalVisible = () => {
		LayoutAnimation.configureNext({
			duration: 300,
			create: {
				type: LayoutAnimation.Types.easeInEaseOut,
				property: LayoutAnimation.Properties.opacity,
			},
			update: {
				type: LayoutAnimation.Types.easeInEaseOut,
			},
		});
		setIsModal(!isModal)
	}
	
	const goToNavigation = (navigate) => {
		navigation.navigate(navigate)
		setIsModal(!isModal)
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white',
			}}>
			<DropDownAlert
				childFunc={childFunc}
				setPress={() => setPress(false)}
				message={`Your cart is empty\nPlease add some items in your cart.`}
				type="info"
				title='Warning'
			/>
			{/* <StatusBar hiddens={true} /> */}
			<CustomizeModal
				isVisible={isModal}
				setBackDrop={isModalVisible}
				navigation={navigation}
				renderData={
					<View style={styles.modalInner}>
						<TouchableOpacity
							style={styles.buttonContainer}
							onPress={() => goToNavigation('Profile')}
						>
							<Icon name="person" size={height * .025} color='#11a79c' style={styles.btnIcon} />
							<MyText label={"Profile"} title style={{ color: "#00000080", }} />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonContainer}
						// onPress={() => navigation.navigate('Home')}
						>
							<Icon name="settings-sharp" size={height * .025} color='#11a79c' style={styles.btnIcon} />
							<MyText label={"Setting"} title style={{ color: "#00000080", }} />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonContainer}
						// onPress={() => navigation.navigate('Home')}
						>
							<Icon name="ios-newspaper" size={height * .025} color='#11a79c' style={styles.btnIcon} />
							<MyText label={"Order"} title style={{ color: "#00000080", }} />
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.buttonContainer, { borderBottomWidth: height * 0, }]}
							onPress={() => goToNavigation('Login')}
						>
							<Icon name="ios-exit" size={height * .025} color='#11a79c' style={styles.btnIcon} />
							<MyText label={"Log out"} title style={{ color: "#00000080", }} />
						</TouchableOpacity>
					</View>
				} />

			<View style={{
				flex: 1,
				backgroundColor: 'white',
			}}>
				<View
					style={{
						flex: .5,
						justifyContent: "space-between",
						alignItems: 'center',
						flexDirection: 'row',
						paddingHorizontal: height * .015
					}}>

					<TouchableOpacity style={{
					}}
						onPress={() => setIsModal(!isModal)}
					>
						<Icon name="person-circle-outline" size={height * .04} color='#11a79c90' />
					</TouchableOpacity>
					<View style={{ flexDirection: "row", alignItems: 'flex-end' }}>
						<TouchableOpacity style={{
						}}
						// onPress={() => navigation.navigate('Home')}
						>
							<Icon name="search" size={height * .03} color='black' />
						</TouchableOpacity>
						<MyText label={"What's your order?🍔"} subHeading style={{ color: "#000000", fontSize: height * .025 }} />
					</View>
					<TouchableOpacity style={{
					}}
					// onPress={() => navigation.navigate('Home')}
					>
						<Icon name="wallet-sharp" size={height * .035} color='#11a79c90' />
					</TouchableOpacity>

				</View>
				<View
					style={{
						flex: 1,
						// backgroundColor: "red",
						justifyContent: 'center',
						paddingHorizontal: height * .02

					}}>
					<MyText label={`Hi, ${reduxData?.profile?.name}`} heading />
					<MyText label='Good Evening! 🙋‍♂️' subHeading />
					<MyText label="" title />
				</View>
				<View
					style={{
						flex: .5,
						justifyContent: "space-between",
						alignItems: 'center',
						flexDirection: 'row',
						paddingHorizontal: height * .015,
					}}>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{
							foodName.map((item, index) => (
								// console.log(item),
								<TouchableOpacity key={index} style={{
									backgroundColor: item.selected ? "#11a79c" : "white",
									elevation: item.selected ? height * .003 : 0,
									paddingHorizontal: item.logo ? height * .01 : height * .02,
									paddingVertical: height * .005,
									borderColor: '#00000030',
									borderWidth: item.selected ? 0 : height * .001,
									marginHorizontal: height * .005,
									borderRadius: height * .01,
									flexDirection: 'row',
									justifyContent: 'flex-start',
									alignItems: 'center'
								}}
									onPress={() => isSelect(index)}
								>
									{
										item.logo &&
										<Image
											source={item.logo}
											style={{
												height: height * .05,
												width: height * .05,
												borderRadius: height * .05,
												marginRight: height * .003
											}}
										/>
									}
									<MyText label={item.name} title style={{ color: item.selected ? "#fff" : "#000", }} />
								</TouchableOpacity>
							))
						}
					</ScrollView>
				</View>
				<View
					style={{
						flex: 4,
					}}>
					{checkTab == 'All' ?
						<Cards data={allData} navigation={navigation} />
						:
						<IndividualCard data={allData} navigation={navigation} />
					}
				</View>
				<TouchableOpacity style={{
					position: 'absolute',
					bottom: height * .02,
					right: height * .015,
					width: height * .08,
					height: height * .08,
					borderRadius: height * .1,
					backgroundColor: 'black',
					alignItems: 'center',
					justifyContent: 'center',
					elevation: height * .003,
				}}
					disabled={reduxData?.cart?.amount == 0 && press}
					onPress={_onSelect}
				>
					<Icon name="cart-outline" size={height * .035} color='white' />
					{reduxData?.cart?.amount != 0 &&
						<View style={{
							height: height * .038,
							width: height * .038,
							backgroundColor: '#fff',
							borderRadius: height * 1,
							position: 'absolute',
							right: height * -.008,
							top: height * -.008,
							justifyContent: 'center',
							alignItems: 'center',
							elevation: height * .005,
						}}>
							<MyText label={reduxData?.cart?.amount > 99 ? "99+" : reduxData?.cart?.amount} subTitle style={{ color: '#000' }} />
						</View>
					}
				</TouchableOpacity>
				{/* <CustomizeModal /> */}
			</View>

		</View>
	)
}

export default Home;