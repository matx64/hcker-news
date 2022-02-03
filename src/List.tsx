import React, { useEffect, useState } from "react";

type item = {
    id: number;
};

const List = () => {
    const [allItems, setAllItems] = useState([]);
    const [fetchedItems, setFetchedItems] = useState([] as item[]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

    // "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    // `https://hacker-news.firebaseio.com/v0/item/${allItems[page]}.json?print=pretty`

    useEffect(() => {
        fetch("http://localhost:8000/")
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

    useEffect(() => {
        if (isLoaded) {
            fetchItems();
        }
    }, [allItems]);

    const fetchItems = () => {
        if (isLoaded) {
            console.log(fetchedItems.length);
            if (fetchedItems.length <= page * 10) {
                const tmpItems = allItems.slice(page * 10, (page + 1) * 10);
                tmpItems.forEach((element) => {
                    fetch(`http://localhost:8000/${element}`)
                        .then((res) => res.json())
                        .then(
                            (result) => {
                                setFetchedItems((fetchedItems) => [
                                    ...fetchedItems,
                                    result,
                                ]);
                            },
                            (error) => {
                                setError(error);
                            }
                        );
                });
            }
        }
    };

    useEffect(fetchItems, [page]);

    const handlePageClick = (num: number) => {
        if ((page === 0 && num === 1) || (page > 0 && page < 50)) {
            setPage(page + num);
        }
    };

    return (
        <div className="container mx-auto mt-10 p-5 bg-gray-800 shadow rounded-lg">
            <div>
                <button
                    onClick={() => handlePageClick(-1)}
                    className="mx-2 p-2 bg-emerald-500 font-bold rounded hover:bg-emerald-900 shadow"
                >
                    ←
                </button>
                <button
                    onClick={() => handlePageClick(1)}
                    className="mx-2 p-2 bg-emerald-500 font-bold rounded hover:bg-emerald-900 shadow"
                >
                    →
                </button>
            </div>
            <ul className="text-center text-white">
                {fetchedItems
                    .slice(page * 10, (page + 1) * 10)
                    .map((element, key) => {
                        return <li key={key}>{element.id}</li>;
                    })}
            </ul>
        </div>
    );
};

export default List;
