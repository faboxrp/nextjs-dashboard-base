"use client";

import { Button, Card } from "react-bootstrap";
import React from "react";
import { newResource, ResourceCollection } from "@/models/resource";
import { Participant } from "@/models/participant";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
// import Cookies from "js-cookie";
import useDictionary from "@/locales/dictionary-hook";
import ParticipantList from "@/components/Page/Participant/ParticipantList";

type Props = {
  props: {
    participantResource: ResourceCollection<Participant>;
    page: number;
    perPage: number;
    sort: string;
    order: string;
  };
};

export default function Index(props: Props) {
  const {
    props: { participantResource: participantResourceFallback, page, perPage, sort, order },
  } = props;

  const router = useRouter();
  const dict = useDictionary();

  // const participantListURL = "http://127.0.0.1:8069/api/participants";
  const participantListURL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/participants` || "";

  const url = new URL(participantListURL);
  url.searchParams.set("_page", page.toString());
  url.searchParams.set("_limit", perPage.toString());
  url.searchParams.set("_sort", sort);
  url.searchParams.set("_order", order);

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then(async (res) => {
      if (res.ok) {
        const participants: Participant[] = await res.json();
        const total = Number(res.headers.get("x-total-count")) ?? 0;
        return newResource(participants, total, page, perPage);
      }

      return participantResourceFallback;
    });

  const { data: participantResource } = useSWR(url.toString(), fetcher, {
    fallbackData: participantResourceFallback,
    revalidateOnFocus: true, // Revalidar al enfocar la ventana
    // refreshInterval: 0, // No refrescar automáticamente
    dedupingInterval: 2000, // Tiempo durante el cual las solicitudes duplicadas se deduplican (ms)
  });
  return (
    <Card>
      <Card.Header>{dict.participants.title}</Card.Header>
      <Card.Body>
        <div className="mb-3 text-end">
          <Button variant="success" onClick={() => router.push("/participants/create")}>
            <FontAwesomeIcon icon={faPlus} fixedWidth />
            {dict.participants.add_new}
          </Button>
        </div>
        <Pagination meta={participantResource.meta} />
        <ParticipantList participants={participantResource.data} />
        <Pagination meta={participantResource.meta} />
      </Card.Body>
    </Card>
  );
}
