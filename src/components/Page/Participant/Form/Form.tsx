"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Alert, Button, Form as BSForm, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import React, { useEffect } from "react";
// import createParticipant from "@/participants/create/action";
import useDictionary from "@/locales/dictionary-hook";
import createParticipant from "@/app/(dashboard)/participants/create/action";
import FormError from "@/components/Form/FormError";

type Props = {
  participant?: any;
};

const SubmitButton = ({ validated, success }: { validated: boolean; success: boolean }) => {
  const { pending } = useFormStatus();
  const dict = useDictionary();

  useEffect(() => {
    if (validated) {
      window.scrollTo(0, 0);
    }
  }, [validated, pending]);

  useEffect(() => {
    if (success) {
      // Reset form
    }
  }, [success, pending]);

  return (
    <Button aria-disabled={pending} className="me-3" type="submit" variant="success">
      {pending ? dict.action.submitting : dict.action.submit}
    </Button>
  );
};

export default function Form(props: Props) {
  const { participant } = props;
  const dict = useDictionary();
  const [state, formAction] = useFormState(createParticipant, {
    success: false,
    validated: false,
    message: "",
    formKey: 0,
  });

  return (
    <BSForm noValidate key={state.formKey} action={formAction}>
      <Alert variant={state.success ? "success" : "danger"} show={state.errors === undefined && state.message !== ""}>
        {state.message}
      </Alert>

      <FormGroup className="mb-3">
        <FormLabel>{dict.participants.attribute.name}</FormLabel>
        <FormControl type="text" name="name" defaultValue={participant?.name} isInvalid={!!state.errors?.name} required />
        <FormError messages={state.errors?.name} />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>{dict.participants.attribute.email}</FormLabel>
        <FormControl type="email" name="email" defaultValue={participant?.email} isInvalid={!!state.errors?.email} required />
        <FormError messages={state.errors?.email} />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>{dict.participants.attribute.phone}</FormLabel>
        <FormControl type="text" name="phone" defaultValue={participant?.phone} isInvalid={!!state.errors?.phone} required />
        <FormError messages={state.errors?.phone} />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>{dict.participants.attribute.birthdate}</FormLabel>
        <FormControl type="date" name="birthdate" defaultValue={participant?.birthdate} isInvalid={!!state.errors?.birthdate} required />
        <FormError messages={state.errors?.birthdate} />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>{dict.participants.attribute.gender}</FormLabel>
        <FormControl as="select" name="gender" defaultValue={participant?.gender} isInvalid={!!state.errors?.gender} required>
          <option value="male">{dict.participants.attribute.gender_type.male}</option>
          <option value="female">{dict.participants.attribute.gender_type.female}</option>
          <option value="other">{dict.participants.attribute.gender_type.other}</option>
        </FormControl>
        <FormError messages={state.errors?.gender} />
      </FormGroup>

      <SubmitButton validated={state.validated} success={state.success} />
      <Button type="reset" variant="secondary">
        {dict.action.reset}
      </Button>
    </BSForm>
  );
}
