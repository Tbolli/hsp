import axios from 'axios';
import React from "react";

import { useState } from "react";
import { useEffect } from "react";

import logo from './content/images/logo.png';
import Hero from './Hero';
import CardList from './CardList';
import RefreshBtn from './RefeshBtn'

import Methods from './content/methods.json'; 

function App() {
  const baseURL = "https://api.slothpixel.me/api/skyblock/bazaar";

  const productsID =["ENCHANTED_CARROT","ENCHANTED_HAY_BLOCK","ENCHANTED_POTATO","ENCHANTED_PUMPKIN",
    "ENCHANTED_MELON", "ENCHANTED_RED_MUSHROOM", "ENCHANTED_BROWN_MUSHROOM", "ENCHANTED_COCOA",
    "ENCHANTED_CACTUS_GREEN","ENCHANTED_SUGAR","ENCHANTED_NETHER_STALK"
  ]

  const productImages = {
    "ENCHANTED_CARROT": require('./content/images/Enchanted_Carrot.jpg'),
    "ENCHANTED_HAY_BLOCK": require('./content/images/ENCHANTED_HAY_BLOCK.png'),
    "ENCHANTED_POTATO": require('./content/images/Enchanted_Potato.jpg'),
    "ENCHANTED_PUMPKIN": require('./content/images/Enchanted_Pumpkin.png'),
    "ENCHANTED_MELON": require('./content/images/Enchanted_Melon.jpg'),
    "ENCHANTED_RED_MUSHROOM": require('./content/images/Enchanted_Red_Mushroom.jpg'),
    "ENCHANTED_BROWN_MUSHROOM": require('./content/images/Enchanted_Brown_Mushroom.jpg'),
    "ENCHANTED_COCOA": require('./content/images/Enchanted_Cocoa_Beans.jpg'),
    "ENCHANTED_CACTUS_GREEN": require('./content/images/Enchanted_Cactus_Green.png'),
    "ENCHANTED_SUGAR": require('./content/images/Enchanted_Sugar.jpg'),
    "ENCHANTED_NETHER_STALK": require('./content/images/Enchanted_Nether_Wart.jpg'),
  };

  let isError = false;

  // Declare the products state and its setter function
  const [products, setProducts] = useState([]);

  // Update the GetData function
  const getData = async () => {
    try {
      const promises = productsID.map(async (product) => {
        const response = await axios.get(`${baseURL}/${product}`, {}, { 'Access-Control-Allow-Origin': '*' });
        return {
          Id: product,
          Name: response.data.name,
          SellOrder: response.data.buy_summary[0].pricePerUnit,
          BuyOrder: response.data.sell_summary[0].pricePerUnit,
          CoinsPerHour: Math.ceil(Methods[product] * response.data.sell_summary[0].pricePerUnit),
        };
      });

      const results = await Promise.all(promises);
      const sortedResults = sortData(results);
      setProducts(sortedResults);
    } catch (error) {
      isError = true;
      setProducts([]);
    }
  };

  const sortData = (inputArr) => {
    let len = inputArr.length - 1;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (inputArr[j].CoinsPerHour < inputArr[j + 1].CoinsPerHour) {
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j + 1];
          inputArr[j + 1] = tmp;
        }
      }
    }
    return inputArr;
  };
  
  useEffect(()=>{
    getData()
  },[])

  return (
    <div style={{ overflowX: 'hidden' }} className={'contianer'}>
      {/* Header */}
      <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" width="30" height="30" className="d-inline-block align-text-top"/>
            HSP
          </a>
        </div>
      </nav>

      <RefreshBtn clickBtn={getData} />
      {products.length >= 1 ? <Hero product={products[0]} img={productImages[products[0].Id]}/> : <h3 style={loadingStyle}>Loading...</h3>}
      <CardList products={products} productImages={productImages}/>
    </div>
  );
}

const loadingStyle ={
  textAlign :"center"
}

export default App;


