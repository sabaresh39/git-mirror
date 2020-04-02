import React, { useState, useEffect } from "react";
import { UserProfile, UserDetails } from "./components";
import "./App.css";

const App = () => {
  const [userProfile, setUserProfile] = useState({});
  const [hasError, setErrors] = useState(false);
  const [isFetchingData, setFetchingData] = useState(true);
  const [counts, setCounts] = useState({});

  const setCount = () => {
    const counts = (({ public_repos, public_gists, followers, following }) => ({
      public_repos,
      public_gists,
      followers,
      following
    }))(userProfile);
    setCounts(counts);
  };

  async function fetchUserProfile() {
    try {
      const userProfile = await fetch(
        "https://api.github.com/users/supreetsingh247"
      );
      userProfile
        .json()
        .then((res) => setUserProfile(res))
        .catch((err) => setErrors(err));
      setFetchingData(false);
    } catch (err) {
      setErrors(err);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    setCount();
  }, [userProfile]);

  return (
    <React.Fragment>
      <div className='dummy-nav'></div>
      {!isFetchingData && (
        <div className='container'>
          {!hasError && (
            <>
              <UserProfile data={userProfile} />
              <UserDetails counts={counts} />
            </>
          )}
          {hasError && <div>Error</div>}
        </div>
      )}
      {isFetchingData && <div>Loading...</div>}
    </React.Fragment>
  );
};

export default App;
