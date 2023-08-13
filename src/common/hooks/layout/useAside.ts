/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from "next/router";
import { useState } from "react";
import LIST_MENU, { type MenuItemType } from "~/common/constants/MENU";
import { useGlobalContext } from "~/common/context/GlobalContext";

const useAside = () => {
  const {
    state: { user },
  } = useGlobalContext();

  const router = useRouter();
  const [listMenu, setListMenu] = useState<MenuItemType[]>(LIST_MENU);

  const handleCollapse = (indexList: number) => {
    const tempCollapseData = [...listMenu];

    tempCollapseData.map((list) => {
      if (tempCollapseData[indexList]?.type === list.type) {
        tempCollapseData[indexList]!.isOpen =
          !tempCollapseData[indexList]?.isOpen;
      } else {
        list.isOpen = false;
      }

      return false;
    });

    setListMenu(tempCollapseData);
  };

  const handleCloseCollapse = () => {
    const tempCollapse = [...listMenu];
    tempCollapse.forEach((value: any, indexList: number) => {
      if (value?.isOpen) {
        tempCollapse[indexList]!.isOpen = !tempCollapse[indexList]?.isOpen;
      }
    });
    setListMenu(tempCollapse);
  };

  return { router, listMenu, user, handleCollapse, handleCloseCollapse };
};

export { useAside };
