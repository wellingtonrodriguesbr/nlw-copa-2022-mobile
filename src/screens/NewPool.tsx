import { Heading, Text, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";
import { useState } from "react";
import { api } from "../services/api";

export function NewPool() {
  const [newPoolName, setNewPoolName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleCreateNewPool() {
    if (!newPoolName.trim()) {
      return toast.show({
        title: "Informe o nome do bolão!",
        placement: "bottom",
        bg: "red.500",
      });
    }

    try {
      setIsLoading(true);
      await api.post("/pools", { title: newPoolName });
      toast.show({
        title: "Bolão criado com sucesso!",
        placement: "bottom",
        bg: "green.500",
      });
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possível criar o bolão!",
        placement: "bottom",
        bg: "red.500",
      });
    } finally {
      setIsLoading(false);
      setNewPoolName("");
    }
  }

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

        <Input
          placeholder="Qual nome do seu bolão"
          mb={2}
          onChangeText={setNewPoolName}
          value={newPoolName}
        />
        <Button
          title="Criar meu bolão"
          onPress={handleCreateNewPool}
          isLoading={isLoading}
        />
        <Text color="gray.200" fontSize="sm" textAlign="center" mt={4} px={10}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
