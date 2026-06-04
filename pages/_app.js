import "@/styles/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  // Use a layout per page if defined, otherwise use default Layout
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  
  return getLayout(<Component {...pageProps} />);
}
