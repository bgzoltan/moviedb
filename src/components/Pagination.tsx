export interface IPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, setPage }: IPaginationProps) => {
  return (
    <div className="flex">
      <button
        className="paging-buttons"
        onClick={() => setPage(page - 1 > 0 ? page - 1 : page)}
      >
        Previous
      </button>
      <div className="flex flex-col justify-center items-center w-20">
        <div>Oldal:{page}</div>
      </div>
      <button
        className="paging-buttons"
        onClick={() => setPage(page + 1 < 1000 ? page + 1 : page)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
