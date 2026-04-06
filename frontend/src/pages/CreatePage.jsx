import { Box, Heading, Input, useColorModeValue, VStack,Container, Button ,useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { IoHandLeft } from 'react-icons/io5';
import { useProductStore } from '../store/product';

const CreatePage =  () => {
  const [newProduct,setNewProduct]=useState(
    {
      name:"",
      price:"",
      image:"",
    });
  const toast = useToast()
  const { createProduct }=useProductStore();
  const HandleAddProduct = async() =>{
    const {success,message}= await createProduct(newProduct);
    if(!success){
      toast({
        title:"Error",
        description:message,
        duration:9000,
        status:'error',
        isClosable: true,
      })
    }else{
      toast({
        title:"Success",
        description:message,
        duration:9000,
        status:'success',
        isClosable: true,
      })
    }
    setNewProduct({name:"",price:"",image:""})
  }
  
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white","gray.800")} p ={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct,name:e.target.value})}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct,price:e.target.value})}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct,image:e.target.value})}
            />
            <Button colorScheme='blue' onClick={HandleAddProduct} w='full'>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage