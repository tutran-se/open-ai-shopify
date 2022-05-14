import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";

const PromptForm = () => {
  const [prompt, setPrompt] = useState("");
  const [engineId, setEngineId] = useState("text-curie-001");
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(prompt);
    console.log(engineId);
  };
  return (
    <form onSubmit={onFormSubmit}>
      <VStack spacing={4}>
        <FormControl>
          <Input
            id="prompt"
            type="text"
            placeholder="Your Prompt... e.g: How to open online store on Shopify?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            autoFocus={true}
          />
        </FormControl>
        <FormControl>
          <Select
            defaultValue={engineId}
            onChange={(e) => setEngineId(e.target.value)}
          >
            <option value="text-davinci-002">Engine: text-davinci-002</option>
            <option value="text-curie-001">
              Engine: text-curie-001 (Recommended)
            </option>
            <option value="text-babbage-001">Engine: text-babbage-001</option>
            <option value="text-ada-001">Engine: text-ada-001</option>
          </Select>
        </FormControl>
        <br />
        <Button
          colorScheme="teal"
          size="lg"
          disabled={!prompt.trim()}
          type="submit"
          // loadingText="Processing..."
          // isLoading={true}
        >
          Get Result
        </Button>
      </VStack>
    </form>
  );
};

export default PromptForm;
