import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface Species {
  id: number;
  name: string;
  incubation_period_days: number;
  description?: string;
}

interface SpeciesTableProps {
  species: Species[];
  onEdit: (species: Species) => void;
  onDelete: (id: number) => void;
}

const SpeciesTable: React.FC<SpeciesTableProps> = ({ species, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t('common.id')}</Th>
            <Th>{t('common.name')}</Th>
            <Th>{t('species.incubationPeriodDays')}</Th>
            <Th>{t('common.description')}</Th>
            <Th>{t('common.actions')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {species.map((s) => (
            <Tr key={s.id}>
              <Td>{s.id}</Td>
              <Td>{s.name}</Td>
              <Td>{s.incubation_period_days}</Td>
              <Td>{s.description || 'N/A'}</Td>
              <Td>
                <Button colorScheme="blue" size="sm" onClick={() => onEdit(s)} mr={2}>
                  {t('common.edit')}
                </Button>
                <Button colorScheme="red" size="sm" onClick={() => onDelete(s.id)}>
                  {t('common.delete')}
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SpeciesTable;
