"use client";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faUsers } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Image from "next/image";
import { Participant } from "@/models/participant";

// import THSort from "@/components/TableSort/THSort";
import useDictionary from "@/locales/dictionary-hook";
import deleteParticipant from "@/app/(dashboard)/participants/[id]/delete/action";
import { rootCertificates } from "tls";

type Props = {
  participants: Participant[];
};

export default function ParticipantList(props: Props) {
  const { participants } = props;
  const dict = useDictionary();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (confirm(`Are you sure you want to delete participant ${id}?`)) {
      try {
        const result = await deleteParticipant(id);

        if (result.success) {
          alert(result.message);
          // router.push("/participants");
          router.refresh();
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error deleting participant:", error);
        alert("An error occurred while deleting the participant.");
      }
    }
  };

  return (
    // <Table responsive bordered hover>
    //   <thead>
    //     <tr className="table-light dark:table-dark">
    //       <th><THSort name="id">#</THSort></th>
    //       <th aria-label="Photo" />
    //       <th><THSort name="name">{dict.pokemons.attribute.name}</THSort></th>
    //       <th>{dict.pokemons.attribute.type}</th>
    //       <th className="text-center">{dict.pokemons.attribute.egg_group}</th>
    //       <th className="text-end"><THSort name="hp">{dict.pokemons.attribute.hp}</THSort></th>
    //       <th className="text-end"><THSort name="attack">{dict.pokemons.attribute.attack}</THSort></th>
    //       <th className="text-end"><THSort name="defense">{dict.pokemons.attribute.defense}</THSort></th>
    //       <th className="text-end"><THSort name="special_attack">{dict.pokemons.attribute.sp_attack}</THSort></th>
    //       <th className="text-end"><THSort name="special_defense">{dict.pokemons.attribute.sp_defense}</THSort></th>
    //       <th className="text-end"><THSort name="speed">{dict.pokemons.attribute.speed}</THSort></th>
    //       <th className="text-end"><THSort name="total">{dict.pokemons.attribute.total}</THSort></th>
    //       <th aria-label="Action" />
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {participant.map((pokemon) => (
    //       <tr key={pokemon.id}>
    //         <td>{pokemon.id}</td>
    //         <td>
    //           <div className="position-relative mx-auto" style={{ width: '70px', height: '70px' }}>
    //             <Image
    //               fill
    //               style={{ objectFit: 'contain' }}
    //               alt={pokemon.pokemondb_identifier}
    //               sizes="5vw"
    //               src={`https://img.pokemondb.net/sprites/home/normal/2x/${pokemon.pokemondb_identifier}.jpg`}
    //             />
    //           </div>
    //         </td>
    //         <td>{pokemon.name}</td>
    //         <td>
    //           {pokemon.types.map((type) => (
    //             <span key={type.id} className="me-2"><PokemonTypeLabel type={type} /></span>
    //           ))}
    //         </td>
    //         <td className="text-center" style={{ whiteSpace: 'pre' }}>
    //           {pokemon.egg_groups.map((eggGroup) => eggGroup.name).join('\n')}
    //         </td>
    //         <td className="text-end">{pokemon.hp}</td>
    //         <td className="text-end">{pokemon.attack}</td>
    //         <td className="text-end">{pokemon.defense}</td>
    //         <td className="text-end">{pokemon.special_attack}</td>
    //         <td className="text-end">{pokemon.special_defense}</td>
    //         <td className="text-end">{pokemon.speed}</td>
    //         <td className="text-end">{pokemon.total}</td>
    //         <td>
    //           <Dropdown align="end">
    //             <DropdownToggle
    //               as="button"
    //               bsPrefix="btn"
    //               className="btn-link rounded-0 text-black-50 dark:text-gray-500 shadow-none p-0"
    //               id={`action-${pokemon.id}`}
    //             >
    //               <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
    //             </DropdownToggle>

    //             <DropdownMenu>
    //               <DropdownItem href="#/action-1">{dict.action.info}</DropdownItem>
    //               <Link href={`pokemons/${pokemon.id}/edit`} passHref legacyBehavior>
    //                 <DropdownItem>{dict.action.edit}</DropdownItem>
    //               </Link>
    //               <DropdownItem
    //                 className="text-danger"
    //                 href="#/action-3"
    //               >
    //                 {dict.action.delete}
    //               </DropdownItem>
    //             </DropdownMenu>
    //           </Dropdown>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </Table>
    <div className="table-responsive">
      <table className="table border mb-0">
        <thead className="fw-semibold">
          <tr className="align-middle table-light dark:table-dark">
            <th className="text-center" aria-label="icon">
              <FontAwesomeIcon icon={faUsers} fixedWidth />
            </th>
            <th>{dict.participants.attribute.name}</th>
            <th>{dict.participants.attribute.email}</th>
            <th>{dict.participants.attribute.phone}</th>
            <th>{dict.participants.attribute.birthdate}</th>
            <th>{dict.participants.attribute.gender}</th>
            <th aria-label="Action" />
          </tr>
        </thead>
        <tbody>
          {participants.map((item, index) => {
            return (
              <tr key={index} className="align-middle">
                <td className="text-center">
                  <div className="avatar avatar-md d-inline-flex position-relative">
                    <Image fill sizes="40px" className="rounded-circle" src={`/assets/img/avatars/${index + 1}.jpg`} alt={item.email} />
                    <span className={`avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white`} />
                  </div>
                </td>
                <td>
                  <div>{item.name}</div>
                </td>
                <td>
                  <div>{item.email}</div>
                </td>
                <td>
                  <div>{item.phone}</div>
                </td>
                <td>
                  <div>{item.birthdate}</div>
                </td>
                <td>
                  <div>{item.gender}</div>
                </td>
                <td>
                  <Dropdown align="end">
                    <DropdownToggle
                      as="button"
                      bsPrefix="btn"
                      className="btn-link rounded-0 text-black-50 dark:text-gray-500 shadow-none p-0"
                      id={`action-user${index + 1}`}>
                      <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>{dict.action.info}</DropdownItem>
                      <DropdownItem href={`participants/${item.id}/edit`}>{dict.action.edit}</DropdownItem>
                      <DropdownItem className="text-danger" onClick={async () => await handleDelete(parseInt(item.id))}>
                        {dict.action.delete}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
