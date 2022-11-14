import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/api";

interface RouteParams {
  id: string;
}

export function Details() {
  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const [data, setData] = useState<PoolProps>({} as PoolProps);
  const [isLoading, setIsLoading] = useState(true);
  const [optionSelected, setOptionSelected] = useState<
    "Seus palpites" | "Ranking do grupo"
  >("Seus palpites");

  async function getDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);
      setData(response.data.pool);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Erro ao carregar detalhes do bolão!",
        placement: "bottom",
        bg: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({ message: data.code });
  }

  useEffect(() => {
    getDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header
        title={data.title}
        onShare={handleCodeShare}
        showBackButton
        showShareButton
      />
      {data._count.participants > 0 ? (
        <VStack px={6} flex={1}>
          <PoolHeader data={data} />
          <HStack bg="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === "Seus palpites"}
              onPress={() => setOptionSelected("Seus palpites")}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === "Ranking do grupo"}
              onPress={() => setOptionSelected("Ranking do grupo")}
            />
          </HStack>
          <Guesses poolId={data.id} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={data.code} />
      )}
    </VStack>
  );
}
