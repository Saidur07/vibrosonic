import Drag from "@/components/Drag";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";

export default function Home() {
  return (
    <main className="mx-4 lg:mx-0">
      <Navbar></Navbar>
      <Drag></Drag>
      <hr className="my-12" />
      <Table></Table>
      <hr className="mt-12" />
      <p className="text-gray-300 text-center text-lg my-6">
        © 2023 VibroSonic™. All Rights Reserved.
      </p>
    </main>
  );
}
