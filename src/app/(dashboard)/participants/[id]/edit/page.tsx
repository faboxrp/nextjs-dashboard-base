// participants/[id]/edit/page.tsx
import { Participant } from "@/models/participant";
import { notFound } from "next/navigation";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import ParticipantForm from "@/components/Page/Participant/Form/ParticipantForm";
import serverFetch from "@/utils/server-fetch";
import { Resource } from "@/models/resource";

const fetchParticipant = async (id: number): Promise<Resource<Participant>> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/participants/${id}` || "";

  try {
    const res = await serverFetch(url, {
      method: "GET",
    });

    if (!res.ok) {
      return notFound();
    }

    const participant: Participant = await res.json();

    return {
      data: participant,
    };
  } catch (error) {
    return notFound();
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const { data: participant } = await fetchParticipant(Number(params.id));

  if (!participant) {
    return notFound();
  }

  return (
    // <div>hola</div>
    <Card>
      <CardHeader>{participant.name}</CardHeader>
      <CardBody>
        <ParticipantForm participant={participant} />
      </CardBody>
    </Card>
  );
}
