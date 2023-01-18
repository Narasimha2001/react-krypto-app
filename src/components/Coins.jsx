import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Button, Container, HStack, Radio, RadioGroup,Heading,Image,Text,VStack } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";

import '../../src/temp.css'




const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit,setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit,setMinPageNumberLimit] = useState(0);


  const pages = [];
  for(let i=1;i<=50;i++){
    pages.push(i);
  }

  function handlePreviousButtonClick(){
    setCurrentPage(currentPage-1)
    if((currentPage-1)%pageNumberLimit ===0){
      setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit)
    }
    setLoading(true)
  }
  function handleNextButtonClick(){
    setCurrentPage(currentPage+1)

    if(currentPage+1>maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit)
    }

    setLoading(true)
  }

  function handleClick(e){
    if(Number(e.target.id)===currentPage) return null;
    setCurrentPage(Number(e.target.id))
    setLoading(true);
  }
  
  const renderPageNumbers = pages.map((number)=>{
    if(number<maxPageNumberLimit+1&&number>minPageNumberLimit){
      
      return (
        <Button
                  key={number}
                  id={number}
                  css={{"&:hover":{
                      backgroundColor:"purple",
                      color:"white"
                      },
                  }}
                  
                  bgColor={"rgba(255,242,500)"}
                  color={"purple"}
                  onClick={handleClick}
                  className= {currentPage===number?"active":null}
                >{number}</Button>
      )
    }else {
      return null;
    }
  })

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${currentPage}&per_page=${itemsPerPage}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, currentPage, itemsPerPage]);


  if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;


  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        

          <RadioGroup  value={currency} onChange={setCurrency} p={"8"}>
            <HStack  spacing={"4"}>
              <Radio  value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          
    

          <HStack listStyleType={"none"} overflowX={"auto"} justifyContent={[null,"center"]}>
              <Button 
                      bgColor={"rgba(255,242,500)"}
                      color={"purple"}
                      onClick={handlePreviousButtonClick}
                      css={{"&:hover":{
                          backgroundColor:"purple",
                          color:"white"
                          },
                      }}
                      disabled={currentPage===pages[0]?true:false}
                  >Prev</Button>
            {renderPageNumbers}
                <Button 
                      bgColor={"rgba(255,242,500)"}
                      color={"purple"}
                      onClick={handleNextButtonClick}
                      css={{"&:hover":{
                          backgroundColor:"purple",
                          color:"white"
                          },
                      }}
                      disabled={currentPage===pages[pages.length-1]?true:false}
                  >Next</Button>  
          </HStack>
         
        </>
      )}
    </Container>
  );
        
}





const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={"52"}
      bgColor={"rgba(255,242,183)"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>
);



export default Coins;