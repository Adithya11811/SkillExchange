import VidFeature from "./videofeatur"

const Page = async ({ params }: { params: { conversationid: string } }) => {
  return <VidFeature roomId={params.conversationid}/>
}
export default Page