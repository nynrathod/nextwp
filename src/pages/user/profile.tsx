import AuthContent from "@components/Auth/AuthContent";

import Layout from "@components/Layout";
import ProfileForm from "@components/User/ProfileForm";

export default function Profile() {
    return (
        <Layout>
            <AuthContent>
                <ProfileForm />
            </AuthContent>
        </Layout>
    );
}
