import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useApp from "../../hooks/useApp";
import { AboutMe } from "../../model/aboutme";
import { Project } from "../../model/project";
import AboutMeCard from "../cards/AboutMeCard";
import ProjectCard from "../cards/ProjectCard";
import { themes } from "../../styles/ColorStyles";
import { MediumText } from "../../styles/TextStyles";
import createApiClient from "../../api/api-client-factory";


interface Response {
  aboutme?: AboutMe;
  projects?: Project[];
}

const Dashboard = () => {
  const { t } = useTranslation();
  const [response, setResponse] = useState<Response | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  
  const { addNotification, removeLastNotification } = useApp();
  // TODO: 3) Import the hook useProject 

  useEffect(() => {
    async function retrieveInfo() {
      const api = createApiClient();
      try {
        startSearch(t("loader.text"));
        const projects: Project[] = await api.getProjects();
        const aboutme: AboutMe = await api.getAboutMe();
        setResponse({ aboutme, projects });
      } catch(Error) {
        setError("Info not found");
      } finally {
        stopSearch();
      }
    }

    function startSearch(msg: string) {
      setResponse(undefined);
      setError(undefined);
      addNotification(msg);
    }
  
    function stopSearch() {
      removeLastNotification();
    }

    

    retrieveInfo();
  }, [setResponse, t, addNotification, removeLastNotification]);

  // TODO: 3) Create the function deleteProject
  // HINT: first argument should be: React.MouseEvent<HTMLElement> to call element.preventDefault() and element.stopPropagation()
  // HINT: On top of deleting the document, we need to refresh the interface

  // TODO: 3) Create the function deleteProject
  // HINT: first argument should be: React.MouseEvent<HTMLElement> to call element.preventDefault() and element.stopPropagation()
  // HINT: On top of adding the document, we need to navigate to /admin
 

  return (
    <Wrapper>
      <ContentWrapper>
        {response && (
          <ResponseWrapper>
            <AboutMeWrapper>
              {response?.aboutme && <AboutMeCard aboutMe={response?.aboutme} />}
            </AboutMeWrapper>
            <ProjectWrapper>
              {response?.projects?.map((project, index) => (
                // TODO: 3, Update project card with props
                <ProjectCard project={project} key={index} />
              ))}
            </ProjectWrapper>
          </ResponseWrapper>
        )}

        {error && <ErrorMsg>{t("dashboard.error")}</ErrorMsg>}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;

  @media (min-width: 700px) {
    padding-bottom: 200px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  padding: 30px 30px 60px 30px;
  display: grid;

  @media (max-width: 450px) {
    padding: 30px 4px 60px 4px;
  }
`;

const ResponseWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;

  @media (max-width: 1080px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    justify-content: center;
  }
`;

const AboutMeWrapper = styled.div`
  display: grid;
  align-items: flex-start;

  @media (max-width: 810px) {
    align-items: stretch;
    justify-content: stretch;
  }
`;

const ProjectWrapper = styled.div`
  max-width: 2400px;
  margin: 0 auto;
  padding: 20px 30px 120px 30px;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 40px;

  @media (max-width: 1440px) {
    justify-items: center;
    grid-template-columns: auto auto;
  }

  @media (max-width: 1080px) {  
    grid-template-columns: auto auto auto;
    gap: 20px;
  }

  @media (max-width: 940px) {
    grid-template-columns: auto auto;
  }

  @media (max-width: 700px) {
    grid-template-columns: auto;
    gap: 0px;
  }
`;

const ErrorMsg = styled(MediumText)`
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

export default Dashboard;
