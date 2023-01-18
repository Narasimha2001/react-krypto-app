import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  
  return (
    <HStack p={"4"} shadow={"base"} bgColor={"purple"} h={"11.5vh"}>

    <Button  variant={"unstyled"} color={"white"}>
      <Link to={"/"}>Home</Link>
    </Button>
    <Button variant={"unstyled"} color={"white"}>
      <Link to={"/exchanges"}>Exchanges</Link>
    </Button>
    <Button variant={"unstyled"} color={"white"}>
      <Link to={"/coins"}>Coins</Link>
    </Button>

    </HStack>
    
  )
}

export default Header