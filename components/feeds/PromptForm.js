import React, { useState, useRef } from "react";
import { Button, FormControl, Input, Select, VStack } from "@chakra-ui/react";
import { createFeed } from "../../libs/feeds";

const PromptForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [engineId, setEngineId] = useState("text-curie-001");
  const inputRef = useRef();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(prompt);
    console.log(engineId);
    await createFeed({ prompt, engineId });
    setIsLoading(false);
    setPrompt("");
    inputRef.current.focus();
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
            ref={inputRef}
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
          disabled={!prompt.trim() || isLoading}
          type="submit"
          loadingText="Processing..."
          isLoading={isLoading}
        >
          🚀 Get Result
        </Button>
      </VStack>
    </form>
  );
};

export default PromptForm;
