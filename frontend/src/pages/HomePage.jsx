import React, { useEffect } from 'react'
import { useProductStore } from '../store/product'
import { Container, SimpleGrid, VStack,Text } from '@chakra-ui/react';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const products =useProductStore(state => state.products);
  const fetchProducts = useProductStore(state => state.fetchProducts);
  useEffect(()=>{
    fetchProducts();
  },[fetchProducts]);
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text 
          fontSize={"30px"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r,cyan.400,blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>
        <SimpleGrid
          columns={
          {
            base:1,
            md:3,
            lg:3
          }
        }
        spacing={10}
        w={"full"}
      >
        {products.map((product) => (
          <ProductCard key = {product._id} product ={product}/>
        ))}
      </SimpleGrid>
      {products.length === 0 && (
        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
          No products found 😢
          <Link to ={"/create"}>
          <Text as="span" color="blue.500" _hover={{textDecoration:"underline"}} >
            create a product
          </Text>
          </Link>
        </Text>
      
      )}
      </VStack>
    </Container>
  )
}

export default HomePage