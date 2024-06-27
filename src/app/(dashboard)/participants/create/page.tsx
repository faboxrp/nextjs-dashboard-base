import { Card, CardBody, CardHeader } from "react-bootstrap";
import ParticipantForm from "@/components/Page/Participant/Form/ParticipantForm";
import { getDictionary } from "@/locales/dictionary";

export default async function Page() {
  const dict = await getDictionary();

  return (
    <Card>
      <CardHeader>{dict.participants.add_new}</CardHeader>
      <CardBody>
        <ParticipantForm />
      </CardBody>
    </Card>
  );
}
