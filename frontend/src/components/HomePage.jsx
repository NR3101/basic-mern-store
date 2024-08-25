import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/Product";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, pink.400, pink.300, blue.400)"}
          bgClip={"text"}
        >
          Current Products 🚀
        </Text>

        {/* Display all products in a grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {/*  If there are no products, display a message with a link to create a product */}
        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            bgClip={"text"}
            color={"gray.500"}
          >
            No products found 😢{" "}
            <Link to="/create">
              <Text
                as={"span"}
                color={"pink.500"}
                _hover={{
                  textDecoration: "underline",
                  color: "pink.700",
                }}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
