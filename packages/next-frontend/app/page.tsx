import Prove from "./components/Prove";

export default function Home() {
  return (
    <Prove private_key={"0x01c8bdf6686d4c8ba09db5f15ffee3c470a5e0ff54d6fbac3a548f9a666977"} 
    message_hash={"0"} 
    public_key={"0x15d76b9641dc1e52de6f9530a4161f077c348b1329efaeb0e052f13b5bf1ce49"}
    useProof={(proof) => console.log(proof)}
    />
  )
}
