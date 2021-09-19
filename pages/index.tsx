import React, {useEffect} from "react"

import {Flex, Image,Text} from "components/atoms"
import {TemplateA} from "components/templates/TemplateA"
import Head from "next/head"

export enum LibraryCategory {
  MUSIC = "music",
  MOVIE = "movie",
  THOUGHT = "thought",
  KNOWLEDGE = "knowledge"
}

const Home:React.FunctionComponent = () => {

  return (
    <TemplateA height={"100%"} >
      <Head>
        <title>Library of W</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex sx={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#E7EFFC"}}>
        <Image src={"/images/home.jpg"} width={"100%"} ></Image>
      </Flex>
      
    </TemplateA>
  )
}

export default Home;
