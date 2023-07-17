import React from "react";
import { HStack, VStack, Grid, Button } from "@chakra-ui/react";
import { Input } from "../../components/form/Input";
import { useFormContext } from "react-hook-form";
import { format, parse } from "date-fns";

export interface SearchFormData {
  initialDate: string;
  finalDate: string;
  name: string;
}

interface SearchFormProps {
  onSubmit: (data: SearchFormData) => void;
}

export function SearchForm({ onSubmit }: SearchFormProps) {
  const { register, handleSubmit } = useFormContext<SearchFormData>();

  const handleFormSubmit = (data: SearchFormData) => {
    let initialDate: string | undefined = "";
    let finalDate: string | undefined = "";



    if (data.initialDate !== ""){
      initialDate = format(parse(data.initialDate, "dd/MM/yyyy", new Date()), "yyyy-MM-dd");

    }

    if (data.initialDate !== ""){
       finalDate = format(parse(data.finalDate, "dd/MM/yyyy", new Date()), "yyyy-MM-dd");
    }

    const transformedData: SearchFormData = {
      ...data,
      initialDate,
      finalDate,
    };


    onSubmit(transformedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid templateColumns="5fr 2fr" gap={8}>
        <HStack marginTop="10vh" marginLeft="30vh" spacing={120} w="full">
          <Input
            placeholder="dd/MM/yyyy"
            size="md"
            type="text"
            name="initialDate"
            label="Data inicial"
            inputProps={{ ...register("initialDate") }}
  
          />

          <Input
            placeholder="dd/MM/yyyy"
            size="md"
            type="text"
            name="finalDate"
            label="Data final"
            inputProps={{
              ...register("finalDate"),
            }}
          />

          <Input
            name="name"
            label="Nome do operador transacionado"
            inputProps={{
              ...register("name"),
            }}
          />

          <Button
            marginTop={5}
            type="submit"
            colorScheme="orange"
            size="lg"
            fontSize="md"
            borderRadius="xl"
            px={12}
            py={6}
          >
            Pesquisar
          </Button>
        </HStack>
      </Grid>
    </form>
  );
}
