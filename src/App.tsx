import React from "react";
import "./App.css";
import List from "./List";

function App() {
    return (
        <div className="bg-gray-900 text-white text-center p-6 min-h-screen">
            <main>
                <h1 className="text-5xl font-bold mt-5">hcker_news</h1>
                <List></List>
            </main>

            <footer className="mt-6">
                <div>
                    developed by 🙋‍♂️
                    <a
                        href="https://matx.dev"
                        className="font-bold text-cyan-500 hover:text-cyan-200 hover:underline"
                    >
                        matheus teixeira
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default App;
