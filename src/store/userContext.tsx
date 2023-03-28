// import { createContext, useState, ReactElement } from 'react';
// adding thisso i can deploy
// import { User } from '@/types/user';

// const UserContext = createContext({
//   currentUser: {
//     email: ''
//   },
//   setCurrentUser: (_user: User) => { /* do nothing */ },
// })

// export const UserContextProvider = ({ children }: {
//   children: ReactElement
// }) => {
//   const [currentUser, setCurrentUser] = useState({
//     email: ''
//   });

//   const setCurrentUserHandler = (user: User) => {
//     setCurrentUser(user);
//   }

//   const value = {
//     currentUser,
//     setCurrentUser: setCurrentUserHandler,
//   }

//   return (
//     <UserContext.Provider value={value}>
//       { children }
//     </UserContext.Provider>
//   )
// }

// export default UserContext
