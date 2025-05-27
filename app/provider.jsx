"use client";
import { UserContext } from '@/context/UserContext';
import { supabase } from '@/services/superbaseClient';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';


const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const CreateNewUser = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }

    if (user) {
      const { data: Users, error: fetchError } = await supabase
        .from('Users')
        .select("*")
        .eq('email', user.email);

      if (fetchError) {
        console.error("Error checking user:", fetchError.message);
        return;
      }

      if (Users?.length === 0) {
        const { data: insertData, error: insertError } = await supabase
          .from("Users")
          .insert({
            name: user?.user_metadata?.name || "",
            email: user?.email,
            profilepic: user?.user_metadata?.picture || ""
          })
          .select();

        if (insertError) {
          console.error("Error inserting user:", insertError.message);
        } else {
          setCurrentUser(insertData?.[0]);
        }
      } else {
        setCurrentUser(Users[0]);
      }
    }
  };

  useEffect(() => {
    CreateNewUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default Provider;

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside Provider");
  }
  return context;
};
