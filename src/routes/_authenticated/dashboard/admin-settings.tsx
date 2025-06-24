
import AdminSettings from '@/admin/AdminSetings';
import { createFileRoute } from '@tanstack/react-router'
 

export const Route = createFileRoute('/_authenticated/dashboard/admin-settings')({
  component: AdminSettings,
  
});

