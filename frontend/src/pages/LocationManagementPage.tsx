import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import LocationTable from '../components/locations/LocationTable';
import LocationForm from '../components/locations/LocationForm';
import { getAllLocations, createLocation, updateLocation, deleteLocation, Location, LocationData } from '../services/locationService';
import { useTranslation } from 'react-i18next';

const LocationManagementPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const { t } = useTranslation();

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const data = await getAllLocations();
      setLocations(data);
    } catch (err) {
      setError(t('common.errorFetchingLocations'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleFormSubmit = async (data: LocationData) => {
    try {
      if (editingLocation) {
        await updateLocation(editingLocation.id, data);
      } else {
        await createLocation(data);
      }
      fetchLocations();
      onClose();
      setEditingLocation(null);
    } catch (err) {
      setError(t('common.errorSavingLocation'));
      console.error(err);
    }
  };

  const handleEdit = (l: Location) => {
    setEditingLocation(l);
    onOpen();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(t('common.confirmDelete', { item: t('locations.single') }))) {
      try {
        await deleteLocation(id);
        fetchLocations();
      } catch (err) {
        setError(t('common.errorDeletingLocation'));
        console.error(err);
      }
    }
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>{t('locations.management')}</Heading>
      <Button colorScheme="blue" onClick={onOpen} mb={4}>{t('locations.addNew')}</Button>
      <LocationTable locations={locations} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingLocation ? t('locations.editLocation') : t('locations.createLocation')}</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <LocationForm
              isOpen={isOpen}
              onSubmit={handleFormSubmit}
              initialData={editingLocation}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LocationManagementPage;
