import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import AvatarEditor from "react-avatar-editor";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

const canvasToFile = (canvas) => {
  const promise = new Promise((resolve) => {
    canvas.toBlob(function (blob) {
      let file;
      file = new File([blob], "uploadFile.png", {
        type: "image/png",
      });
      resolve(file);
    });
  });

  return promise;
};
const UploadModal = ({
  isOpen,
  onClose,
  sampleImage,
  sliderValue,
  setSliderValue,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [editor, setEditor] = React.useState("");

  const setEditorRef = (editor) => setEditor(editor);
  const onClickSave = async () => {
    const canvas = editor.getImageScaledToCanvas();
    const file = await canvasToFile(canvas);
    console.log(file);
    // upload to Firebase Storage

    // update user avatar

    // close modal
    onClose();
  };
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        allowPinchZoom
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Avatar Cropper</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} justifyContent="center">
            <AvatarEditor
              ref={setEditorRef}
              image={sampleImage}
              width={250}
              height={250}
              borderRadius={250}
              border={50}
              color={[0, 0, 0, 0.6]} // RGBA
              scale={sliderValue}
              rotate={0}
            />
          </ModalBody>
          <ModalBody display={"flex"} justifyContent="center">
            <Slider
              aria-label="slider-ex-1"
              min={0.1}
              max={3}
              step={0.1}
              value={sliderValue}
              onChange={(v) => setSliderValue(v)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              width="70%"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>

              <SliderMark value={0.1} mt="1" ml="-2.5" fontSize="sm">
                0.1
              </SliderMark>
              <SliderMark value={1.5} mt="1" ml="-2.5" fontSize="sm">
                1.5
              </SliderMark>
              <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                3
              </SliderMark>
              <Tooltip
                hasArrow
                bg="teal.500"
                color="white"
                placement="top"
                isOpen={showTooltip}
                label={`${sliderValue}`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </ModalBody>

          <ModalFooter mt={8} display={"flex"} justifyContent="center" py={6}>
            <Button
              onClick={onClickSave}
              colorScheme="teal"
              size={"lg"}
              loadingText="Uploading..."
              //   isLoading={true}
            >
              Save & Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadModal;
