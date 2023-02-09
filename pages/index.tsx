import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getToken } from "next-auth/jwt";
import getAllVotes from "../utils/getAllVotes";
import alreadyVoted from "../utils/alreadyVoted";

const option1 = "LeBron";
const option2 = "Curry";

const centerCSS = "flex justify-center items-center";
const imageCSS =
  "m-4 w-52 h-72 bg-black overflow-hidden rounded-3xl cursor-pointer hover:opacity-75";
const headerCSS = "font-normal leading-relaxed my-1";

interface Votes {
  option1Voters: number;
  option2Voters: number;
  alreadyVoted?: boolean;
}

const Home: NextPage<Votes> = ({
  alreadyVoted,
  option1Voters,
  option2Voters,
}) => {
  const { status } = useSession();
  const router = useRouter();

  const vote = (id: number) => {
    fetch(`${document.location}api/vote/${id}`, { method: "POST" }).then(() =>
      router.reload()
    );
  };

  let winning = "";

  if (option1Voters > option2Voters) {
    winning = `${option1} is winning!`;
  } else if (option2Voters > option1Voters) {
    winning = `${option2} is winning!`;
  } else {
    winning = "It's a tie!";
  }

  return (
    <div>
      <Head>
        <title>
          {option1} or {option2}?
        </title>
      </Head>
      <div className="text-center p-0 m-0 max-w-screen min-h-screen">
        <h1 className="pt-16 font-bold text-[5rem] bg-gradient-to-r from-[#FFE53B_0%] to-[#FF2525_74%] bg-clip-text text-transparent">
          {option1} or {option2}?
        </h1>
        <div className="my-16">
          <h2 className={`${headerCSS} text-[2rem]`}>
            <span> {winning} </span>
          </h2>
          <h3 className={`${headerCSS} text-[1.5rem]`}>
            {option1}:<span> {option1Voters || 0}</span>
          </h3>
          <h3 className={`${headerCSS} text-[1.5rem]`}>
            {option2}:<span> {option2Voters || 0}</span>
          </h3>
        </div>

        {status === "loading" && (
          <h2 className={`${headerCSS} text-[2rem]`}>Loading....</h2>
        )}

        {status === "authenticated" && (
          <div className="my-16">
            {alreadyVoted ? (
              <h3 className={`${headerCSS} text-[1.5rem]`}>
                You&apos;ve already voted!
              </h3>
            ) : (
              <div>
                <h2 className={`${headerCSS} text-[2rem]`}>Vote:</h2>
                <h3 className={`${headerCSS} text-[1.5rem]`}>
                  You can only vote once!
                </h3>
                <div className={`${centerCSS} sm:flex-row flex-col`}>
                  <div
                    className={`${centerCSS} ${imageCSS}`}
                    onClick={() => vote(0)}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/LeBron_James_Bradley_Beal_%28cropped%29.jpg/220px-LeBron_James_Bradley_Beal_%28cropped%29.jpg"
                      alt={option1}
                    />
                  </div>
                  <div
                    className={`${centerCSS} ${imageCSS}`}
                    onClick={() => vote(1)}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Stephen_Curry_dribbling_2016_%28cropped%29.jpg/220px-Stephen_Curry_dribbling_2016_%28cropped%29.jpg"
                      alt={option2}
                    />
                  </div>
                </div>
                <h3 className={`${headerCSS} text-[1.5rem]`}> </h3>
              </div>
            )}
          </div>
        )}

        {status === "unauthenticated" && (
          <div className="my-16 leading-6">
            <h2 className={`${headerCSS} text-[2rem]`}>
              Please login to vote.
            </h2>
            <button
              className="bg-blue-500 hover:bg-blue-600 m-8 w-24 text-white text-xl py-2 px-4 rounded-lg"
              onClick={() => signIn()}
            >
              Login
            </button>
            <p>
              The only reason logging in is required is to prevent people from
              spam-clicking votes.
            </p>
          </div>
        )}

        <footer className="h-4"></footer>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps({ req }: any) {
  const votes: Votes | null = await getAllVotes();
  let userAlreadyVoted: boolean = false;
  const token = await getToken({ req });

  if (token && token.sub) {
    userAlreadyVoted = await alreadyVoted(parseInt(token.sub));
  }

  return {
    props: { ...votes, alreadyVoted: userAlreadyVoted },
  };
}
