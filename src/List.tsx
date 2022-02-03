import React, { useEffect, useState } from "react";

const List = () => {
    const [allItems, setAllItems] = useState([{}]);
    const [fetchedItems, setFetchedItems] = useState([{}]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch(
            "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAllItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    return (
        <div className="container mx-auto mt-10 p-5 bg-gray-800 shadow rounded-lg">
            <div>
                <button
                    onClick={() => setPage(page - 1)}
                    className="mx-2 p-2 bg-emerald-500 font-bold rounded hover:bg-emerald-900 shadow"
                >
                    ←
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    className="mx-2 p-2 bg-emerald-500 font-bold rounded hover:bg-emerald-900 shadow"
                >
                    →
                </button>
            </div>
            <ul className="text-center text-white"></ul>
        </div>
    );
};

export default List;
