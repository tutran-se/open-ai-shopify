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
  const [engineId, setEngineId] = useState("unselected");
  const inputRef = useRef();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (engineId === "unselected") {
      return null;
    }
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
            onChange={(e) => {
              if (e.target.value.trim().length === 0) {
                setEngineId("unselected");
              }
              setPrompt(e.target.value);
            }}
            autoFocus={true}
            ref={inputRef}
            size="lg"
            borderColor={colorMode === "light" ? "gray.400" : "gray.600"}
          />
        </FormControl>

        <HStack
          className={prompt.trim() && "fade-in-left"}
          hidden={!prompt.trim()}
        >
          <FormControl>
            <Select
              value={engineId}
              onChange={(e) => setEngineId(e.target.value)}
            >
              <option value="unselected" hidden>
                Select an AI engine
              </option>
              <option value="text-davinci-002">Davinci - Most capable</option>
              <option value="text-curie-001">
                Curie - Less capable, but fast (Recommended)
              </option>
              <option value="text-babbage-001">
                Babbage - Straightforward and fast
              </option>
              <option value="text-ada-001">Ada - Simple and fast</option>
            </Select>
          </FormControl>
        </HStack>

        <br />
        <Button
          colorScheme="teal"
          size="lg"
          disabled={!prompt.trim() || isLoading || engineId === "unselected"}
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
