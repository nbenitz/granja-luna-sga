import React, { useState, useEffect } from 'react';
import { Breed, BreedData, BreedProductionTypeEnum } from '../../services/breedService';
import { getAllSpecies, Species } from '../../services/speciesService';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Select, Textarea, Button, Stack, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface BreedFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BreedData) => void;
  initialData?: Breed | null;
}

const BreedForm: React.FC<BreedFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<BreedData>({ name: '', production_type: BreedProductionTypeEnum.LAYER, avg_adult_weight_kg: 0, space_required_m2_per_bird: 0, productive_lifespan_weeks: 0, sexual_maturity_age_weeks: 0, description: '', species_id: '' as any }); // Changed species_id to empty string
  const [species, setSpecies] = useState<Species[]>([]);
  const { t } = useTranslation();
  const toast = useToast();

  const toCamelCase = (s: string) => {
    return s.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  };

  useEffect(() => {
    if (isOpen) {
      getAllSpecies().then(setSpecies);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', production_type: BreedProductionTypeEnum.LAYER, avg_adult_weight_kg: 0, space_required_m2_per_bird: 0, productive_lifespan_weeks: 0, sexual_maturity_age_weeks: 0, description: '', species_id: '' as any }); // Changed species_id to empty string
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.species_id === '' || formData.species_id === 0 as any) {
      toast({
        title: t('breeds.speciesRequired'), // New translation key
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSubmit({ ...formData, species_id: Number(formData.species_id) }); // Convert species_id to number
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? t('breeds.editBreed') : t('breeds.createBreed')}</ModalHeader>
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
            <FormControl id="production_type" isRequired>
              <FormLabel>{t('breeds.productionType')}</FormLabel>
              <Select name="production_type" value={formData.production_type} onChange={handleChange}>
                {Object.values(BreedProductionTypeEnum).map((type) => (
                  <option key={type} value={type}>{t(`breeds.${toCamelCase(type)}`)}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="avg_adult_weight_kg">
              <FormLabel>{t('breeds.avgAdultWeightKg')}</FormLabel>
              <Input
                type="number"
                name="avg_adult_weight_kg"
                value={formData.avg_adult_weight_kg || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="space_required_m2_per_bird">
              <FormLabel>{t('breeds.spaceRequiredM2PerBird')}</FormLabel>
              <Input
                type="number"
                name="space_required_m2_per_bird"
                value={formData.space_required_m2_per_bird || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="productive_lifespan_weeks">
              <FormLabel>{t('breeds.productiveLifespanWeeks')}</FormLabel>
              <Input
                type="number"
                name="productive_lifespan_weeks"
                value={formData.productive_lifespan_weeks || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="sexual_maturity_age_weeks">
              <FormLabel>{t('breeds.sexualMaturityAgeWeeks')}</FormLabel>
              <Input
                type="number"
                name="sexual_maturity_age_weeks"
                value={formData.sexual_maturity_age_weeks || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>{t('common.description')}</FormLabel>
              <Textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="species_id" isRequired>
              <FormLabel>{t('breeds.species')}</FormLabel>
              <Select name="species_id" value={formData.species_id} onChange={handleChange}>
                <option value="">{t('breeds.selectSpecies')}</option> {/* Changed value to empty string */}
                {species.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2} justify="flex-end">
              <Button onClick={onClose}>{t('common.cancel')}</Button>
              <Button colorScheme="blue" type="submit">
                {t('common.save')}
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BreedForm;
