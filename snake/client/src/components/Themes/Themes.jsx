import React, {useState, useEffect } from 'react';
import "../../styles/GameList.css";
import "../../styles/Themes.css";
// import themes from "../../data/themesData.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Themes({ loggedInUser }) {
    const [userTheme, setUserTheme] = useState("default");
    const [themes, setThemes] = useState([]);


    console.log("themes after setting purchase: ", themes);
    useEffect(() => {
        setThemes([]);
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
                })
            } catch (error) {
                console.log(error);
            }
        }

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
                console.log("purchased themes: ", data.themeList);
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

        fetchAllThemes();
        if (loggedInUser.name !== 'guest') {
            fetchUserPurchasedThemes();
        }

    },[]);



    const handleThemePreview = (theme) => {
        themes.forEach(t => document.body.classList.remove(t.themeName));
        document.body.classList.add(t.themeName);
    };



    useEffect(() => {

    })

    /* developer user only for moving themes from temp database to mongodb */

    // const handleLogThemes = async () => {
    //     themes.forEach(async (theme) => {
    //         console.log('logging theme:', theme.themeName);
    //         try {
    //             await fetch('http://localhost:5001/api/themes/addTheme', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     name: theme.themeName,
    //                     colors: theme.themeColors,
    //                     price: theme.price
    //                 }),
    //             });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     });
    // };


    

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
                    <div className="theme-price set-theme"><i className="bi bi-cash-coin"></i><span>Set Theme</span></div>
                ) : (
                    <>
                        <div className="theme-price"><i className="bi bi-coin"></i><span>{theme.price}</span></div>
                        <div className="theme-price purchase-button"><i className="bi bi-cash-coin"></i><span>Purchase</span></div>
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
        </div>
    );
}

export default Themes;
