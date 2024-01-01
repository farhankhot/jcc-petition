import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack, Text, Input, Checkbox, Button, List, ListItem, Link, theme, Divider } from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { getSignatures, saveSignature } from './firebaseService'; // Import Firebase service functions

function App() {
  const [signatures, setSignatures] = useState([]);
  const [newSignature, setNewSignature] = useState({ name: '', signed: false });

  useEffect(() => {
    // Fetch signatures from Firebase on component mount
    getSignatures().then(data => setSignatures(data));
  }, []);

  const addSignature = () => {
    if (newSignature.name && newSignature.signed) {
      const updatedSignatures = [...signatures, newSignature.name];
      setSignatures(updatedSignatures);
      saveSignature(newSignature.name); // Save to Firebase
      setNewSignature({ name: '', signed: false });
    }
  };

  const isSubmitDisabled = !newSignature.name || !newSignature.signed;

  return (
    <ChakraProvider theme={theme}>
      <VStack spacing={6} align="stretch" m={5}>
      <Box bg="blue.100" p={5} shadow="md" borderRadius="md">
          <Text align="center" fontWeight="bold">Petition for Jacuzzi Temperature Increase</Text>
          <Text mt={2} fontSize="md">
            We're gathering signatures to request an increase in the temperature of our gym/community center's jacuzzi. A slight increase 
            would greatly enhance the wellness experience for many users. Your support is crucial for bringing this change.
          </Text>
          <Text mt={4} fontSize="lg" fontWeight="bold">
            People signed so far: {signatures.length}
          </Text>
        </Box>

        <Box bg="orange.100" p={5} shadow="md" borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold">Sign the Petition</Text>
          <VStack mt={4} spacing={4}>
            <Input 
              placeholder="Your Name" 
              value={newSignature.name} 
              onChange={(e) => setNewSignature({ ...newSignature, name: e.target.value })} 
            />
            <Checkbox 
              isChecked={newSignature.signed}
              onChange={(e) => setNewSignature({ ...newSignature, signed: e.target.checked })}
            >
              I agree to sign this petition
            </Checkbox>
            <Button 
              colorScheme="pink" 
              onClick={addSignature} 
              isDisabled={isSubmitDisabled}
            >
              Submit
            </Button>
          </VStack>
        </Box>

        <Box bg="green.100" p={5} shadow="md" borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold">Signatures</Text>
          <List mt={4}>
            {signatures.map((name, index) => (
              <ListItem key={index} p={2} fontSize="lg">{name}</ListItem>
            ))}
          </List>
        </Box>

        <Box bg="purple.100" p={5} shadow="md" borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold">Share this Petition</Text>
          <QRCode value={window.location.href} />
        </Box>

        <Divider />

        <Box p={5}>
          <Text fontSize="sm" align="center">
            © {new Date().getFullYear()} Farhan Khot. All rights reserved.
            <br />
            <Link href="https://www.linkedin.com/in/farhan-khot-11a571263/" isExternal>
              LinkedIn
            </Link>
          </Text>
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
