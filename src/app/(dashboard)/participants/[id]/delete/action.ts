"use server";

export default async function deleteParticipant(id: number): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/participants/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Participant deleted successfully.");

    return {
      success: true,
      message: "Participant deleted successfully.",
    };
  } catch (error) {
    console.log("Error deleting participant:", error);

    return {
      success: false,
      message: `Error deleting participant: ${error}`,
    };
  }
}
