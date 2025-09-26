import React, { useState, useEffect } from 'react';
import { Location, LocationData, LocationTypeEnum, LocationPurposeEnum, LocationStatusEnum } from '../../services/locationService';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Select, Textarea, Button, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface LocationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LocationData) => void;
  initialData?: Location | null;
}

const LocationForm: React.FC<LocationFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<LocationData>({
    name: '',
    location_type: LocationTypeEnum.CLIMATE_CONTROLLED_SHED,
    purpose: LocationPurposeEnum.BROODING,
    usable_area_sqm: 0,
    current_status: LocationStatusEnum.AVAILABLE,
    construction_date: null,
    notes: null,
  });
  const { t } = useTranslation();

  const toCamelCase = (s: string) => {
    return s.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        construction_date: initialData.construction_date ? new Date(initialData.construction_date).toISOString().split('T')[0] : null,
      });
    } else {
      setFormData({
        name: '',
        location_type: LocationTypeEnum.CLIMATE_CONTROLLED_SHED,
        purpose: LocationPurposeEnum.BROODING,
        usable_area_sqm: 0,
        current_status: LocationStatusEnum.AVAILABLE,
        construction_date: null,
        notes: null,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? t('locations.editLocation') : t('locations.createLocation')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto">
          <Stack as="form" onSubmit={handleSubmit} spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>{t('common.name')}</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="location_type" isRequired>
              <FormLabel>{t('locations.type')}</FormLabel>
              <Select name="location_type" value={formData.location_type} onChange={handleChange}>
                {Object.keys(LocationTypeEnum).map((key) => (
                  <option key={key} value={LocationTypeEnum[key as keyof typeof LocationTypeEnum]}>{t(`locations.${toCamelCase(key)}`)}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="purpose" isRequired>
              <FormLabel>{t('locations.purpose')}</FormLabel>
              <Select name="purpose" value={formData.purpose} onChange={handleChange}>
                {Object.keys(LocationPurposeEnum).map((key) => (
                  <option key={key} value={LocationPurposeEnum[key as keyof typeof LocationPurposeEnum]}>{t(`locations.${toCamelCase(key)}`)}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="usable_area_sqm">
              <FormLabel>{t('locations.usableAreaSqm')}</FormLabel>
              <Input
                type="number"
                name="usable_area_sqm"
                value={formData.usable_area_sqm}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="current_status">
              <FormLabel>{t('locations.status')}</FormLabel>
              <Select name="current_status" value={formData.current_status} onChange={handleChange}>
                {Object.keys(LocationStatusEnum).map((key) => (
                  <option key={key} value={LocationStatusEnum[key as keyof typeof LocationStatusEnum]}>{t(`locations.${toCamelCase(key)}`)}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="construction_date">
              <FormLabel>{t('locations.constructionDate')}</FormLabel>
              <Input
                type="date"
                name="construction_date"
                value={formData.construction_date || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="notes">
              <FormLabel>{t('locations.notes')}</FormLabel>
              <Textarea
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </FormControl>
            <Stack direction="row" spacing={2} justify="flex-end">
              <Button onClick={onClose}>Cancelar</Button>
              <Button colorScheme="blue" type="submit">
                Guardar
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LocationForm;
