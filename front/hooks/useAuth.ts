import { useUserState } from "../atoms/userAtom";
import { axiosApi } from "../lib/axios";

export const useAuth = () => {
  const { user, setUser } = useUserState();

  // ①
  const checkLoggedIn = async (): Promise<boolean> => {
    // ②
    if (user) {
      return true;
    }

    try {
      // ③
      const res = await axiosApi.get("/api/user");
      // ④
      if (!res.data.data) {
        return false;
      }
      // ⑤
      setUser(res.data.data);
      return true;
    } catch {
      // ⑥
      return false;
    }
  };

  return { checkLoggedIn };
};
