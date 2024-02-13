import axios from "axios";
import { useEffect, useState } from "react";
  
interface getUser {
  username: string;
  firstname: string;
  lastname: string;
  id: number;
  }

interface returnType {
  user: getUser | undefined;
  verify: boolean | undefined;
}

const useGetUser = ():returnType => {

  const [user, setUser] = useState<getUser>();
  const [verify, setVerify] = useState<undefined | boolean>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/get",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data.user);
        setVerify(true);
      } catch (error) {
        setVerify(false);
        return { user, verify };
      }
    };

    fetchData();
  }, []);

  return { user, verify };
};

export default useGetUser;
