"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  birthdate: z.string().min(1), // Si es una fecha, considerar convertirla a z.date()
  gender: z.enum(["male", "female", "other"]),
});

type FormState = {
  success: boolean;
  message: string;
  validated: boolean;
  formKey: number;
  errors?: {
    [key in keyof typeof schema.shape]?: string[];
  };
};

export default async function createParticipant(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    birthdate: formData.get("birthdate"),
    gender: formData.get("gender"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      validated: false,
      formKey: prevState.formKey,
      message: "Validation error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/participants/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: true,
      validated: true,
      formKey: prevState.formKey + 1,
      message: "Record saved successfully.",
    };
  } catch (error) {
    return {
      success: false,
      validated: true,
      formKey: prevState.formKey,
      message: "Error saving record. Please try again.",
    };
  }
}
