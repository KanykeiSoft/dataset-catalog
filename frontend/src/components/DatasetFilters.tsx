type DatasetFiltersProps = {
    domains: string[];
    domainFilter: string;
    statusFilter: string;
    onDomainChange: (value: string) => void;
    onStatusChange: (value: string) => void;
  };
  
  function DatasetFilters({
    domains,
    domainFilter,
    statusFilter,
    onDomainChange,
    onStatusChange,
  }: DatasetFiltersProps) {
    return (
      <div className="controls">
        <select
          value={domainFilter}
          onChange={(e) => onDomainChange(e.target.value)}
        >
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
  
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="NeedsReview">NeedsReview</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    );
  }
  
  export default DatasetFilters;