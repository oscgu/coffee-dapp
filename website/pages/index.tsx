import { Button, Container, Grid, Input, Spacer } from '@nextui-org/react';
import { BigNumber, ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import CHeader from '../components/CHeader';
import CNavbar from '../components/CNavbar';
import DonationCard from '../components/DonationCard';
import TxStatus from '../components/TxStatus';
import { constants } from '../constants';

const Home: NextPage = () => {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [value, setValue] = useState<undefined | string>();

  const contract = {
    address: constants.contractAddress,
    abi: constants.contractAbi
  }

  const { config } = usePrepareContractWrite({
    ...contract,
    functionName: "buyCoffee",
    args: [address as any, ethers.utils.toUtf8Bytes(message) as any],
    overrides: {
      value: value ? parseEther(value) : parseEther("0.01")
    }
  });
  const { data, write } = useContractWrite(config)

  const readDonations = useContractRead({
    ...contract,
    functionName: "getDonations",
    args: [address as any],
    enabled: true,
    watch: true
  });

  const { isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash!,
    confirmations: 2,
  });

  const buyCoffee = () => {
    write?.();
    console.log(data)
  }

  return (
    <Container css={{ width: "100%" }}>
      <CNavbar />

      <Spacer />
      <Spacer />

      <Container css={{ textAlign: "center" }}>
        <CHeader />
        <Input
          contentRightStyling={false}
          placeholder="Enter an address"
          css={{ maxW: "400px", minWidth: "400px" }}
          onChange={e => setAddress(e.target.value)}
        />
      </Container>
      <Spacer />

      {address ?
        <Grid.Container css={{ justifyContent: "center", gap: "5px" }} >
          <Input css={{ maxW: "200px" }} placeholder='Your message' onChange={e => setMessage(e.target.value)} />
          <Input type="number" placeholder='Amount in eth' onChange={e => setValue(e.target.value)} />
          <Button auto shadow onClick={() => buyCoffee()}>Donate</Button>
        </Grid.Container>
        : <></>}

      <TxStatus isError={isError} isLoading={isLoading} isSuccess={isSuccess} data={data} />

      <Spacer />
      <Spacer />

      <Container css={{ maxW: "700px" }}>
        {readDonations.data?.slice(0).reverse().map((donation, key) => <DonationCard key={donation.timestamp.toString() + key} address={donation.donator} message={donation.message} timestamp={donation.timestamp} value={donation.amount} />)}
      </Container>
    </Container>
  )
};

export default Home;
