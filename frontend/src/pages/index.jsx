import PageProvider from "@providers/PageProvider"

import Header from "@modules/landing/header"

export default function Home() {
  return <PageProvider title="Home">
    <Header/>
  </PageProvider>
}