import { useState } from "react";

const useMenu = () => {
  const [selection, setSelection] = useState();

  return { selection, menu };
};

export default useMenu;
