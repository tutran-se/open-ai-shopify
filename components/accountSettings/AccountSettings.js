import {
  Avatar,
  Button,
  Center,
  Text,
  useDisclosure,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContextProvider";
import UploadModal from "./UploadModal";

const AccountSettings = () => {
  const {
    userInfo: { displayName, photoURL, email },
  } = useAuth();
  const inputFileRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sliderValue, setSliderValue] = React.useState(1.2);
  const [sampleImage, setSampleImage] = useState("");
  const [file, setFile] = useState("");
  const onFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSampleImage(file);
    onOpen();
  };
  const onModalClose = () => {
    setFile("");
    setSliderValue(1.2);
    onClose();
  };

  return (
    <Center h="80vh">
      <VStack>
        <WrapItem>
          <Avatar name={displayName} src={photoURL} />
        </WrapItem>
        <Text>
          {email} - {displayName}
        </Text>
        <br />
        <form>
          <Button type="button" onClick={() => inputFileRef.current.click()}>
            Change Avatar
          </Button>

          <input
            type="file"
            name="avatarUpload"
            id="avatarUpload"
            hidden
            ref={inputFileRef}
            value={file}
            onChange={onFileChange}
            accept="image/*"
          />
        </form>
      </VStack>
      <UploadModal
        isOpen={isOpen}
        onClose={onModalClose}
        sampleImage={sampleImage}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
    </Center>
  );
};

export default AccountSettings;
