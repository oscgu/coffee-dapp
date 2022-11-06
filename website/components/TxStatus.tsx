import { Container, Loading, Text } from "@nextui-org/react";
import Link from "next/link";

interface Props {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    data?: any;
}
const TxStatus = ({ isLoading, isError, isSuccess, data }: Props) => {
    return (
        <Container css={{ textAlign: "center", justifyContent: "center" }}>
            {
                <>
                    {data &&
                        <Link target="_blank" href={"https://polygonscan.com/tx/" + data?.hash}>{data?.hash}</Link>}
                    {isLoading && <Loading />}
                </>
            }
            {isError && <Text color='red'>Transaction failed.</Text>}
            {isSuccess && <Text color='green'>Success!</Text>}
        </Container>


    )
}

export default TxStatus;