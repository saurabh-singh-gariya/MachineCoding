/* eslint-disable react/prop-types */
const JoblistItem = ({ jobData }) => {
  const getTime = (time) => new Date(time * 1000).toLocaleString();
  return (
    <div className="job-item-container">
      {jobData && (
        <>
          <div className="job-title">
            <a
              className={jobData?.url ? "" : "inactiveLink"}
              href={jobData?.url}
              target="_blank"
            >
              {jobData?.title}
            </a>
          </div>
          <div className="job-info">
            <span>By. {jobData?.by}</span>{" "}
            <span>{getTime(jobData?.time) ?? "time"}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default JoblistItem;
