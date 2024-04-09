import { Link } from 'react-router-dom';
import './Intro.css';

export const Intro = () => {
  return (
    <div className="intro">
      <div className="text-container">
        {/* <img
          src="profile-pic.png"
          alt="san-roque-logo"
          width={'100px'}
          style={{ marginBottom: '10px' }}
        /> */}
        <p className="sd-main-title">Sias Connect</p>
        <p>Manage your files with ease.</p>
        <Link className="intro-button" to="/login">
          Get Started
        </Link>
      </div>
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div>
      </div>
    </div>
  );
};
