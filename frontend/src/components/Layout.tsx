import React, { ReactNode } from 'react';
import { Box, Flex, Link, VStack, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <Flex direction="row" minH="100vh">
      {/* Sidebar */}
      <Box
        as="nav"
        bg="gray.800"
        color="white"
        w={{ base: isOpen ? "full" : "0", md: "250px" }}
        p={4}
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        transition="width 0.3s ease-in-out"
        overflowY="auto"
        position="fixed"
        h="full"
        zIndex="sticky"
      >
        <VStack align="stretch" spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Granja Luna</Text>
          <Link as={RouterLink} to="/management/species" _hover={{ textDecoration: 'none', color: 'gray.400' }}>
            <Text>{t('species.management')}</Text>
          </Link>
          <Link as={RouterLink} to="/management/breeds" _hover={{ textDecoration: 'none', color: 'gray.400' }}>
            <Text>{t('breeds.management')}</Text>
          </Link>
          <Link as={RouterLink} to="/management/locations" _hover={{ textDecoration: 'none', color: 'gray.400' }}>
            <Text>{t('locations.management')}</Text>
          </Link>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box
        flex="1"
        ml={{ base: "0", md: "250px" }}
        p={4}
        transition="margin-left 0.3s ease-in-out"
      >
        <IconButton
          aria-label={t('common.openMenu')}
          icon={<FiMenu />}
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          mb={4}
          size="lg"
        />
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;