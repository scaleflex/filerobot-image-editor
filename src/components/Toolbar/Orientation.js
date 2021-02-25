import { Component } from 'react';
import { DarkBtn, OrientationWrapper, RotateButton, RotateIcon, RotateWrapper, ButtonGroup } from '../../styledComponents';
import Range from '../Range'


export default class extends Component {
  leftRotate = () => {
    const { onRotate, correctionDegree, flipX, flipY } = this.props;

    onRotate(-90, parseInt(correctionDegree), flipX, flipY);
  }

  rightRotate = () => {
    const { onRotate, correctionDegree, flipX, flipY } = this.props;

    onRotate(90, parseInt(correctionDegree), flipX, flipY);
  }

  updateCorrectionDegree = (value) => {
    const { flipX, flipY } = this.props;
    this.setState({ correctionDegree: value });

    this.props.onRotate(0, parseFloat(value), flipX, flipY);

  }

  onFlip = (val) => {
    const { flipX, flipY, correctionDegree } = this.props;
    const nextFlipXValue = val === 'x' ? !flipX : flipX;
    const nextFlipYValue = val === 'y' ? !flipY : flipY;

    this.props.onRotate(0, correctionDegree, nextFlipXValue, nextFlipYValue);
  }

  render() {
    const { correctionDegree, t, config = {} } = this.props;
    const { processWithCloudService } = config;

    return (
      <OrientationWrapper>
        <RotateWrapper>
          <RotateButton>
            <ButtonGroup>
              <DarkBtn onClick={this.leftRotate}><RotateIcon name="left-rotate"/> <span>{t['orientation.rotate_l']}</span></DarkBtn>
              <DarkBtn onClick={this.rightRotate}><RotateIcon name="right-rotate"/>
                <span>{t['orientation.rotate_r']}</span></DarkBtn>

              {!processWithCloudService && (
                <>
                  <DarkBtn onClick={() => { this.onFlip('x'); }}><RotateIcon name="flip-h"/>
                    <span>{t['orientation.flip_h']}</span></DarkBtn>
                  <DarkBtn onClick={() => { this.onFlip('y'); }}><RotateIcon name="flip-v"/>
                    <span>{t['orientation.flip_v']}</span></DarkBtn>
                </>
              )}
            </ButtonGroup>

            {!processWithCloudService && (
            <div>
              <Range min={-30} max={30} step={0.5} range={correctionDegree} updateRange={this.updateCorrectionDegree}/>
              <svg viewBox="-90 -5 180 10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">

                <circle fill="currentColor" cx="-37.15555555555556" cy="0" r="0.2" opacity="0.8"></circle>
                <circle fill="currentColor" cx="-35.2" cy="0" r="0.2" opacity="0.6"></circle>
                <circle fill="currentColor" cx="-33.24444444444445" cy="0" r="0.2" opacity="0.4"></circle>
                <circle fill="currentColor" cx="-31.28888888888889" cy="0" r="0.2" opacity="0.2"></circle>
                <circle fill="currentColor" cx="-29.333333333333336" cy="0" r="0.5"></circle>
                <text fill="currentColor" x="-31.583333333333336" y="3.5">-30&#176;</text>
                <circle fill="currentColor" cx="-27.37777777777778" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-25.422222222222224" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-23.46666666666667" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-21.51111111111112" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-19.555555555555557" cy="0" r="0.5"></circle>
                <text fill="currentColor" x="-21.805555555555557" y="3.5">-20&#176;</text>
                <circle fill="currentColor" cx="-17.60000000000001" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-15.644444444444446" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-13.688888888888897" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-11.733333333333334" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-9.777777777777786" cy="0" r="0.5"></circle>
                <text fill="currentColor" x="-12.027777777777786" y="3.5">-10&#176;</text>
                <circle fill="currentColor" cx="-7.822222222222223" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-5.866666666666674" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-3.9111111111111114" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="-1.9555555555555628" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="0" cy="0" r="0.5"></circle>
                <text fill="currentColor" x="-0.75" y="3.5">0&#176;</text>
                <circle fill="currentColor" cx="1.9555555555555486" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="3.9111111111111114" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="5.86666666666666" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="7.822222222222223" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="9.777777777777771" cy="0" r="0.5"></circle>
                <text fill="currentColor" x="8.277777777777771" y="3.5">10&#176;</text>
                <circle fill="currentColor" cx="11.733333333333334" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="13.688888888888883" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="15.644444444444446" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="17.599999999999994" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="19.555555555555557" cy="0" r="0.5"></circle>
                <text fill="currentColor" x="18.055555555555557" y="3.5">20&#176;</text>
                <circle fill="currentColor" cx="21.511111111111106" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="23.46666666666667" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="25.422222222222217" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="27.37777777777778" cy="0" r="0.2"></circle>
                <circle fill="currentColor" cx="29.33333333333333" cy="0" r="0.5"></circle>
                <text fill="currentColor" x="27.83333333333333" y="3.5">30&#176;</text>
                <circle fill="currentColor" cx="31.28888888888889" cy="0" r="0.2" opacity="0.8"></circle>
                <circle fill="currentColor" cx="33.24444444444444" cy="0" r="0.2" opacity="0.6"></circle>
                <circle fill="currentColor" cx="35.2" cy="0" r="0.2" opacity="0.4"></circle>
                <circle fill="currentColor" cx="37.15555555555555" cy="0" r="0.2" opacity="0.2"></circle>
              </svg>
            </div>
            )}
          </RotateButton>
        </RotateWrapper>
      </OrientationWrapper>
    )
  }
}