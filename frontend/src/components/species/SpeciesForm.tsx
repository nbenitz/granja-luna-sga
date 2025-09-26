import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Textarea, Button, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface SpeciesFormProps {
  initialData?: {
    id?: number;
    name: string;
    incubation_period_days: number;
    description?: string;
  };
  onSubmit: (data: { name: string; incubation_period_days: number; description?: string }) => void;
  onClose: () => void;
}

const SpeciesForm: React.FC<SpeciesFormProps> = ({ initialData, onSubmit, onClose }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [incubationPeriodDays, setIncubationPeriodDays] = useState(initialData?.incubation_period_days || 0);
  const [description, setDescription] = useState(initialData?.description || '');
  const { t } = useTranslation();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIncubationPeriodDays(initialData.incubation_period_days);
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, incubation_period_days: incubationPeriodDays, description });
  };

  return (
    <Stack as="form" onSubmit={handleSubmit} spacing={4}>
      <FormControl id="name" isRequired>
        <FormLabel>{t('common.name')}</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="incubation_period_days" isRequired>
        <FormLabel>{t('species.incubationPeriodDays')}</FormLabel>
        <Input
          type="number"
          value={incubationPeriodDays}
          onChange={(e) => setIncubationPeriodDays(parseInt(e.target.value))}
        />
      </FormControl>
      <FormControl id="description">
        <FormLabel>{t('common.description')}</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <Stack direction="row" spacing={2} justify="flex-end">
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <Button colorScheme="blue" type="submit">
          {initialData ? t('common.update') : t('common.create')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default SpeciesForm;
