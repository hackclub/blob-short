import { Flex, Heading, Button, Text } from "rebass"
import Head from "next/head"

export default () => (
    <Flex w="100vw" h="100vh" flexDirection="column">
        <Head>
            <title>BlobShort</title>
        </Head>
        <Heading mt="50px" mx="auto" fontSize={[4, 5, 6]}>BlobShort</Heading>
        <Text mx="auto">Shorten all the urls in the text!</Text>
        <Flex mx="auto" mt="20px">
            <textarea id="in" />
        </Flex>
        <Button sx={{
            ":hover": {
                bg: "secondary",
                cursor: "pointer"
            }
        }} mt="50px" mx="auto" onClick={() => {
            fetch("/api/blob", {
                body: JSON.stringify({
                    text: document.getElementById("in").value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST"
            })
                .then(r => r.json())
                .then(json => {
                    document.getElementById("out").value = json.result
                })
        }}>Shorten!</Button>
        <Flex mx="auto" mt="50px">
            <textarea id="out" readOnly />
        </Flex>
        <Heading mt="60px" mx="auto">API</Heading>
        <Text p="30px" mx="auto"><strong>POST</strong> <code>/api/blob</code> with a text JSON key for your blob</Text>

        <style jsx>{`
            textarea {
                border-radius:10px;
                height:100px;
                width:200px;
            }
        `}</style>
    </Flex>
)