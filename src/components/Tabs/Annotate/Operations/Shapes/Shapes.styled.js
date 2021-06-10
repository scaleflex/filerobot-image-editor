import styled, { css } from 'styled-components';

const ShapesWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  ${props => props.alignCenter
    ? `
      margin: 0 auto;
      width: fit-content;
    `
    : undefined}
`;

const SideShapesWrapper = styled.div(
  ({ theme }) => css`
    max-height: 45px;
    overflow: auto;
    
    /* width */
    ::-webkit-scrollbar {
      width: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${theme.palette['active-secondary-active']}; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${theme.palette['accent-primary']}; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.palette['accent-primary-active']};
    }
  `
);

const CurrentShapeWrapper = styled.div`
  flex-grow: 1;
  margin: 0 auto;
`;

const PreviewRect = styled.div.attrs(
    (props) => ({
      style: {
        left: props.x,
        top: props.y,
        display: props.x && props.y && !props.draw ? 'block' : 'none',
        width: props.width,
        height: props.height,
      }
    })
  )(
  ({ theme }) => css`
    position: absolute;
    background: ${theme.palette['accent-primary']};
    opacity: 0.5;
    border: 1px solid ${theme.palette['borders-strong']};
    z-index: 1;
    pointer-events: none;
  `
);

const PreviewCircle = styled.div.attrs(
    (props) => ({
      style: {
        left: props.x - (props.radius || 0),
        top: props.y - (props.radius || 0),
        display: props.x && props.y && !props.draw ? 'block' : 'none',
        width: (props.radius || 0) * 2,
        height: (props.radius || 0) * 2,
        borderRadius: '50%',
      }
    })
  )(
  ({ theme }) => css`
    position: absolute;
    background: ${theme.palette['accent-primary']};
    opacity: 0.5;
    border: 1px solid ${theme.palette['borders-strong']};
    z-index: 1;
    pointer-events: none;
  `
);

const PreviewEllipse = styled.div.attrs(
  (props) => ({
    style: {
      left: props.x - (props.radiusX || 0),
      top: props.y - (props.radiusY || 0),
      display: props.x && props.y && !props.draw ? 'block' : 'none',
      width: (props.radiusX || 0) * 2,
      height: (props.radiusY || 0) * 2,
      borderRadius: '50%',
    }
  })
)(
  ({ theme }) => css`
    position: absolute;
    background: ${theme.palette['accent-primary']};
    opacity: 0.5;
    border: 1px solid ${theme.palette['borders-strong']};
    z-index: 1;
    pointer-events: none;
  `
);

const PreviewPolygon = styled.div.attrs(
  (props) => ({
    style: {
      left: props.x - ((props.radius / 2) || 0),
      top: props.y - ((props.radius / 2) || 0),
      display: props.x && props.y && !props.draw ? 'block' : 'none',
      borderLeft: `${props.radius / 2}px solid transparent`,
      borderRight: `${props.radius / 2}px solid transparent`,
      borderBottom: `${props.radius}px solid lightblue`,
      transform: 'scale(1.5)',
    }
  })
)(
  ({ theme }) => css`
    position: absolute;
    border-color: ${theme.palette['accent-primary']};
    opacity: 0.5;
    z-index: 1;
    pointer-events: none;
    width: 0;
    height: 0;
  `
);


export {
  ShapesWrapper,
  SideShapesWrapper,
  CurrentShapeWrapper,
  PreviewRect,
  PreviewCircle,
  PreviewEllipse,
  PreviewPolygon,
}