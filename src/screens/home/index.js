import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Cards, IndividualCard } from "../../components";
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../../utils/fonts';
import { AllData, BiryaniData, SnackData, FastFoodData, RotiData, SalanData, BeveragesData } from '../../utils/data';
import { Biryani, FastFood, Karahi, Roti, Snacks, Beverages } from "../../assets/images";

const { width, height } = Dimensions.get('window');


function Home() {
	const count = useSelector(store => store);
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
			data: BiryaniData
		},
		{
			name: 'Salan',
			selected: false,
			logo: Karahi,
			data: SalanData
		},
		{
			name: 'Roties',
			selected: false,
			logo: Roti,
			data: RotiData
		},
		{
			name: 'FastFoot',
			selected: false,
			logo: FastFood,
			data: FastFoodData
		},
		{
			name: 'Snacks',
			selected: false,
			logo: Snacks,
			data: SnackData
		},
		{
			name: 'Beverages',
			selected: false,
			logo: Beverages,
			data: BeveragesData
		},
	]);
	const [allData, setAllData] = useState([]);
	const [checkTab, setCheckTab] = useState('All');



	useEffect(() => {
		setAllData(foodName[0].data)
	}, [])
	const isSelect = (index) => {
		var isFalseArray = [...foodName];
		foodName.map((item, indexx) => {
			if (indexx == index) {

				[...isFalseArray, isFalseArray[indexx].selected = true]
				setAllData(item.data)
				setCheckTab(item.name)
			} else {

				[...isFalseArray, isFalseArray[indexx].selected = false]
			}
		}
		)
		setFoodName(isFalseArray)
	}


	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white',
			}}>
			<StatusBar barStyle={'dark-content'} backgroundColor='white' />
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
				// onPress={() => navigation.navigate('Home')}
				>
					<Icon name="person-circle-outline" size={height * .04} color='black' />
				</TouchableOpacity>
				<Text style={{
					fontSize: height * .015,
					color: '#00000030',
					fontFamily: Fonts.Roboto_Bold
				}}>
					eSpark Lunch System
				</Text>
				<TouchableOpacity style={{
				}}
				// onPress={() => navigation.navigate('Home')}
				>
					<Icon name="search" size={height * .035} color='black' />
				</TouchableOpacity>

			</View>
			<View
				style={{
					flex: 1,
					// backgroundColor: "red",
					justifyContent: 'center',
					paddingHorizontal: height * .02

				}}>
				<Text style={{
					fontSize: height * .045,
					color: '#000',
					fontFamily: Fonts.Roboto_Black
				}}>
					Fast & Delicious
				</Text>
				<Text style={{
					fontSize: height * .045,
					color: '#000',
					fontFamily: Fonts.Roboto_Black
				}}>
					Food
				</Text>
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
							console.log(item),
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
								<Text style={{
									fontSize: height * .02,
									color: item.selected ? "#fff" : "#000",
									fontFamily: Fonts.Roboto_Bold
								}}>
									{item.name}
								</Text>
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
					<Cards data={allData} />
					:
					<IndividualCard data={allData} />
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
			}}>
				<Icon name="cart-outline" size={height * .035} color='white' />
			</TouchableOpacity>
		</View>
	)
}

export default Home;