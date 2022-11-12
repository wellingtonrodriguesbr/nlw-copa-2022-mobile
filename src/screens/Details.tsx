import { useRoute } from "@react-navigation/native";
import { useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolProps } from "../components/PoolCard";
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

  console.log(data);

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

  useEffect(() => {
    getDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title={data.title} showBackButton showShareButton />
    </VStack>
  );
}
