import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, apiAuth } from "@/axiosConfig";

interface UserData {
  id: string;
  nome: string;
  email: string;
}

interface UserContextProps {
  userData: UserData | null;
  loading: boolean;
}

const UserContext = createContext<UserContextProps>({ userData: null, loading: true });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('user');
      if (userId) {
        await apiAuth.get(`/getUser/${userId}`).then((res) => {
          setUserData(res.data);
        }).catch((err) => {
          console.warn('Erro ao buscar dados do usuário:', err);
        })
      } else {
        console.warn('Usuário não encontrado no localStorage');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
