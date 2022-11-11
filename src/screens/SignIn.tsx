import { Center, Icon, Text } from "native-base";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/logo.svg";

export function SignIn() {
  const { signIn, isUserLoading } = useAuth();
  return (
    <Center flex={1} px={6} bg="gray.900">
      <Logo width={212} height={40} />
      <Button
        onPress={signIn}
        mt={12}
        title="Entrar com o Google"
        type="SECONDARY"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        isLoading={isUserLoading}
        isDisabled={isUserLoading}
      />
      <Text mt={4} color="gray.200" textAlign="center" fontSize="sm">
        Não utilizamos nenhuma informação além {"\n"}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}
