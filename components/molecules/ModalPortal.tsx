import React, {Fragment, useMemo} from "react";

import {Flex} from "components/atoms";
import {ColorKey, zIndex} from "theme";
import {useModal} from "utils/modal";

export const ModalPortal: React.FunctionComponent = (props) => {
  const {modalDataList} = useModal();

  return (
    <>
      {modalDataList.length < 1 
        ? null
        : (
          <Flex sx={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: zIndex.modal
          }}>
            {modalDataList.map((item, index) => (
              <Flex 
                key={`modal-${item.id}`} 
                sx={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: ColorKey["modal.shadow.bg"],
                }}
              >
                {item.children 
                  ? (
                    <item.children.type 
                      id={item.id}
                      {...item.children.props}
                    />
                  ) 
                  : null
                }
              </Flex>
            ))}
          </Flex>
        )
      }
    </>
  )
};
