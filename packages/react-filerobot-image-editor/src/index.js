// Main component with the rich canvas contains all the features.
export { default } from 'components/ImageEditor';

export { default as VideoEditor } from 'components/VideoEditor';

/** State management & UI controls exports */
export { default as FilerobotImageEditorProvider } from 'components/Shared/Providers';

export { default as App } from 'components/Shared/AssemblyPoint';

export { default as Tabs } from 'components/Shared/Tabs';

export { default as Topbar } from 'components/Shared/Topbar';

export { default as Toolsbar } from 'components/Shared/ToolsBar';

/** Canvas & layers exports */

// contains all the design layer & transformers, no need to add children for it if used.
export { default as RichCanvas } from 'components/Shared/MainCanvas';

export { default as CanvasWrapper } from 'components/Shared/MainCanvas/MainCanvasWrapper';

export { default as DesignLayerWrapper } from 'components/Shared/Layers/DesignLayer/DesignLayerWrapper';

export { default as DesignLayerAnnotations } from 'components/Shared/Layers/DesignLayer/AnnotationNodes';

export { default as DesignLayerPreviewGroup } from 'components/Shared/Layers/DesignLayer/PreviewGroup';

export { default as DesignLayerEllipseNode } from 'components/Shared/Layers/DesignLayer/AnnotationNodes/EllipseNode';

export { default as DesignLayerRectNode } from 'components/Shared/Layers/DesignLayer/AnnotationNodes/RectNode';

export { default as DesignLayerPolygonNode } from 'components/Shared/Layers/DesignLayer/AnnotationNodes/PolygonNode';

export { default as DesignLayerTextNode } from 'components/Shared/Layers/DesignLayer/AnnotationNodes/TextNode';

export { default as DesignLayerImageNode } from 'components/Shared/Layers/DesignLayer/AnnotationNodes/ImageNode';

export { default as DesignLayerLineNode } from 'components/Shared/Layers/DesignLayer/AnnotationNodes/LineNode';

export { default as DesignLayerArrowNode } from 'components/Shared/Layers/DesignLayer/AnnotationNodes/ArrowNode';

export { default as TransformersLayerWrapper } from 'components/Shared/Layers/TransformersLayer/TransformersLayerWrapper';

export { default as NodesTransformer } from 'components/Shared/Layers/TransformersLayer/NodesTransformer';

export { default as CropTransformer } from 'components/Shared/Layers/TransformersLayer/CropTransformer';

/** UI Info/data exports */

export { default as ImageInfo } from 'components/Shared/ImageInfo';

/** Constants/utilities/abstraction/miscellaneous/Other-UI exports */

export { TABS_IDS as TABS, TOOLS_IDS as TOOLS } from 'utils/constants';

export { ANNOTATION_NAMES_TO_COMPONENT as ANNOTATION_NAMES_TO_NODES } from 'components/Shared/Layers/DesignLayer/AnnotationNodes/AnnotationNodes.constants';

export { default as emitCustomEvent } from 'utils/emitCustomEvent';

export * from 'components/Shared/Common';

export * from 'components/Shared/Tabs';

export * from 'components/Shared/Buttons';

export * from 'utils/constants';

export * from 'hooks';
