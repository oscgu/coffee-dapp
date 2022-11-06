import { Text } from "@nextui-org/react";

const CHeader = () => {
    return (
        <>
            <Text weight="bold" size={60}>
                Buy me a&nbsp;
                <Text span weight="bold" css={{ textGradient: "45deg, $blue600 -20%, $pink600 65%" }} size={60}>
                    Coffee
                </Text>
            </Text>
        </>
    )
}

export default CHeader;