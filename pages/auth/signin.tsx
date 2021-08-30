import React, {useCallback} from "react"

import {Box, Button,Flex} from "components/atoms"
import {TemplateA} from "components/templates/TemplateA"
import {GetServerSideProps,GetStaticPaths, GetStaticProps} from "next"
import {ClientSafeProvider,getProviders, signIn} from "next-auth/client"
import {ColorKey} from "theme"

export type SignInProps = {
  providers: Record<string, ClientSafeProvider> | null
}

export default function SignIn({
  providers,
}:SignInProps) {

  const providerList = providers ? Object.values(providers) : [];

  const onClickSignIn = useCallback((providerId: string)=>{
    signIn(providerId, {callbackUrl: "/"})
  },[])

  return (
    <TemplateA height={"100%"}>
      <Flex sx={{justifyContent: "center", alignItems: "center", height: "100%"}}>
        <Box>
          <Flex>
            {providerList.map(provider => (
              <Box key={provider.name}>
                <Button sx={{backgroundColor: ColorKey["bg.weak"]}} onClick={() => onClickSignIn(provider.id)}>Sign in with {provider.name}</Button>
              </Box>
            ))}
          </Flex>
        </Box>
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