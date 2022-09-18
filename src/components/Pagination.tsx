type PaginationProps= {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, setPage }: PaginationProps) => {
  return (
    <div className="flex">
      <button
        className="paging-buttons transition-all duration-700 "
        onClick={() => {
          setPage(() => page - 1);
        }}
      >
        Previous
      </button>
      <div className="flex flex-col justify-center items-center w-20">
        <div>Page - {page}</div>
      </div>
      <button
        className="paging-buttons"
        onClick={() => {
          setPage(() => page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
