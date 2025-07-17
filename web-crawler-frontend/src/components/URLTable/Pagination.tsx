type Props = {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, goToPage }: Props) => {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2">
      <button
        name="prev-page"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
      >
        Prev
      </button>

      {(() => {
        const pageButtons = [];
        for (let i = 1; i <= totalPages; i++) {
          pageButtons.push(
            <button
              name="page-btn"
              key={i}
              onClick={() => goToPage(i)}
              className={`px-3 py-1 border rounded ${
                currentPage === i
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:bg-gray-100"
              } transition`}
            >
              {i}
            </button>
          );
        }
        return pageButtons;
      })()}

      <button
        name="next-page"
        onClick={() => goToPage(currentPage + 1)}
        disabled={!totalPages || currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
      >
        Next
      </button>
    </div>
  );
};
