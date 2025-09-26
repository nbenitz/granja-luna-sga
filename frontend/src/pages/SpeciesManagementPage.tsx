import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { getAllSpecies, createSpecies, updateSpecies, deleteSpecies } from '../services/speciesService';
import SpeciesTable from '../components/species/SpeciesTable';
import SpeciesForm from '../components/species/SpeciesForm';
import { useTranslation } from 'react-i18next';

interface Species {
  id: number;
  name: string;
  incubation_period_days: number;
  description?: string;
}

const SpeciesManagementPage: React.FC = () => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingSpecies, setEditingSpecies] = useState<Species | undefined>(undefined);
  const { t } = useTranslation();

  const fetchSpecies = async () => {
    try {
      setLoading(true);
      const data = await getAllSpecies();
      setSpecies(data);
    } catch (err) {
      setError(t('common.errorFetchingSpecies'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecies();
  }, []);

  const handleCreateOrUpdate = async (speciesData: Omit<Species, 'id'>) => {
    try {
      if (editingSpecies) {
        await updateSpecies(editingSpecies.id, speciesData);
      } else {
        await createSpecies(speciesData);
      }
      onClose();
      setEditingSpecies(undefined);
      fetchSpecies();
    } catch (err) {
      setError(t('common.errorSavingSpecies'));
      console.error(err);
    }
  };

  const handleEdit = (speciesToEdit: Species) => {
    setEditingSpecies(speciesToEdit);
    onOpen();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(t('common.confirmDelete', { item: t('species.single') }))) {
      try {
        await deleteSpecies(id);
        fetchSpecies();
      } catch (err) {
        setError(t('common.errorDeletingSpecies'));
        console.error(err);
      }
    }
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>{t('species.management')}</Heading>
      <Button colorScheme="green" onClick={onOpen} mb={4}>{t('species.addNew')}</Button>

      <SpeciesTable species={species} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingSpecies ? t('species.editSpecies') : t('species.createSpecies')}</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <SpeciesForm
              initialData={editingSpecies}
              onSubmit={handleCreateOrUpdate}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SpeciesManagementPage;