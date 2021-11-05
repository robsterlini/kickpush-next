import clsx from "clsx";
import { fetchContact, fetchCustomPage } from "utils/contentful";
import { CONTACT_EMAIL } from "utils/constants";

import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";
import Hero, { HeroCopy } from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import Manifesto from "components/Manifesto/Manifesto";
import ContentfulProjectCard from "components/ProjectCard/ContentfulProjectCard";
import Title from "components/Meta/Title";
import Description from "components/Meta/Description";
import LabelData from "components/Meta/LabelData";
import AllProjectsCard from "components/Card/AllProjectsCard";

import styles from "../sass/pages/index.module.scss";

export default function Home({ page, contact }) {
  const {
    shortName,
    metaDescription,
    heroTitle,
    projectsTitle,
    manifestoItems,
    heroCopy,
    projectsList,
  } = page.fields;

  return (
    <>
      <Title shortTitle={shortName} longTitle={heroTitle} />
      <Description description={metaDescription} />
      <LabelData number="1" label="Email" data={CONTACT_EMAIL} />

      <Nav />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {heroCopy && <HeroCopy>{heroCopy}</HeroCopy>}
        </Hero>

        <section className={clsx("container", styles.Projects)}>
          {projectsTitle && (
            <Heading level="h0" tag="h2">
              {projectsTitle}
            </Heading>
          )}

          <div className={styles.ProjectsList}>
            {projectsList.fields.projects.map((project) => (
              <ContentfulProjectCard key={project.sys.id} project={project} />
            ))}
            <AllProjectsCard className={styles.AllProjects} />
          </div>
        </section>

        {!!manifestoItems.length && (
          <section className={clsx("container", styles.Manifesto)}>
            {manifestoItems.map((item) => (
              <Manifesto
                className={styles.ManifestoItem}
                key={item.sys.id}
                short={item.fields.shortText}
                long={item.fields.longText}
              />
            ))}
          </section>
        )}
      </main>

      <Footer contact={contact} />
    </>
  );
}

export async function getStaticProps() {
  const page = await fetchCustomPage("customPageHome", { include: 2 });
  const contact = await fetchContact();

  return {
    props: {
      page,
      contact,
    },
  };
}
