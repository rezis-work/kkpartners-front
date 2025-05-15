const EmailKeys = {
  serviceId: import.meta.env.VITE_EMAIL_SERVICE_ID as string,
  templateId: import.meta.env.VITE_EMAIL_TEMPLATE_ID as string,
  publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY as string,
}
export default EmailKeys
