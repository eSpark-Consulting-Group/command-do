import { BiryaniWP, Chapati, DalChanaFry, DalMashFry, LayMasala, LaysCheese10, LaysCheese30, TandorRoti, Zinger, ClubSandwich, Pulao, SevenUp, Nestle } from "../assets/images";

export const AllData = [
  {
    name: 'FastFood',
    data: [
      {
        price: 350,
        image: Zinger,
        name: "Zinger Burger",
        desc : 'Fillet burger with a spicy crunch, veggies, special zinger sauce & served between fresh round bun',
        qty:0,
        foodType:"FastFood"
      },
      {
        price: 340,
        image: ClubSandwich,
        name: "Club Sandwich",
        desc : 'BBQ chicken boti, mayo & creamy sauce',
        qty:0,
        foodType:"FastFood"
      },
    ],
  },
  {
    name: 'Biryani',
    data: [
      {
        price: 170,
        image: BiryaniWP,
        name: "Biryani",
        desc : 'Fragrant, aromatic and flavorful rice, topped with juicy chicken',
        qty:0,
        foodType:"Biryani"
      },
      {
        price: 170,
        image: Pulao,
        name: "Pulao",
        desc : 'Delicious and Frangmantic Aroma, with Tasty Traditional Rice and dont forget the meat',
        qty:0,
        foodType:"Biryani"

      },
    ],
  },
  {
    name: 'Salan',
    data: [
      {
        price: 120,
        image: DalChanaFry,
        name: "Dal Chana Fry",
        desc : 'Traditional cuisine in the various parts of pakistan, eaten with pleasure',
        qty:0,
        foodType:"Salan"

      },
      {
        price: 140,
        image: DalMashFry,
        name: "Dal Mash Fry",
        desc : 'Traditional cuisine in the various parts of pakistan, eaten with pleasure',
        qty:0,
        foodType:"Salan"

      },
    ],
  },
  {
    name: 'Roties',
    data: [
      {
        price: 15,
        image: Chapati,
        name: "Chapati",
        desc : 'Flat and Round at the same time, cheap too.',
        qty:0,
        foodType:"Roties"
      },
      {
        price: 20,
        image: TandorRoti,
        name: "Tandor Roti",
        desc : 'Moist and Steamy, Delicious with Salan Foods.',
        qty:0,
        foodType:"Roties"

      },
    ],
  },
  {
    name: 'Snacks',
    data: [
      {
        price: 50,
        image: LayMasala,
        name: "Lay Masala",
        desc : 'Crisp and flavorful, Healthy not so much (Masala Flavour)',
        qty:0,
        foodType:"Snacks"
      },
      {
        price: 10,
        image: LaysCheese10,
        name: "Lays Cheese 10",
        desc : 'Crisp and flavorful, Healthy not so much (Cheese Flavour)',
        qty:0,
        foodType:"Snacks"
      },
      {
        price: 30,
        image: LaysCheese30,
        name: "Lays Cheese 30",
        desc : 'Crisp and flavorful, Healthy not so much (Cheese Flavour)',
        qty:0,
        foodType:"Snacks"
      },
    ],
  },
  {
    name: 'Beverages',
    data: [
      {
        price: 30,
        image: SevenUp,
        name: "7up 345ml",
        desc : 'Refreshing and cool drink, perfect counter for extereme hot days',
        qty:0,
        foodType:"Beverages"
      },
      {
        price: 60,
        image: Nestle,
        name: "Nestle Apple Nectar 200 ML",
        desc : 'Pleasant Juice Drink, Calm the nerves & senses',
        qty:0,
        foodType:"Beverages"
      },
    ],
  },
];
