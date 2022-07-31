import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import MoviesList from "./components/MoviesList";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center font-bold h-screen box-border p-0 m-0">
        <h1 className="text-5xl text-white bg-gray-400 w-full text-center">
          Hello MovieDB!
        </h1>
        <MoviesList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
