import { User } from "@/lib/dtos/User";
import { useAppStore } from "@/lib/hooks";

type TableProps = {
  user1: Partial<User>;
  user2: Partial<User>;
};

type TableRowProps = {
  field: keyof User;
  user1: Partial<User>;
  user2: Partial<User>;
};

const TableRow: React.FC<TableRowProps> = ({ field, user1, user2 }) => {
  return (
    <tr key={field} className="border-b dark:border-neutral-500">
      <td className="whitespace-nowrap px-6 py-4">{field}</td>
      <td className="whitespace-nowrap px-6 py-4">{user1[field]?.toString()}</td>
      <td className="whitespace-nowrap px-6 py-4">{user2[field]?.toString()}</td>
    </tr>
  );
};

const Table: React.FC<TableProps> = ({ user1, user2 }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Controlled
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Uncontrolled
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableRow user1={user1} user2={user2} field="name" />
                <TableRow user1={user1} user2={user2} field="age" />
                <TableRow user1={user1} user2={user2} field="email" />
                <TableRow user1={user1} user2={user2} field="password" />
                <TableRow user1={user1} user2={user2} field="gender" />
                <TableRow user1={user1} user2={user2} field="acceptTOC" />
                <TableRow user1={user1} user2={user2} field="picture" />
                <TableRow user1={user1} user2={user2} field="country" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
