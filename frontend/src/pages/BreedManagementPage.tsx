import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import BreedTable from '../components/breeds/BreedTable';
import BreedForm from '../components/breeds/BreedForm';
import { getAllBreeds, createBreed, updateBreed, deleteBreed, Breed, BreedData } from '../services/breedService';
import { getAllSpecies, Species } from '../services/speciesService';
import { useTranslation } from 'react-i18next';

const BreedManagementPage: React.FC = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [species, setSpecies] = useState<Species[]>([]); // New state for species
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingBreed, setEditingBreed] = useState<Breed | null>(null);
  const { t } = useTranslation();

  const fetchBreedsAndSpecies = async () => {
    try {
      setLoading(true);
      const breedsData = await getAllBreeds();
      setBreeds(breedsData);
      const speciesData = await getAllSpecies(); // Fetch species data
      setSpecies(speciesData);
    } catch (err) {
      setError(t('common.errorFetchingBreedsAndSpecies')); // Updated error message
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreedsAndSpecies();
  }, []);

  const handleFormSubmit = async (data: BreedData) => {
    try {
      if (editingBreed) {
        await updateBreed(editingBreed.id, data);
      } else {
        await createBreed(data);
      }
      fetchBreedsAndSpecies(); // Refresh both breeds and species
      onClose();
      setEditingBreed(null);
    } catch (err) {
      setError(t('common.errorSavingBreed'));
      console.error(err);
    }
  };

  const handleEdit = (b: Breed) => {
    setEditingBreed(b);
    onOpen();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(t('common.confirmDelete', { item: t('breeds.single') }))) {
      try {
        await deleteBreed(id);
        fetchBreedsAndSpecies(); // Refresh both breeds and species
      } catch (err) {
        setError(t('common.errorDeletingBreed'));
        console.error(err);
      }
    }
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>{t('breeds.management')}</Heading>
      <Button colorScheme="blue" onClick={onOpen} mb={4}>{t('breeds.addNew')}</Button>
      <BreedTable breeds={breeds} species={species} onEdit={handleEdit} onDelete={handleDelete} /> {/* Pass species to BreedTable */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingBreed ? t('breeds.editBreed') : t('breeds.createBreed')}</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <BreedForm
              isOpen={isOpen}
              onSubmit={handleFormSubmit}
              initialData={editingBreed}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BreedManagementPage;