import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Hero from "components/home/Hero";
import Partners from "components/home/Partners";
import WhoAreWe from "components/home/WhoAreWe";
import OurWork from "components/home/OurWork";
// import SdgCommitment from "components/our-work/SdgCommitment";
import OurInsights from "components/home/OurInsights";
import FeaturedIn from "components/home/FeaturedIn";
import OurTeam from "components/home/OurTeam";

export default function Home({
  homeData,
  projects,
  partners,
  featuredIn,
  membersCount,
  blogs,
  impact,
}) {
  return (
    <>
      <Head>
        <title>Kathmandu Living Labs</title>
        <meta
          name="description"
          content="Kathmandu Living Labs is a pioneer civic-tech enterprise providing humane data and technology solutions to improve the lives of people."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero title={homeData.heroTitle} image={homeData.heroImage} />
      <Partners partners={partners} />
      <WhoAreWe data={homeData.whoAreWe} />
      <OurWork projects={projects} data={homeData.ourWork} />
      {/* <SdgCommitment data={homeData.ourCommitment} impact={impact} /> */}
      <OurInsights blogs={blogs} />
      <FeaturedIn featuredIn={featuredIn} />
      <OurTeam membersCount={membersCount} />
    </>
  );
}

export async function getStaticProps() {
  const { API_URL } = process.env;
  const [
    projects,
    partners,
    inTheMedia,
    membersCount,
    blogs,
    homeData,
    impact,
  ] = await Promise.all([
    fetch(`${API_URL}/projects?_limit=5&_sort=displayOrder`).then((r) =>
      r.json()
    ),
    fetch(`${API_URL}/partners?_sort=displayOrder`).then((r) => r.json()),
    fetch(`${API_URL}/in-the-media`).then((r) => r.json()),
    fetch(`${API_URL}/members/count?isAlumnus=false`).then((r) => r.json()),
    fetch(`${API_URL}/blogs?_limit=3&_sort=created_at:desc`).then((r) =>
      r.json()
    ),
    fetch(`${API_URL}/home`).then((r) => r.json()),
    fetch(`${API_URL}/impact`).then((r) => r.json()),
  ]);

  return {
    props: {
      homeData,
      partners,
      projects,
      featuredIn: inTheMedia.featuredInImages,
      blogs,
      membersCount,
      impact,
    },
    revalidate: 84600,
  };
}
