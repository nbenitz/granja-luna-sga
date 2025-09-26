import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box } from '@chakra-ui/react';
import { Breed } from '../services/breedService';
import { Species } from '../services/speciesService';
import { useTranslation } from 'react-i18next';

interface BreedTableProps {
  breeds: Breed[];
  species: Species[]; // New prop for species data
  onEdit: (breed: Breed) => void;
  onDelete: (id: number) => void;
}

const BreedTable: React.FC<BreedTableProps> = ({ breeds, species, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const toCamelCase = (s: string) => {
    return s.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  };

  const getSpeciesName = (speciesId: number) => {
    const foundSpecies = species.find(s => s.id === speciesId);
    return foundSpecies ? foundSpecies.name : t('common.unknown');
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t('common.id')}</Th><Th>{t('common.name')}</Th><Th>{t('breeds.productionType')}</Th><Th>{t('breeds.avgAdultWeightKg')}</Th><Th>{t('breeds.spaceRequiredM2PerBird')}</Th><Th>{t('breeds.productiveLifespanWeeks')}</Th><Th>{t('breeds.sexualMaturityAgeWeeks')}</Th><Th>{t('common.description')}</Th><Th>{t('breeds.species')}</Th><Th>{t('common.actions')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {breeds.map((b) => (
            <Tr key={b.id}>
              <Td>{b.id}</Td><Td>{b.name}</Td><Td>{t(`breeds.${toCamelCase(b.production_type)}`)}</Td><Td>{b.avg_adult_weight_kg}</Td><Td>{b.space_required_m2_per_bird}</Td><Td>{b.productive_lifespan_weeks}</Td><Td>{b.sexual_maturity_age_weeks}</Td><Td>{b.description}</Td><Td>{getSpeciesName(b.species_id)}</Td><Td>
                <Button colorScheme="blue" size="sm" onClick={() => onEdit(b)} mr={2}>
                  {t('common.edit')}
                </Button>
                <Button colorScheme="red" size="sm" onClick={() => onDelete(b.id)}>
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

export default BreedTable;