import { createContext, useState, ReactElement } from "react";

import { User } from "@/types/user";
import { Project } from "@/types/project";

const UserContext = createContext({
  currentUser: {},
  userProjects: [] as Project[],
  // eslint-disable-next-line no-unused-vars
  setCurrentUser: (_user: User, _projects: Project[]) => {
    /* do nothing */
  },
  // eslint-disable-next-line no-unused-vars
  setUserProjects: (_projects: Project[]) => {
    /* do nothing */
  },
});

export const UserContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({
    email: "",
    displayName: "",
    project: [] as string[],
  });

  const setCurrentUserHandler = (user: User, projects: Project[]) => {
    setCurrentUser(user);
    setUserProjects(projects);
  };

  const setUserProjectsHandler = (projects: Project[]) => {
    setUserProjects(projects);
  };

  const value = {
    currentUser,
    userProjects,
    setCurrentUser: setCurrentUserHandler,
    setUserProjects: setUserProjectsHandler,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
