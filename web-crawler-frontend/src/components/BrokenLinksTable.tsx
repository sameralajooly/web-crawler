type BrokenLink = {
  link: string;
  statusCode: number;
};

type Props = {
  links: BrokenLink[];
};

const BrokenLinksTable = ({ links }: Props) => {
  if (links.length === 0) {
    return <p className="mt-6 text-green-600">No broken links found</p>;
  }

  return (
    <div className="mt-6 border rounded p-4 shadow">
      <h3 className="text-lg font-semibold mb-2 text-red-600">
        Broken Links ({links.length})
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">Link</th>
              <th className="text-left px-4 py-2">Status Code</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 text-blue-600 break-all">
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.link}
                  </a>
                </td>
                <td className={`px-4 py-2 text-red-600`}>{link.statusCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrokenLinksTable;
