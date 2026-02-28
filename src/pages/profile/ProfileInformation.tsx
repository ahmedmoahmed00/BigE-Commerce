import ProfileInformationForm from "../../features/profile/components/ProfileInformationForm";

function ProfileInformation() {
  return (
    <div className="bg-primary  rounded-2xl p-8 shadow-sm">
      <header className="mb-6">
        <h2 className="font-semibold mb-6">Profile Information</h2>
      </header>
      <main>
        <ProfileInformationForm />
      </main>
    </div>
  );
}

export default ProfileInformation;
