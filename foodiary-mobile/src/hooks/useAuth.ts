import { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  return use(AuthContext);
}
