//import React from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Box,
  Switch,
} from "@chakra-ui/react";
//import Rating from '@mui/material/Rating';


export default function CardProductMyProduct({
  id,
  photo,
  productName,
  productPrice,
  rating,
}) {
  let avarage = 0;
  if (rating && rating.length > 0) {
    let sum = 0;
    rating?.forEach((rating) => (sum += rating.stars));
    avarage = sum / rating.length;
  }
  return (
    <Center py={6}>
      
        {" "}
        {/* {`/productDetail/$id}`} */}
        
        <Stack
          //borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "900px" }}
          height={{ sm: "476px", md: "10rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"xl"}
          padding={4}>

          <Link href={`/productDetail/${id}`}>
          <Flex flex={0.4} /* bg="blue.400" */ align="center">
            <Box w="170px"/* bg="red.500" */>
              <Image
                marginTop={-4}
                objectFit="contain"
                boxSize="180px"
                src={photo}
                maxW={{ base: "100%", sm: "200px" }}
                height="160px"
                alt={productName}/>
            </Box>
          </Flex>
          </Link>

          <Link href={`/productDetail/${id}`}>
          <Stack
            w={{ sm: "100%", md: "500px" }}
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="left"
            p={1}
            pt={2}
            pl={10}>
            <Heading fontSize={"xl"} fontFamily={"body"}>
              {productName}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {"Valoraciones: " + avarage + "/5  estrellas" + " *"}
            </Text>
            <Text fontWeight={600} fontSize={"xl"}>
              {"$ " + productPrice}
            </Text>
          </Stack>
          </Link>

          <VStack
          justifyContent='center'
          spacing='15px'
          >
            <Switch fontSize='sm'>
              Activar / Desactivar
            </Switch>

            <a href={`/account/edit-publication/${id}`}>
            <Button size='sm'>
              Editar Publicación
            </Button>
            </a>

            <Button size='sm'>
              Borrar Publicación
            </Button>
    

          </VStack>
        </Stack>
      
    </Center>
  );
}
