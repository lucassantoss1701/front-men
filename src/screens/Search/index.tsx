import React from "react";
import {
  ModalBody,
  Modal,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Box,
  Tbody,
  HStack,
  Button,
  VStack,
  CircularProgress,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { SearchForm, SearchFormData } from "../../shared/forms/Search";
import { ResultOfTransaction } from "../../shared/interfaces/Search";
import { api } from "../../services/api";
import queryString from "query-string";


const itemsPerPage = 5;
const minRowsCount = 0; 

export function Search() {
  const [loading, setLoading] = React.useState(false);
  const [resultOfTransaction, setTransaction] = React.useState<ResultOfTransaction>({
    total: "",
    period_total: "",
    transactions: [],
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  const formProps = useForm<SearchFormData>();

  async function fetchTransactions() {
    setLoading(true);
    const result = await api.get("transactions");
    setTransaction(result.data);
    setLoading(false);
  }

  const handleFormSubmit = async (data: SearchFormData) => {

 
    const requestBody: any = {};

    if (data.initialDate) {
      requestBody['initial.date'] = data.initialDate;
    }

    if (data.finalDate) {
      requestBody['final.date'] = data.finalDate;
    }

    if (data.name) {
      requestBody.name = data.name;
    }

  


    const queryParams = queryString.stringify(requestBody);
    const url = `transactions?${queryParams}`;

    console.log(url)
    setLoading(true);
    const result = await api.get(url);
    setTransaction(result.data);
    setCurrentPage(1);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchTransactions();
  }, []);

  const totalPages = Math.ceil(resultOfTransaction.transactions.length / itemsPerPage);
  const currentPageData = resultOfTransaction.transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const emptyRowsCount = Math.max(itemsPerPage - currentPageData.length, minRowsCount);

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalBody>
        <FormProvider {...formProps}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={6}
          >
            <SearchForm onSubmit={handleFormSubmit} />
          </Box>
          <Box shadow="md" rounded="md" bg="gray.900">
            <TableContainer
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              overflow="hidden"
            >
              <Table variant="simple" size="lg">
                <Thead>
                  <Tr style={{ justifyContent: "center" }}>
                    <Th
                      colSpan={2}
                      borderBottomWidth="2px"
                      borderColor="gray.400"
                      p={10}
                      textAlign="center"
                    >
                      Saldo total: R$ {resultOfTransaction.total}
                    </Th>
                    <Th
                      colSpan={2}
                      borderBottomWidth="2px"
                      borderColor="gray.400"
                      p={10}
                      textAlign="center"
                    >
                      Saldo no período: R$ {resultOfTransaction.period_total}
                    </Th>
                  </Tr>
                  <Tr>
                    <Th width="25%">Dados</Th>
                    <Th width="25%">Valência</Th>
                    <Th width="25%">Tipo</Th>
                    <Th width="25%">Nome do operador transacionado</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentPageData.map((transaction) => (
                    <Tr key={transaction.id}>
                      <Td height="20%" width="25%">{transaction.date}</Td>
                      <Td height="20%" width="25%">{transaction.valence}</Td>
                      <Td height="20%" width="25%">{transaction.type_of_transaction}</Td>
                      <Td height="20%" width="25%">{transaction.operator_name}</Td>
                    </Tr>
                  ))}
                  {emptyRowsCount > 0 && Array.from({ length: emptyRowsCount }).map((_, index) => (
                    <Tr key={`empty-${index}`}>
                      <Td height="20%" width="25%">-</Td>
                      <Td height="20%" width="25%">-</Td>
                      <Td height="20%" width="25%">-</Td>
                      <Td height="20%" width="25%">-</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <VStack spacing={2} p={4} align="center">
              <HStack spacing={2}>
                {Array(totalPages > 0 ? totalPages : 1)
                  .fill(1)
                  .map((_page, index) => (
                    <Button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      colorScheme={currentPage === index + 1 ? "orange" : "gray"}
                    >
                      {index + 1}
                    </Button>
                  ))}
              </HStack>
            </VStack>
          </Box>
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" p={8}>
              <CircularProgress color="orange" trackColor="gray.600" size={8} isIndeterminate />
            </Box>
          )}
        </FormProvider>
      </ModalBody>
    </Modal>
  );
}
