import { trpc } from "../../../utils/trpc";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  HStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  useToast,
  Center,
} from "@chakra-ui/react";

import { MdLocalShipping } from "react-icons/md";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import React from "react";

import sendEmail from "../../../utils/contact-functions/contact-Email";

function handlesignIn() {
  signIn()
}

const validate = (input: any) => {
  const errors = {
    stars: false,
    size: false,
  };
  if (input.rating > 5 || input.rating < 1) {
    errors.stars = true;
  }
  if (input.comment.length < 5 || input.comment.length > 300) {
    errors.size = true;
  }
  return errors;
};

export default function ProductDetail() {

  const myKeysValues = window.location.search;
  const urlParams = new URLSearchParams(myKeysValues);

  //const id = urlParams.get('prodId');
  const totalDays = urlParams.get('totalDays');
  const totalPrice = urlParams.get('totalPrice');
  const startDate = urlParams.get('startDate');
  const endDate = urlParams.get('endDate');
  const userIdRent: any = urlParams.get('U');


  const toast = useToast();
  const router = useRouter();
  const session = useSession();
  const { id }: any = router.query;
  //trae del back con id
  const product = trpc.product.getProductByID.useQuery({ id }).data;
  const userRent = trpc.user.getUser.useQuery({ userId: userIdRent }).data;

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      //envio notificaciond e email - si publicacon ok:

      const url = process.env.NEXT_PUBLIC_HOME_URL

      const urlRentReq = `${process.env.NEXT_PUBLIC_HOME_URL}/account/rent-checkout/${id}/?totalDays=${totalDays}&totalPrice=${totalPrice}&startDate=${startDate}&endDate=${endDate}&U=${session?.data?.userDB?.id}`

      /* 
      //DAtos a eviar por url: 
        - totalDays
        - totalPrice
        - startDate
        - endDate
        - userID (U)
       */


      const values = {
        name: userRent?.name,
        email: userRent?.email,
        subject: `Consulta sobre su artículo ${product?.title}`,
        message: `
        <h3>Su consultas por ${product?.title} ha sido aprobada entre las siguientes fechas:</h3><br>
        <h4>Desde el: ${startDate}</h4>
        <h4>>Hasta el:  ${endDate}</h4>
        <h4>Condiciones alquiler:</h4>
        <p>- Cantidad de dias de alquiler: ${totalDays}</p>
        <p>- Total a cobrar: $${totalPrice}</p>
        <p>Si usted está de acuerdo con las condiciones del sitio, las fechas y el precio, por favor haga click en el siguiente link para abonar la operación:</p>
        <p> ${process.env.NEXT_PUBLIC_HOME_URL}/account/rent-checkout/${id}/?totalDays=${totalDays}&totalPrice=${totalPrice}&startDate=${startDate}&endDate=${endDate}&U=${session?.data?.userDB?.id}</p><br>
        <p> Saudos, El equipo de rentalibre.</p>
      `,
      };

      if (true) {
        sendEmail(values);
      } else {
        console.log('No Data response from publication');
      };

      //********************************** */
      toast({
        title: "¡Su Autorización ha sido Enviada!",
        status: "success",
        duration: 2000,
        position: "top",
      });
      router.push("/");

    } catch (error) {
      console.log(error);
    }
  };

  if (!session?.data?.userDB?.banned) {

    return (
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={10}
              alt={"product image"}
              src={product?.pictures[0]}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {product?.title}
              </Heading>
              <Text
                color={"grey.800"}
                fontWeight={300}
                fontSize={"2xl"}
              >
                {"Valor diario: $" + product?.price}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={"grey.800"}
                />
              }
            >
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"yellow.800"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >Inicio del Alquiler:
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>{startDate}</ListItem>
                  </List>
                </SimpleGrid>
              </Box>

              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"yellow.800"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >FIN DEL ALQUILER:
                </Text>
                <List spacing={2}>
                  <ListItem>
                    {endDate}
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"yellow.800"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >CANTIDAD DE DIAS:
                </Text>
                <List spacing={2}>
                  <ListItem>
                    {totalDays} días
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"yellow.800"}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >PRECIO TOTAL A ABONAR POR EL LOCATARIO:
                </Text>
                <List spacing={2}>
                  <ListItem>
                    ${totalPrice}
                  </ListItem>
                </List>
              </Box>



            </Stack>

            <HStack spacing={75} justifyContent={"center"}></HStack>
            <Center>

              {session?.data?.user?.name && (
                <Button
                  rounded={10}
                  w={300}
                  mt={8}
                  size={"lg"}
                  py={"7"}
                  colorScheme="teal"
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                  onClick={handleSubmit}
                >
                  AUTORIZAR LA OPERACION
                </Button>
              )}

              {!session?.data?.user?.name && (
                <Button colorScheme="teal" onClick={handlesignIn}
                >
                  INGRESAR
                </Button>
              )}

            </Center>

            {/* 
          
//ESTA SERIA LA LOGICA CON AVAILABLE DESDE LA BASE DE DATOS - AHORA VA POR DEFECTO VIA QUERY
          
          <Button
            rounded={10}
            w={250}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("teal", "gray.50")}
            color={useColorModeValue("white", "teal")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={handleSubmit}
          >
            {product?.availability ? (
              <Badge ml={2} colorScheme="green">
                Disponible para renta!
              </Badge>
            ) : (
              <Badge ml={2} colorScheme="red">
                No disponible
              </Badge>
            )}
          </Button> */}

            <Stack direction="row" alignItems="center" justifyContent={"center"}>
              <MdLocalShipping />
              <Text>Consultar Envío</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
        <hr></hr>

        <hr />
      </Container>
    )
  } else {
    router.push('/access-denied')
  }
}
