import React, { useState, useRef } from "react";
import {
  Button,
  FormControl,
  HStack,
  Input,
  Select,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { createFeed } from "../../libs/feeds";

const PromptForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [engineId, setEngineId] = useState("text-curie-001");
  const inputRef = useRef();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await createFeed({ prompt, engineId });
    setIsLoading(false);
    setPrompt("");
    inputRef.current.focus();
  };
  const { colorMode } = useColorMode();
  return (
    <form onSubmit={onFormSubmit}>
      <VStack spacing={4}>
        <FormControl>
          <Input
            id="prompt"
            type="text"
            placeholder="e.g: Write a poem about dog"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            autoFocus={true}
            ref={inputRef}
            size="lg"
            borderColor={colorMode === "light" ? "gray.400" : "gray.600"}
          />
        </FormControl>

        <HStack
          className={prompt.trim() ? "fade-in-left" : "fade-out-right"}
          hidden={!prompt.trim()}
        >
          {/* {prompt.trim() && ( */}
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
          {/* )} */}
        </HStack>

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
