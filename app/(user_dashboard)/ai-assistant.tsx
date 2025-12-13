import CompanyUpdateForm from '@/components/company-update-form';
import { Layout } from '@/components/layout/Layout';
import React from 'react';

export default function AIAssistantScreen() {
  const handleSuccess = () => {
    console.log('Company information updated successfully');
  };

  return (
    <Layout>
      <CompanyUpdateForm onSuccess={handleSuccess} />
    </Layout>
  );
}
