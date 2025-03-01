import React from 'react';
import { UserProfile } from '@clerk/nextjs';

export default function AccountPage() {
  return (
    <div className="flex justify-center py-12">
      <UserProfile />
    </div>
  );
} 