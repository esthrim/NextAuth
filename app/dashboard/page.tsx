import { getServerSession } from "next-auth";

import { options } from "@/utils/nextauth/option";
import { NavBar } from "@/components/Dashboard/NavBar";

export default async function page() {
  const session = await getServerSession(options);


  return (
    <div>
      <NavBar />
    </div>
  );
}
