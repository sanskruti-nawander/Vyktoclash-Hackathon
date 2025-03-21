import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Import an icon for the toggle button
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to get current user
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore to get user data

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  // Fetch the currently logged-in user's name and role from Firebase Authentication and Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        setUserName(user.displayName || user.email); // If the user has a display name, use it, otherwise use their email

        const db = getFirestore();
        const userDoc = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
          setUserRole(userSnap.data().role);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);

    // Adjust the body margin dynamically when the sidebar is toggled
    document.body.style.marginLeft = collapsed ? '250px' : '80px';
  };

  return (
    <>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <FaBars className="toggle-button" onClick={toggleSidebar} />
        <div className="sidebar-content">
          {!collapsed && (
            <>
              <div className="welcome">
                Welcome, {userName ? userName.substring(0, 6) : 'Guest'}!
              </div>
              {/* Navigation Links */}
              {userRole === 'professional' ? (
                <>
                  <div
                    className="link"
                    onClick={() => handleNavigation('/professional-form')}
                  >
                    <span className="link-text">Skill Gap</span>
                  </div>
                  
                  <div
                    className="link"
                    onClick={() => handleNavigation('/dashboard')}
                  >
                    <span className="link-text">Premium Features</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="link"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <span className="link-text">View Profile</span>
                  </div>
                  <div
                    className="link"
                    onClick={() => handleNavigation('/report')}
                  >
                    <span className="link-text">Career Counselling</span>
                  </div>
                  <div
                    className="link"
                    onClick={() => handleNavigation('/results')}
                  >
                    <span className="link-text">Results</span>
                  </div>
                  <div
                    className="link"
                    onClick={() => handleNavigation('/dashboard')}
                  >
                    <span className="link-text">Premium Features</span>
                  </div>
                  <div
                    className="link"
                    onClick={() => handleNavigation('/ExploreCareerOptions')}
                  >
                    <span className="link-text">Explore</span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 250px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Gradient background */
          backdrop-filter: blur(10px);
          color: #ffffff;
          padding: 1rem;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          transition: width 0.3s ease, background-color 0.3s ease;
          z-index: 1000; /* Ensure sidebar is above the content */
        }

        .sidebar.collapsed {
          width: 80px;
        }

        .toggle-button {
          align-self: flex-end;
          margin-bottom: 1rem;
          cursor: pointer;
          color: #ffffff;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-bottom: 1rem;
          transition: opacity 0.3s ease;
        }

        .sidebar.collapsed .avatar {
          opacity: 0;
        }

        .welcome {
          margin-bottom: 2rem;
          font-size: 1.25rem;
          font-weight: bold;
          text-align: center;
          transition: opacity 0.3s ease;
        }

        .sidebar.collapsed .welcome {
          opacity: 0;
        }

        .link {
          color: #ffffff;
          text-decoration: none;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
          transition: background-color 0.3s ease;
          cursor: pointer;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .link:hover {
          background-color: rgba(255, 127, 127, 0.5); /* Semi-transparent hover effect */
        }

        .link-text {
          margin-left: 10px;
          transition: opacity 0.3s ease;
        }

        .sidebar.collapsed .link-text {
          opacity: 0;
        }

        .link.locked {
          background-color: rgba(255, 255, 255, 0.1);
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 80px;
          }

          .sidebar.collapsed {
            width: 250px;
          }

          .toggle-button {
            align-self: center;
          }

          .sidebar-content {
            display: none;
          }

          .sidebar.collapsed .sidebar-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 60px;
          }

          .sidebar.collapsed {
            width: 200px;
          }

          .toggle-button {
            align-self: center;
          }

          .sidebar-content {
            display: none;
          }

          .sidebar.collapsed .sidebar-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;