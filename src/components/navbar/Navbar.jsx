import './Navbar.css';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const id =
    currentUser.user._id.slice(0, 5) +
    '************' +
    currentUser.user._id.slice(
      20,
      currentUser.user._id.split('').length - 1
    );

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };
  return (
    <nav>
      <div className="sd">
        <img
          src="temp-icon.png"
          alt="swift-docs-icon"
          width={'30px'}
        />
        <h1 className="app-name">
          Swift Docs <span>v.01</span>
        </h1>
      </div>

      <div className="dash-tab">
        <div className="tab">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/parakeet-line/48/ffffff/name.png"
            alt="name"
          />
          <div>
            <p>Dashboard</p>
            <img
              width="12"
              height="12"
              src="https://img.icons8.com/metro/26/ffffff/forward.png"
              alt="forward"
            />
          </div>
        </div>
        <div className="profile-tab">
          <img
            src="profile-pic.jpg"
            alt="profile-pic"
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              width: '40px',
              height: '40px',
            }}
          />
          <div className="profile-right">
            <div className="profile-info">
              <p className="role">Admin</p>
              <p className="sub-role">{id}</p>
            </div>
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/fluency-systems-filled/48/exit.png"
              alt="exit"
              onClick={handleLogout}
              className="logout"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
