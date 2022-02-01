import React, { useEffect, useState } from "react";

type item = {
    title: string;
    link: string;
    points: number;
    time: number;
};

const List = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(
            "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.slice(0, 15));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    return (
        <div className="container mx-auto mt-10 p-5 bg-gray-800 shadow rounded-lg">
            <ul className="text-center text-white">
                {items.map((element, index) => {
                    return <li key={index}>{element}</li>;
                })}
            </ul>
        </div>
    );
};

const ListItem = (element: item) => {
    return (
        <div>
            <a href={element.link}>{element.title}</a>
        </div>
    );
};

export default List;
