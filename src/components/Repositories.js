import React from "react";
import Icon from "./Icons";

const Repositories = ({ repoData, filter }) => {
  return (
    <>
      {(filter.searchTerm || filter.language) && (
        <div className='filter-summary'>
          <div className='summary'>
            <span>{repoData.length}</span> results for repositories{" "}
            {filter.searchTerm && "matching " + filter.searchTerm}{" "}
            {filter.language && "written in " + filter.language}
          </div>
          <a className='clear' href='/'>
            Clear filter
          </a>
        </div>
      )}
      <div className='repo-container'>
        {repoData.length != 0 &&
          repoData.map((repo, index) => (
            <div className='repo' key={index}>
              <a className='repo-name' href={repo.html_url} target='_blank'>
                {repo.name}
              </a>
              {repo.fork && (
                <div className='repo-fork'>
                  Forked from <span>{repo.full_name}</span>
                </div>
              )}
              {repo.description && (
                <div className='repo-desc'>{repo.description}</div>
              )}
              {repo.language && (
                <div className='repo-language repo-bottom-tags'>
                  <span className={repo.language.toLowerCase()}></span>
                  {repo.language}
                </div>
              )}
              {repo.watchers !== 0 && (
                <div className='repo-watchers repo-bottom-tags'>
                  <Icon name='star' width='14' viewBox='0 0 14 15' />
                  {repo.watchers}
                </div>
              )}
              {repo.forks_count !== 0 && (
                <div className='repo-forks repo-bottom-tags'>
                  <Icon name='fork' width='10' viewBox='0 0 10 15' />
                  {repo.forks_count}
                </div>
              )}
              {repo.license && repo.license.name && (
                <div className='repo-license repo-bottom-tags'>
                  <Icon name='license' width='14' viewBox='0 0 14 15' />
                  {repo.license.name}
                </div>
              )}
              <div className='repo-last-updated repo-bottom-tags'>
                Updated on {new Date(repo.updated_at).toDateString()}
              </div>
            </div>
          ))}
        {repoData.length == 0 && (
          <div className='repo-empty'>There is no repositories to show.</div>
        )}
      </div>
    </>
  );
};

export default Repositories;
