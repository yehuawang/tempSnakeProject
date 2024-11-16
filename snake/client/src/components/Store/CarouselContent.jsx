import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../../styles/CarouselContent.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CarouselContent({ userEmail, userTheme, setUserTheme }) {
    const [carouselList, setCarouselList] = useState([]);

    useEffect(() => {
        const getUserThemeList = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users/getUserThemeList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userEmail: userEmail })
                });

                const data = await response.json();
                const theme_list = data.theme_list;
                console.log(theme_list);
                const newCarouselList = theme_list.map((th) => ({
                    theme_name: th.theme_name,
                    img: `/StoreCarouselAds/${th.theme_name}.jpg`,
                    alt: `${th.theme_name}-theme`,
                    price: th.price,
                    purchased: th.purchased,
                    caption: {
                        title: th.theme_name,
                        text: th.text
                    }
                }));
                setCarouselList(newCarouselList);
                console.log(newCarouselList);
            } catch (error) {
                console.log(error);
            }
        };

        const getUserTheme = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users/getUserBackgroundTheme', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userEmail: userEmail })
                });
                const data = await response.json();
                const theme = data.theme;
                console.log(`current user set theme is: ${theme}`);
                return theme;
            } catch (error) {
                console.log(error);
            }
        };

        const init = async () => {
            await getUserThemeList();
            const theme = await getUserTheme();
            if (theme && theme !== userTheme) {
                console.log(`setting user theme to ${theme}`);
                setUserTheme(theme);
            }
        };

        init();
    }, [userEmail, userTheme, setUserTheme]);

    const handlePurchase = async (themeName) => {
        console.log(`purchasing ${themeName} theme...`);
        try {
            const response = await fetch('http://localhost:5001/api/users/purchaseTheme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail: userEmail, theme: themeName })
            });
            console.log(response);
            if (response.ok) {
                setCarouselList(carouselList.map((item) => {
                    if (item.theme_name === themeName) {
                        item.purchased = true;
                    }
                    return item;
                }));
                setUserTheme(themeName);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSetTheme = async (themeName) => {
        setUserTheme(themeName);
    };

    return (
        <>
            <Carousel>
                {
                    carouselList.map((item) => {
                        return (
                            <Carousel.Item key={item.theme_name}>
                                <div className="carousel-image-card">
                                    <div className="price-purchase-div">
                                        <div className="price-tag">
                                            <i className="bi bi-coin">{item.price}</i>
                                        </div>
                                        <div>
                                            {item.purchased ? (
                                                <div className="button-overlay">
                                                    <button className="purchase-button purchased" onClick={() => handleSetTheme(item.theme_name)}>
                                                    <i className="bi bi-bag-check"><i>Set</i></i>
                                                    
                                                    </button>
                                                   
                                                </div>
                                            ) : (
                                                <div className="button-overlay">
                                                    <button className="purchase-button not-purchased" onClick={() => handlePurchase(item.theme_name)}></button>
                                                        <i className="bi bi-cash-coin"><i>Purchase</i></i>
                                                    
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <img src={item.img} alt={item.alt} />
                                </div>
                                <Carousel.Caption>
                                    <h3>{item.caption.title}</h3>
                                    <p>{item.caption.text}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })
                }
            </Carousel>
        </>
    );
}

export default CarouselContent;