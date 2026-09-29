"use client";

// for some reason the types wont work bruh
// @ts-expect-error
import Homepage from "./homepage.mdx";

const Home = () => {
  return (
    <div className="markdown max-w-6xl mx-auto">
      <Homepage />
    </div>
  );
};
export default Home;
