import { createContext, useState, useContext } from 'react';
import { UserType } from '../types/types';

// Define the shape of our context state.
export type AuthContextType = {
    user: UserType | any | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    signUp: (email: string, password: string) => Promise<void>;
    updateProfile: (user: UserType) => Promise<void>;
};


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
     const [user, setUser] = useState<UserType | null>(null);
    //  const url = 'http://localhost:3010';
     const url = "http://10.27.102.85:3010";

     console.log('URL: ', url);

     const signIn = async (email: string, password: string) => {
        console.log("Email: ", email);
        console.log("Password: ", password);
        try {
          console.log("URL: ", url);
          let response = await fetch(url + "/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: 'heelloo@example.com',
              password: 'securepassword123'
            }),
          });
    
          if (!response.ok) {
            console.error("HTTP Error:", response.status, response);
            throw new Error("Failed to fetch login details");
          }
    
          let json = await response.json();
          if (response.ok) {
            console.log("Success:", json);
    
            // Directly use the received token and userId
            const mappedUser: UserType = {
              id: json.userId,           // Use userId from the response
              email: email,              // Assuming you want to store the email used for login
              accessToken: json.token,   // Store the received token
            };
            setUser(mappedUser);
          } else {
            console.error("Response:", json);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      

    const signOut = () => {
        setUser(null);
    };

    const signUp = async (email: string, password: string) => {
        console.log("Emall: ", email);
        console.log("Password: ", password);
        try {
            const response = await fetch(url + "/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    roles: ["customer"],
                    password: password
                }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error("HTTP Error:", response.status, errorText);
                throw new Error(errorText || "Failed to sign up");
            }
            if (response.status === 460) {
                const errorText = await response.text();
                console.error("Error:", errorText);
                throw new Error(errorText || "Failed to sign up");
            }
    
            console.log("Sign up successful");
        } catch (error) {
            console.error("Error during sign up:", error);
        }
    };
    
    const updateProfile = async (user: UserType) => {
        try {
            const response = await fetch(`${url}/api/auth/profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-access-token": user.accessToken,
                }
            });
            if (!response.ok) {
                console.error("HTTP Error:", response.status, response.statusText);
                throw new Error("Failed to fetch job details");
            }

            const json = await response.json();
            if (response.ok) {
                console.log("Success:", json);
                if (json.roles && json.roles.includes("ROLE_USER")) {
                    setUser(json);
                } else {
                    console.error("User is not a customer.");
                }
               } else {
                  console.error("Response:", json);
               }
            } catch (error) {
               console.error("Error:", error);
            }
       };
       
    return (
        <AuthContext.Provider value={{ user, signIn, signOut, signUp, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
