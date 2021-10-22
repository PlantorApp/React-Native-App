import React from "react"
import {
  Divider,
  Actionsheet,
  useDisclose
} from "native-base"

import { AntDesign} from '@expo/vector-icons';


const EditEnv = () => {
  const { isOpen, onOpen, onClose } = useDisclose()

  return (
    <>
      {/* <Button onPress={onOpen}>Actionsheet</Button> */}
      <AntDesign name="ellipsis1" size={24} color="black" onPress={onOpen}/>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item justifyContent="center">
            Rename Environment
          </Actionsheet.Item>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item justifyContent="center">
            Delete Environment
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

export default EditEnv;
