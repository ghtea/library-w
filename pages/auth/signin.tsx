import React from "react"

import {Flex} from "components/atoms"
import {TemplateA} from "components/templates/TemplateA"
import {GetServerSideProps,GetStaticPaths, GetStaticProps} from "next"
import {ClientSafeProvider,getProviders, signIn} from "next-auth/client"

export type SignInProps = {
  providers: Record<string, ClientSafeProvider> | null
}

export default function SignIn({
  providers,
}:SignInProps) {

  const providerList = providers ? Object.values(providers) : [];

  return (
    <TemplateA>
      <Flex>
        {providerList.map(provider => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          </div>
        ))}
      </Flex>
    </TemplateA>
  )
}

export async function getServerSideProps(context: GetServerSideProps){
  const providers = await getProviders()
  return {
    props: {providers}
  }
}