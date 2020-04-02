import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { tabReqs } from "./config";
import FilterBar from "./FilterBar";
import Repositories from "./Repositories";

const UserDetails = ({ counts }) => {
  const [activeTab, setActiveTab] = useState("Repositories");
  const [userDetails, setUserDetails] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [isFetchingData, setFetchingData] = useState(true);
  const [filter, setFilters] = useState({ searchTerm: null, language: null });

  const changeTab = (tabName) => {
    setActiveTab(tabName);
  };

  const searchRepo = ({ searchTerm = null, language = null }) => {
    setFilters({ searchTerm: searchTerm, language: language });
    if (!searchTerm && !language) setSearchResult([]);
    let result = userDetails.filter((repo) => {
      let filtered = true;
      if (
        searchTerm &&
        searchTerm != repo.name.substring(0, searchTerm.length).toLowerCase()
      )
        filtered = false;
      if (language && language != repo.language.toLowerCase()) filtered = false;
      return filtered;
    });
    setSearchResult(result);
    console.log(searchTerm, language);
  };

  async function fetchData() {
    try {
      const userRepos = await fetch(tabReqs[activeTab]);
      userRepos
        .json()
        .then((res) => setUserDetails(res))
        .catch((err) => setErrors(err));
      setFetchingData(false);
    } catch (err) {
      setErrors(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <div className='user-details'>
      <Nav counts={counts} activeTab={activeTab} changeTab={changeTab} />
      {!isFetchingData && (
        <>
          {!hasError && activeTab == "Repositories" && (
            <>
              <FilterBar searchRepo={searchRepo} />
              <Repositories
                repoData={
                  filter.searchTerm || filter.type ? searchResult : userDetails
                }
                filter={filter}
              />
            </>
          )}
          {hasError && <div>Error</div>}
        </>
      )}
      {isFetchingData && <div>Loading...</div>}
    </div>
  );
};

export default UserDetails;
