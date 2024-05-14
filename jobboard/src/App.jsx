import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import JoblistItem from "./components/JoblistItem";

const JOB_PER_PAGE = 6;
const API_URL = "https://hacker-news.firebaseio.com/v0";

function App() {
  const [jobsListId, setJobsListId] = useState(null);
  const [currPage, setCurrPage] = useState();
  const [jobsListData, setJobsListData] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);

  function myDebounce(fn, delay = 500) {
    let timeout;
    return function (...args) {
      const ref = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.call(ref, args);
      }, delay);
    };
  }

  const fetchJobs = async (currPage) => {
    // setFetchingData(true);
    setCurrPage(currPage);
    let itemList = jobsListId;
    if (itemList === null) {
      const URL = `${API_URL}/jobstories.json`;
      const response = await fetch(URL);
      itemList = await response.json();
      setJobsListId(itemList);
    }

    const requiredJobIds = itemList.slice(
      currPage * JOB_PER_PAGE,
      currPage * JOB_PER_PAGE + JOB_PER_PAGE
    );
    const newJobsList = await Promise.all(
      requiredJobIds?.map((jobId) =>
        fetch(`${API_URL}/item/${jobId}.json`).then((response) =>
          response.json()
        )
      )
    );

    const jobListDataCopy = [...jobsListData, ...newJobsList];

    setJobsListData(jobListDataCopy);
    setFetchingData(false);
  };

  useEffect(() => {
    if (!currPage) fetchJobs(0);
  }, []);

  const debouncedFetchJobs = myDebounce(() => fetchJobs(currPage + 1), 1000);

  return (
    <div className="app-container">
      <h1>Jobs Postings</h1>

      <div className="jobs-container">
        {jobsListData.length > 0 ? (
          jobsListData.map((job) => <JoblistItem key={job} jobData={job} />)
        ) : (
          <div>NO Jobs</div>
        )}
      </div>

      <button
        onClick={() => {
          debouncedFetchJobs();
        }}
        disabled={fetchingData}
      >
        {fetchingData ? "Loading" : "Load More"}
      </button>
    </div>
  );
}

export default App;
