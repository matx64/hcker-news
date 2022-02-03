import React, { useEffect, useState } from "react";

type item = {
    title: string;
    url: string;
    score: number;
    time: number;
};

const ListItem = (id: number) => {
    const [data, setData] = useState<item>({
        title: "",
        url: "",
        score: 0,
        time: 0,
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setData({
                        title: result.title,
                        url: result.url,
                        score: result.score,
                        time: result.time,
                    });
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <a href={data.url} className="font-bold">
                    {data.title}
                </a>
            </div>
        );
    }
};

export default ListItem;
