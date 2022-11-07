import { Heading, Text, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";

export function NewPool() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} alignItems="center" mx={6}>
        <Logo />
        <Heading
          my={8}
          fontSize="xl"
          color="white"
          fontFamily="heading"
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe com seus amigos.
        </Heading>

        <Input placeholder="Qual nome do seu bolão" mb={2} />
        <Button title="Criar meu bolão" />
        <Text color="gray.200" fontSize="sm" textAlign="center" mt={4} px={10}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
