import React from "react";
import { Transfers, columns } from "./columns";
import { DataTable } from "@/components/post/data-table";
import Header from "@/components/home/Header";

import axios from "axios";

type Props = {};

export default async function Transfers() {
  const data = await getTransfers();
  return (
    <div className="px-10">
      <Header />
      <section>
        <div className="px-10 py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </section>
    </div>
  );
}

async function getTransfers(): Promise<Transfers[]> {
  const response = await axios.get("http://localhost:8001/api/posts/");
  return response.data;
}
