import { createContext, ReactNode, useCallback, useState } from 'react';
import { Project } from '../model/project';

const ProjectContext = createContext<any>({
  project: undefined
});

interface Props {
  children: ReactNode;
}

export function ProjectProvider({ children }: Props) {
  const [project, setProject] = useState<Project | undefined>(undefined);

  const setProjectOrUndefined = useCallback(
    (newProject: Project | undefined) => {
      setProject(newProject);
    },
    [setProject]
  );

  return (
    <ProjectContext.Provider value={{ project, setProjectOrUndefined }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContext;
