import React from "react";

import {GetServerSidePropsContext,InferGetServerSidePropsType} from "next";
import nookies from "nookies";
import {firebaseAdmin} from "utils/firebase/admin";

export type AuthProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Auth: React.FunctionComponent<AuthProps> = (props) => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // the user is authenticated!
    const {uid, email} = token;

    // FETCH STUFF HERE!! 🚀

    return {
      props: {message: `Your email is ${email} and your UID is ${uid}.`},
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    ctx.res.writeHead(302, {Location: "/login"});
    ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return {props: {} as never};
  }
};
