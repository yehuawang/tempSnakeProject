import React, { useState, useEffect } from 'react';
import "../../styles/GameList.css";
import "../../styles/Themes.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Themes({ loggedInUser }) {
    const [userTheme, setUserTheme] = useState();
    const [themes, setThemes] = useState([]);
    const [themesFetched, setThemesFetched] = useState(false); 
    const [userCoinCount, setUserCoinCount] = useState(0);


    const fetchUserCoinCount = async () => {
        if (loggedInUser.name !== 'guest') {
            try {
                const response = await fetch('http://localhost:5001/api/users/getCoinCount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userEmail: loggedInUser.email }),
                });
                const data = await response.json();
                console.log(data);
                setUserCoinCount(data.coinCount);
            } catch (error) {
                console.log(error);
            }
        }
    };



    const fetchAllThemes = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/themes/getAllThemes');
            const data = await response.json();
            console.log(data);
            data.forEach(theme => {
                console.log(theme);
                setThemes(prevThemes => [...prevThemes, {
                    themeName: theme.name,
                    themeColors: theme.colors,
                    price: theme.price,
                    purchased: false,
                }]);
            });
            setThemesFetched(true); 
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUserSelectedTheme = async () => {
        try {
            const res = await fetch('http://localhost:5001/api/users/getUserSelectedTheme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: loggedInUser.email }),
            });

            const data = await res.json();
            console.log("selected theme: ", data.selectedTheme);
            setUserTheme(data.selectedTheme);
            themes.forEach(t => document.body.classList.remove(t.themeName));
            document.body.classList.add(data.selectedTheme); // Apply the theme directly from the fetched data
        } catch (error) {
            console.log(error);
        }

    };

    const fetchUserPurchasedThemes = async () => {
        try {
            const res = await fetch('http://localhost:5001/api/users/getUserPurchasedThemesList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: loggedInUser.email }),
            });

            const data = await res.json();
            data.themeList.forEach(theme => {
                if (themes.some(t => t.themeName === theme)) {
                    setThemes(prevThemes => prevThemes.map(t => {
                        if (t.themeName === theme) {
                            return {...t, purchased: true};
                        }
                        return t;
                    }));
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setThemes([]);
        fetchAllThemes();
        fetchUserCoinCount();
    }, []);

    useEffect(() => {
        if (loggedInUser.name !== 'guest' && themesFetched) {
            fetchUserPurchasedThemes();
            fetchUserSelectedTheme();
            fetchUserCoinCount();
        }
    }, [themesFetched]);

    const handleThemePreview = (themeName) => {
        themes.forEach(t => document.body.classList.remove(t.themeName));
        document.body.classList.add(themeName);

        if (themeName !== "default") {
            setTimeout(() => {
                document.body.classList.remove(themeName);
                document.body.classList.add(userTheme);
            }, 5000);
        }
    };

    const handleSetTheme = async (themeName) => {
        themes.forEach(t => document.body.classList.remove(t.themeName));
        document.body.classList.add(themeName);

        const response = await fetch('http://localhost:5001/api/users/setUserTheme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: loggedInUser.email,
                theme: themeName,
            }),
        });
        const data = await response.json();
        const message = data.message;
        if (response.ok) {
            console.log("set theme response:", message);
            setUserTheme(themeName);
        } else {
            console.log(message);
        }

    }

    const handleThemePurchase = async (themeName) => {
        console.log('purchasing theme:', themeName);
        const response = await fetch('http://localhost:5001/api/users/purchaseTheme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: loggedInUser.email,
                theme: themeName,
                themePrice: themes.find(t => t.themeName === themeName).price,
            }),
        });
        const data = await response.json();
        const message = data.message;
        if (response.ok) {
            console.log("purchase theme response:", message);
            fetchUserCoinCount();
            fetchUserPurchasedThemes();
            fetchUserSelectedTheme();
            alert("purchase success on theme " + themeName);
        } else if (response.status === 400) {
            console.log("purchase theme response:", message);
            alert("purchase failed on theme " + themeName + " because " + message);
        } else {
            console.log(message);
        }
    }

    const list = themes.map(theme => 
        <li className="game-list-item theme-list-item" key={theme.themeName}>
            <div 
                className="game-list-selection-item theme-list-selection-item"
                onClick={() => handleThemePreview(theme.themeName)}
            >
                {theme.themeName}
            </div>
            <div className="theme-color-pallet">
                <div className="theme-color-circle" style={{backgroundColor: theme.themeColors.primary}}></div>
                <div className="theme-color-circle" style={{backgroundColor: theme.themeColors.secondary}}></div>
                <div className="theme-color-circle" style={{backgroundColor: theme.themeColors.accent}}></div>
            </div>
            {
                theme.purchased ? (
                    <div className="theme-price set-theme" onClick={() => handleSetTheme(theme.themeName)}><span>Set</span></div>
                ) : (
                    <>
                        <div className="theme-price" onClick={() => handleThemePurchase(theme.themeName)}><i className="bi bi-coin"></i><span>{theme.price}</span></div>
                    </>
                )
            }
        </li>
    );

    return (
        <div className="page-element-div game-list-container">
            <h1 className="game-list-title">Themes</h1>
            <ul className="game-list-ul">
                {list}
            </ul>
            {/* developer use only button for temporary migrate of themes into mongodb */}
            {/* <button onClick={handleLogThemes}>Log All Themes</button> */}
            {
                loggedInUser.name !== 'guest' && <div className="show-user-coin-balance"><i className="bi bi-coin"></i><span>{userCoinCount}</span></div>
            }
        </div>
    );
}

export default Themes;
