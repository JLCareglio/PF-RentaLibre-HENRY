import CardProductMyProduct from "../../components/CardProduct-MyProduct";
import styles from "../../styles/productList.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RouterOutputs, trpc } from "../../utils/trpc";
import { FaLeaf } from "react-icons/fa";

import {
  Box,
  Flex,
  Text,
  Highlight,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
} from "@chakra-ui/react";
import { RxCaretDown as ChevronDownIcon } from "react-icons/rx";

export default function MyPublications() {
  // const router = useRouter();
  // const category: any = router.query.category;
  // const q: any = router.query.q;

  const colorBg = useColorModeValue("gray.100", "gray.900");

  //trae del back
  // const utils = trpc.useContext();
  // let products: any;
  // if (category || q) {
  //   if (!!category && !q) {
  //     products = trpc.product.getProductByCategory.useQuery({
  //       categoryName: category,
  //     }).data;
  //   } else if (!!q && !category) {
  //     products = trpc.product.getProductByTitle.useQuery({ title: q }).data;
  //   } else {
  //     products = trpc.product.getProductByTitleAndCategory.useQuery({
  //       title: q,
  //       categoryName: category,
  //     }).data;
  //   }
  // } else {
  //   products = trpc.product.getProducts.useQuery({ limit: 10, page: 1 }).data;
  // }
  const products = trpc.user.getUser.useQuery({}).data?.products
  // const [order, setOrder] = useState("Más relevantes");
  //para que refresque los datos
  // useEffect(() => {
  //   setData(products);
  // }, [products]);

  // if (!data) return <p>No profile data</p>;

  return (
    <div>
      {/* <Box bg={colorBg} px={4}>
        <Flex h={8} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Highlight
              query={`${q}`}
              styles={{ px: "1", py: "0", rounded: "full", bg: "orange.100" }}
            >
              {`1 a ${data?.length} de ${products?.length} resultados ${
                q ? `para: ${q}` : ""
              }`}
            </Highlight> 
          </Flex>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                Ordenar por: {order}
              </MenuButton>
              <MenuList zIndex={2}>
                <MenuItem onClick={() => setOrder("Más relevantes")}>
                  Más relevantes
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => setOrder("Menor precio")}>
                  Menor precio
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => setOrder("Mayor precio")}>
                  Mayor precio
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box> */}

      <Center>
      <div className={styles.cardsDivProdHome}>
        {products?.map((p: any) => (
          <CardProductMyProduct
          deleted={p.deleted}
          disabled={p.disabled}
            productName={p.title}
            photo={p.pictures[0]}
            productPrice={p.price}
            rating={p.rating}
            id={p.id}
            key={p.id}
          />
        ))}
      </div>
      </Center>
    </div>
  );
}
