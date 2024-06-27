// export const revalidate = 0; // Desactiva ISR y revalida cada solicitud

import React from "react";
import { newResource, ResourceCollection } from "@/models/resource";
import { SearchParams } from "@/types/next";
import Index from "@/app/(dashboard)/participants/index";
import serverFetch from "@/utils/server-fetch";
import { getLocale } from "@/locales/dictionary";
import { Participant } from "@/models/participant";

const fetchParticipants = async (searchParams: SearchParams) => {
  // const participantListURL = "http://127.0.0.1:8069/api/participants";
  const participantListURL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/participants` || "";

  let page = 1;
  if (searchParams?.page) {
    page = parseInt(searchParams.page.toString(), 10);
  }

  let perPage = 20;
  if (searchParams?.per_page) {
    perPage = parseInt(searchParams.per_page.toString(), 10);
  }

  let sort = "id";
  if (searchParams?.sort) {
    sort = searchParams.sort.toString();
  }

  let order = "asc";
  if (searchParams?.order && typeof searchParams.order === "string") {
    order = searchParams.order;
  }

  const url = new URL(participantListURL);
  url.searchParams.set("_page", page.toString());
  url.searchParams.set("_limit", perPage.toString());
  url.searchParams.set("_sort", sort);
  url.searchParams.set("_order", order);

  const res = await serverFetch(url, {
    method: "GET",
  });
  const participants: Participant[] = await res.json();

  const total = Number(res.headers.get("x-total-count")) ?? 0;
  const participantResource: ResourceCollection<Participant> = newResource(participants, total, page, perPage);

  return {
    participantResource: participantResource,
    page,
    perPage,
    sort,
    order,
  };
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const props = await fetchParticipants(searchParams);
  return <Index props={props} />;
}
