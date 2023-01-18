import { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from "../index"
import { Container, Heading, HStack, VStack, Text,Image } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { Input } from '@chakra-ui/react'
import ExchangesNotFound from './ExchangesNotFound';


const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query,setQuery] = useState("");
  
    useEffect(()=>{

      const fetchExchanges = async()=>{
        try {
          const {data} = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);  
        } catch (error) {
         
          setError(true)
          setLoading(true); 
          
        }
      
      }
      fetchExchanges();
    },[])

    if(error) return <ErrorComponent message = {"error while fetching exchanges"} />

      let data = exchanges.filter(function(item){
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.indexOf(lowerCaseQuery)!==-1;
    }) 

    function handleChange(e){
      setQuery(e.target.value)
    }

    // if(data.length===0){
    //   <Input onChange={handleChange} placeholder='Search...' value={query} marginY = "1.5" marginX="auto" />
    //   return <ExchangesNotFound />
    // }

    return (
    <Container maxW={"container.xl"}>

    {
      loading?(<Loader/>):
      
      (
        <>

        <Input onChange={handleChange} placeholder='Search...' value={query} marginY = "1.5" marginX="auto" />

        
        
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>

        {
          data.length===0?<ExchangesNotFound/>:
          data.map((i)=>(
            <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url}  />
          ))
        }
      </HStack>
      </>
      )
      
    }

    </Container>
    );
};


const ExchangeCard=({name,img,rank,url})=>(
  <a href={url}  target={"blank"} >

  <VStack w={"52"} shadow={"lg"} p={"8"} m={"4"} bgColor={"rgba(255,242,183)"} borderRadius={"lg"} transition={"all 0.3s"}  css={{

  "&:hover":{
    transform:"scale(1.1)",
 
  }
  }}

  >
    <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"}  />
    <Heading size={"md"} noOfLines={"1"}>{rank}</Heading>
    <Text size={"md"} noOfLines={"1"}>{name}</Text>
  </VStack>

  </a>
)




export default Exchanges