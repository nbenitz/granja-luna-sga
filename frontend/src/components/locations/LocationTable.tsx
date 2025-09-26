import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box } from '@chakra-ui/react';
import { Location } from '../services/locationService';
import { useTranslation } from 'react-i18next';

interface LocationTableProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (id: number) => void;
}

const LocationTable: React.FC<LocationTableProps> = ({ locations, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const toCamelCase = (s: string) => {
    return s.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t('common.id')}</Th><Th>{t('common.name')}</Th><Th>{t('locations.type')}</Th><Th>{t('locations.purpose')}</Th><Th>{t('locations.usableAreaSqm')}</Th><Th>{t('locations.status')}</Th><Th>{t('locations.constructionDate')}</Th><Th>{t('locations.notes')}</Th><Th>{t('common.actions')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {locations.map((l) => (
            <Tr key={l.id}>
              <Td>{l.id}</Td><Td>{l.name}</Td><Td>{t(`locations.${toCamelCase(l.location_type)}`)}</Td><Td>{t(`locations.${toCamelCase(l.purpose)}`)}</Td><Td>{l.usable_area_sqm}</Td><Td>{t(`locations.${toCamelCase(l.current_status)}`)}</Td><Td>{l.construction_date}</Td><Td>{l.notes}</Td><Td>
                <Button colorScheme="blue" size="sm" onClick={() => onEdit(l)} mr={2}>
                  {t('common.edit')}
                </Button>
                <Button colorScheme="red" size="sm" onClick={() => onDelete(l.id)}>
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

export default LocationTable;