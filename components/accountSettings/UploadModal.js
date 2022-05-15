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
import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContextProvider";
import { auth, db, storage } from "../../config/firebase";
import { updateProfile } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

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
  const [showTooltip, setShowTooltip] = useState(false);
  const [editor, setEditor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, setUserInfo } = useAuth();
  const setEditorRef = (editor) => setEditor(editor);
  const onClickSave = async () => {
    setIsLoading(true);
    const canvas = editor.getImageScaledToCanvas();
    const file = await canvasToFile(canvas);
    console.log(file);
    // upload to Firebase Storage

    const metadata = {
      contentType: "image/png",
    };

    let fileName = `${userInfo.uid}-${file.size}-avatar.png`;
    const avatarRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(avatarRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);

        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(async () => {
              // Profile updated!
              // ...
              setUserInfo({ ...userInfo, photoURL: downloadURL });

              // update all feed items that belong to this user
              const q = query(
                collection(db, "feeds"),
                where("creator.uid", "==", auth.currentUser.uid)
              );
              try {
                const querySnapshot = await getDocs(q);
                const allFeedIds = [];
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  allFeedIds.push(doc.id);
                  // console.log(doc.id, " => ", doc.data());
                });
                console.log(allFeedIds);

                for (const id of allFeedIds) {
                  console.log("run");
                  console.log(downloadURL);
                  const docRef = doc(db, "feeds", id);
                  await updateDoc(docRef, {
                    "creator.photoURL": downloadURL,
                  });
                }
                setIsLoading(false);
                onClose();
                console.log("Finish Updated.");
              } catch (error) {
                console.log(error);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    );
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
              isLoading={isLoading}
              disabled={isLoading}
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
