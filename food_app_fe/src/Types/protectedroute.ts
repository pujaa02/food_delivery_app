/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ProtectedRouteProps {
    component: React.ComponentType<any>;
  //   component: React.ReactNode;
  }
  
  export interface RoleProtectedRouteProps {
    allowedRoles: number[];
    children?: React.ReactNode; // Add this line
  }
  