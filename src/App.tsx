import { createResource, createSignal } from "solid-js";
import type { Component } from "solid-js";

function getRandomNumber() {
  return Math.floor(Math.random() * (10 - 1 + 1) + 1);
}

const fetchUser = async (id: number) =>
  (await fetch(`https://jsonplaceholder.typicode.com/users/${id}/`)).json();

const App: Component = () => {
  const [userId, setUserId] = createSignal();
  const [user] = createResource(userId, fetchUser);

  function handleClick() {
    setUserId(getRandomNumber());
  }

  return (
    <main class="max-w-5xl mx-auto p-6">
      <button
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:cursor-not-allowed"
        type="button"
        onClick={handleClick}
        disabled={user.loading}
      >
        Get user
      </button>

      <div class="mt-4">
        <span>{user.loading && "Loading..."}</span>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
      </div>
    </main>
  );
};

export default App;
