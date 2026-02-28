import { useMutation } from "@tanstack/react-query";
import emailjs from "@emailjs/browser";

export default function useSendOrderEmail() {
  return useMutation({
    mutationFn: async (variables: { templateParams: any }) => {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        variables.templateParams,
        import.meta.env.VITE_EMAIL_PUBLISHABLE_KEY,
      );

      return response;
    },
    onError: (error) => {
      console.error("Failed to send email:", error);
    },
  });
}
