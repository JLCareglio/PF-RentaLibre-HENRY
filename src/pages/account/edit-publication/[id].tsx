import { trpc } from "../../../utils/trpc"
import { useRouter } from "next/router";

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Badge,
  Textarea,
} from "@chakra-ui/react";

export default function EditPublication() {
  const router = useRouter();
  const { id }: any = router.query;
  const product = trpc.product.getProductByID.useQuery({ id }).data;

  return (
    <Box>
      <p>soy editar publicacion</p>

      <Flex>
        <Image
          rounded={"md"}
          alt={"product image"}
          src={product?.pictures[0]}
          fit={"cover"}
          align={"center"}
          w={"100%"}
          h={{ base: "100%", sm: "400px", lg: "500px" }}
        />
      </Flex>
      <Box as={"header"}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
        >
          {product?.title}
        </Heading>
        <Text
          color={useColorModeValue("gray.900", "gray.400")}
          fontWeight={300}
          fontSize={"2xl"}
        >
          {"$ " + product?.price}
        </Text>
      </Box>
    </Box>
  );
}
