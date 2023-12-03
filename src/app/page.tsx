"use client";
import { Table } from "@/components/Table";
import { useAppSelector } from "@/lib/hooks";

const MainPage: React.FC = () => {
  const user1 = useAppSelector((state) => state.user.controlled);
  const user2 = useAppSelector((state) => state.user.uncontrolled);

  return (
    <div className="container mx-auto px-4">
      <Table user1={user1} user2={user2} />
    </div>
  );
};

export default MainPage;
