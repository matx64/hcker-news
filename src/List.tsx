import React, { useEffect, useState } from "react";
import type { item } from "./itemType";
import ListItem from "./ListItem";

const List = () => {
    const [allItems, setAllItems] = useState([]);
    const [fetchedItems, setFetchedItems] = useState([] as item[]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

    // "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    // `https://hacker-news.firebaseio.com/v0/item/${allItems[page]}.json?print=pretty`

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

    const fetchItems = () => {
        if (isLoaded) {
            if (fetchedItems.length <= page * 10) {
                const tmpItems = allItems.slice(page * 10, (page + 1) * 10);
                tmpItems.forEach((element) => {
                    fetch(
                        `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
                    )
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

    useEffect(() => {
        if (isLoaded) {
            fetchItems();
        }
    }, [allItems]);

    useEffect(fetchItems, [page]);

    const handlePageClick = (num: number) => {
        if ((page === 0 && num === 1) || (page > 0 && page < 50)) {
            setPage(page + num);
        }
    };

    function renderItems() {
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Is Loading...</div>;
        } else {
            return (
                <div className="text-center text-gray-300">
                    {fetchedItems
                        .slice(page * 10, (page + 1) * 10)
                        .map((element, key) => {
                            return <ListItem key={key} data={element} />;
                        })}
                </div>
            );
        }
    }

    return (
        <div className="container mx-auto mt-10 p-5 bg-gray-800 shadow rounded max-w-4xl border-amber-600 border-2">
            <div className="mb-5">
                <button
                    onClick={() => handlePageClick(-1)}
                    className="p-2 bg-amber-600 font-bold rounded-l-md hover:bg-amber-900 shadow"
                >
                    ←
                </button>
                <button
                    onClick={() => handlePageClick(1)}
                    className="p-2 bg-amber-600 font-bold rounded-r-md hover:bg-amber-900 shadow"
                >
                    →
                </button>
            </div>
            {renderItems()}
            <div className="mt-5">
                <button
                    onClick={() => handlePageClick(-1)}
                    className="p-2 bg-amber-600 font-bold rounded-l-md hover:bg-amber-900 shadow"
                >
                    ←
                </button>
                <button
                    onClick={() => handlePageClick(1)}
                    className="p-2 bg-amber-600 font-bold rounded-r-md hover:bg-amber-900 shadow"
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default List;
