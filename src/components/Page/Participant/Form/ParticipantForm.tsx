import Form from "@/components/Page/Participant/Form/Form";
import { getLocale } from "@/locales/dictionary";

type Props = {
  participant?: any;
};

export default async function ParticipantForm(props: Props) {
  const { participant } = props;

  return <Form participant={participant} />;
}
