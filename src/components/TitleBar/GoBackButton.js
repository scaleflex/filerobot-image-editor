import React, { useContext } from 'react';
import { GoBack } from "@scaleflex/icons";
import { IconButton } from "@scaleflex/ui/core";
import Context from '../../context';

const GoBackButton = () => {
  const { tab, subTab, updateState } = useContext(Context);

  const goBack = () => {
    if (subTab || tab) {
      updateState({
        [subTab ? 'subTab' : 'tab']: null
      })
    }
  }

  return (
    <IconButton
      color="link"
      size="sm"
      onClick={goBack}
    >
      <GoBack />
    </IconButton>
  );
}

export default GoBackButton;
