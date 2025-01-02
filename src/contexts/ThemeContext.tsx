import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const STORAGE_KEY = 'themeContextKey';

type ThemeContextType = {
    theme: string;
    setTheme: (newTheme: string) => void;
}
export const ThemeContext = createContext<ThemeContextType | null >(null);



export const ThemeProvider = ({children}: {children: ReactNode})=>{
    const [theme, setTheme] = useState(
        localStorage.getItem(STORAGE_KEY) || 'light'
    );

    useEffect(()=> {
        /* ADICIONAR A CLASSE DO TAILWIND AO HTML MANUALMENTE */
        if(theme === 'dark'){
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark'); //light é o padrão, não precisa add
        }
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={ {theme, setTheme } } >
        {children}
        </ThemeContext.Provider>
    )
}


export const useTheme = () => useContext(ThemeContext);