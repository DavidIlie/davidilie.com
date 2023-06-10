import { api } from "~/trpc/server";

import Footer from "./Footer";

const FooterParallelLayout = async () => {
   const data = await api.spotify.getFooterData.query();
   return <Footer data={data} />;
};

export default FooterParallelLayout;
