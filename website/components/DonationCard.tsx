import { Card, Text } from "@nextui-org/react";
import { BigNumber, ethers } from "ethers";
import { useEnsName } from "wagmi";
import { Duration, DateTime } from "luxon";

interface Props {
    address: any;
    message: string;
    value: BigNumber;
    timestamp: BigNumber;
}

const DonationCard = ({ address, message, value, timestamp }: Props) => {
    const { data, error } = useEnsName({ address })

    return (
        <Card css={{marginBottom: "15px"}}>
            <Card.Header css={{ justifyContent: "space-between" }}>
                <Text size={17}>
                    {error ? address : data}
                </Text>
                <Text size={17}>
                    {DateTime.fromSeconds(timestamp.toNumber()).toFormat("yyyy-MM-dd HH:mm")}
                </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
                <Text size={25}>
                    {ethers.utils.toUtf8String(message)}
                </Text>
            </Card.Body>
            <Card.Footer css={{ justifyContent: "end", fontSize: 20 }}>
                <Text b css={{ textGradient: "45deg, $green500 -20%, $blue600 50%" }}>
                    {ethers.utils.formatEther(value)}&nbsp;
                </Text>
                <Text b>
                    ETH
                </Text>
            </Card.Footer>
        </Card>
    )
}

export default DonationCard;