// Main component with the rich canvas contains all the features.
export { default } from 'components/AssemblyPoint';

/** State management & UI controls exports */
export { default as FilerobotImageEditorProvider } from 'components/AssemblyPoint/Providers';

export { default as App } from 'components/App';

export { default as Tabs } from 'components/Tabs';

export { default as Topbar } from 'components/Topbar';

export { default as Toolsbar } from 'components/ToolsBar';

/** Canvas & layers exports */

// contains all the design layer & transformers, no need to add children for it if used.
export { default as RichCanvas } from 'components/MainCanvas';

export { default as CanvasWrapper } from 'components/MainCanvas/MainCanvasWrapper';

export { default as DesignLayerWrapper } from 'components/Layers/DesignLayer/DesignLayerWrapper';

export { default as DesignLayerAnnotations } from 'components/Layers/DesignLayer/AnnotationNodes';

export { default as DesignLayerPreviewGroup } from 'components/Layers/DesignLayer/PreviewGroup';

export { default as DesignLayerEllipseNode } from 'components/Layers/DesignLayer/AnnotationNodes/EllipseNode';

export { default as DesignLayerRectNode } from 'components/Layers/DesignLayer/AnnotationNodes/RectNode';

export { default as DesignLayerPolygonNode } from 'components/Layers/DesignLayer/AnnotationNodes/PolygonNode';

export { default as DesignLayerTextNode } from 'components/Layers/DesignLayer/AnnotationNodes/TextNode';

export { default as DesignLayerImageNode } from 'components/Layers/DesignLayer/AnnotationNodes/ImageNode';

export { default as DesignLayerLineNode } from 'components/Layers/DesignLayer/AnnotationNodes/LineNode';

export { default as DesignLayerArrowNode } from 'components/Layers/DesignLayer/AnnotationNodes/ArrowNode';

export { default as TransformersLayerWrapper } from 'components/Layers/TransformersLayer/TransformersLayerWrapper';

export { default as NodesTransformer } from 'components/Layers/TransformersLayer/NodesTransformer';

export { default as CropTransformer } from 'components/Layers/TransformersLayer/CropTransformer';

/** UI Info/data exports */

export { default as ImageInfo } from 'components/ImageInfo';

/** Constants/utilities/abstraction/miscellaneous/Other-UI exports */

export { TABS_IDS as TABS, TOOLS_IDS as TOOLS } from 'utils/constants';

export { ANNOTATION_NAMES_TO_COMPONENT as ANNOTATION_NAMES_TO_NODES } from 'components/Layers/DesignLayer/AnnotationNodes/AnnotationNodes.constants';

export { default as emitCustomEvent } from 'utils/emitCustomEvent';

export * from 'components/common';

export * from 'components/Tabs';

export * from 'components/buttons';

export * from 'utils/constants';

export * from 'hooks';
