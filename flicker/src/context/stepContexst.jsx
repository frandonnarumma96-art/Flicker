import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
    const navigate = useNavigate();

    const [onboardingData, setOnboardingData] = useState(() => {
        const salvati = localStorage.getItem("flicker_onboarding_data");
        return salvati ? JSON.parse(salvati) : { username: "", avatar: "", platforms: [], genres: [], favoriteMovies: [] };
    });


    useEffect(() => {
        localStorage.setItem("flicker_onboarding_data", JSON.stringify(onboardingData));
    }, [onboardingData]);


    function completeOnboarding() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUserEmail = localStorage.getItem("currentUserEmail"); 

        const updatedUsers = users.map(user => {
            if (user.email === currentUserEmail) {
                return { ...user, ...onboardingData, onboardingCompletato: true };
            }
            return user;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.removeItem("flicker_onboarding_data");
        
        navigate("/home"); 
    }

    return (
        <OnboardingContext.Provider value={{ onboardingData, setOnboardingData, completeOnboarding }}>
            {children}
        </OnboardingContext.Provider>
    );
}


export function useOnboarding() {
    return useContext(OnboardingContext);
}