import React, { useContext, useEffect } from 'react';

import useAnnotation from '../../../../hooks/useAnnotation';
import { DEFAULT_FONTS, ANNOTATIONS_NAMES } from '../../../../utils/constants';
import ShapesOptionsPopup from '../../../ShapesOptionsPopup';

import { AnnotateOperationsWrapper } from './Operations.styled';

const Text = ({
  defaultFill = '#000000', defaultText = 'Filerobot', defaultFontFamily = DEFAULT_FONTS[0], defaultFontSize = 20,
}) => {
  return
  // const { transformer, selections = [] } = useContext(Context);
  // useAnnotation({
  //   defaultFill,
  //   libClassName: 'Text',
  //   name: ANNOTATIONS_NAMES.TEXT,
  //   text: defaultText,
  //   fontFamily: defaultFontFamily,
  //   fontSize: defaultFontSize,
  //   events: {
  //     transform: (e) => {
  //       // Assing the X & Y scaling values to the text's box width and height
  //       // and reset the text's X & Y scales for avoiding text self scaling.
  //       e.target.setAttrs({
  //         width: e.target.width() * e.target.scaleX(),
  //         height: e.target.height() * e.target.scaleY(),
  //         scaleX: 1,
  //         scaleY: 1,
  //       });
  //     },
  //   },
  // });

  // useEffect(() => {
  //   transformer.boundBoxFunc((_oldBox, newBox) => {
  //     newBox.width = Math.max(13, newBox.width);
  //     newBox.height = Math.max(13, newBox.height);
  //     return newBox;
  //   });

  //   return () => {
  //     transformer.boundBoxFunc(undefined);
  //   };
  // }, [transformer]);

  // if (!selections[0]) { return ''; }

  // return <ShapesOptionsPopup />;
};

export default Text;
