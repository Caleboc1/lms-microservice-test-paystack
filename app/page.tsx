import { SignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import DashboardLayout from './(dashboard)/layout';
import Dashboard from './(dashboard)/(routes)/(root)/dash';

const Page = () => {
  const { userId} = auth();

  if (!userId) {
    return (
        <div className="h-full flex items-center justify-center">
    <SignIn routing='hash'/>
    </div>);
  }

  return (
    <DashboardLayout>
      <Dashboard/>
    </DashboardLayout>
  );
};

export default Page;

