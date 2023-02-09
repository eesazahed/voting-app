import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";

interface Props {
  providers: Object;
}

const SignIn: NextPage<Props> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div className="grid place-items-center h-screen" key={provider.name}>
          <button
            className="bg-blue-500 hover:bg-blue-600 w-1/4 text-white text-base md:text-lg py-2 px-4 rounded"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
};

export default SignIn;

export const getServerSideProps = async (context: any) => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};
